/* Prints the two secrets the admin panel needs. Run from the project folder:
       npm run admin:secrets
   The password is typed at a hidden prompt rather than passed as an argument, so it
   never reaches the shell history, the process list, or anything on screen.
   Paste the output into Vercel > Settings > Environment Variables.

   Messages here are English on purpose: Windows PowerShell 5.1 runs the console on a
   legacy code page and renders Hebrew as mojibake. */
import { randomBytes, scryptSync } from 'node:crypto';

const MIN_LENGTH = 12;

/* Keys that raw mode delivers as control characters instead of events. */
const ETX = ''; // Ctrl+C
const EOT = ''; // Ctrl+D
const DEL = ''; // Backspace, on most terminals

/** Anything typed past the end of one answer. A single chunk can hold both answers —
 *  when someone pastes, or types fast — and dropping the tail left the second prompt
 *  waiting forever. */
let carried = '';

/** Reads a line without echoing it. Raw mode rather than muting stdout, which readline
 *  on Windows does not reliably survive. */
function askHidden(prompt) {
  const { stdin, stdout } = process;
  stdout.write(prompt);

  return new Promise((resolve) => {
    let value = '';

    /** Consumes `text` up to the first line break. Returns the unread remainder, or
     *  null if the line has not ended yet. */
    const consume = (text) => {
      const chars = Array.from(text);

      for (let i = 0; i < chars.length; i += 1) {
        const char = chars[i];

        if (char === '\r' || char === '\n' || char === EOT) {
          const skipLf = char === '\r' && chars[i + 1] === '\n' ? 2 : 1;
          return chars.slice(i + skipLf).join('');
        }
        if (char === ETX) {
          if (stdin.isTTY) stdin.setRawMode(false);
          stdout.write('\n');
          process.exit(130);
        }
        if (char === DEL || char === '\b') {
          value = value.slice(0, -1);
        } else if (char >= ' ') {
          value += char;
        }
      }

      return null;
    };

    const finish = (rest) => {
      carried = rest;
      if (stdin.isTTY) stdin.setRawMode(false);
      stdin.pause();
      stdin.removeListener('data', onData);
      stdout.write('\n');
      resolve(value);
    };

    function onData(chunk) {
      const rest = consume(chunk);
      if (rest !== null) finish(rest);
    }

    // Whatever the previous answer left behind may already complete this one.
    if (carried) {
      const pending = carried;
      carried = '';
      const rest = consume(pending);
      if (rest !== null) {
        carried = rest;
        stdout.write('\n');
        resolve(value);
        return;
      }
    }

    if (stdin.isTTY) stdin.setRawMode(true);
    stdin.resume();
    stdin.setEncoding('utf8');
    stdin.on('data', onData);
  });
}

const die = (message) => {
  console.error(message);
  process.exit(1);
};

if (process.argv[2]) {
  die(
    'Do not pass the password as an argument - it would be saved in your shell history.\n' +
      'Run:  npm run admin:secrets',
  );
}

if (!process.stdin.isTTY) {
  die('Run this in a normal terminal window, not through a pipe or a task runner.');
}

console.log('This prints two values to paste into Vercel. Nothing is written to disk.\n');

const password = await askHidden(`Choose an admin password (min ${MIN_LENGTH} chars, not shown): `);
if (password.length < MIN_LENGTH) die(`Too short - ${MIN_LENGTH} characters minimum.`);

const again = await askHidden('Type it again: ');
if (password !== again) die('The two entries do not match.');

const salt = randomBytes(16).toString('hex');
const hash = scryptSync(password, salt, 64).toString('hex');

console.log('\nCopy these two lines into Vercel > Settings > Environment Variables:\n');
console.log('ADMIN_PASSWORD_HASH=' + salt + ':' + hash);
console.log('ADMIN_SESSION_SECRET=' + randomBytes(32).toString('base64url'));
console.log('\nDone. Close this window once you have pasted them.');
