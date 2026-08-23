/* Prints the two secrets the admin panel needs. Run from the project folder:
       npm run admin:secrets
   The password is typed at a hidden prompt rather than passed as an argument, so it
   never reaches the shell history, the process list, or anything on screen.
   Paste the output into Vercel > Settings > Environment Variables. */
import { randomBytes, scryptSync } from 'node:crypto';
import { createInterface } from 'node:readline';

const MIN_LENGTH = 12;

function askHidden(question) {
  return new Promise((resolve, reject) => {
    if (!process.stdin.isTTY) {
      reject(new Error('הרץ את הפקודה בטרמינל רגיל, לא דרך צינור.'));
      return;
    }

    const rl = createInterface({ input: process.stdin, output: process.stdout, terminal: true });
    process.stdout.write(question);

    // Swallow the echo so the characters never appear, then restore stdout.
    const write = process.stdout.write.bind(process.stdout);
    process.stdout.write = () => true;

    rl.question('', (answer) => {
      process.stdout.write = write;
      process.stdout.write('\n');
      rl.close();
      resolve(answer);
    });
  });
}

if (process.argv[2]) {
  console.error('הסיסמה לא נמסרת כארגומנט — היא נשמרת בהיסטוריית הטרמינל.');
  console.error('הרץ:  npm run admin:secrets');
  process.exit(1);
}

const password = await askHidden('בחר סיסמה לממשק הניהול (לא תוצג): ');
const again = await askHidden('הקלד אותה שוב: ');

if (password !== again) {
  console.error('שתי הסיסמאות לא זהות.');
  process.exit(1);
}
if (password.length < MIN_LENGTH) {
  console.error(`הסיסמה צריכה להיות באורך ${MIN_LENGTH} תווים לפחות.`);
  process.exit(1);
}

const salt = randomBytes(16).toString('hex');
const hash = scryptSync(password, salt, 64).toString('hex');

console.log('\nהעתק את שתי השורות האלה ל-Vercel:\n');
console.log('ADMIN_PASSWORD_HASH=' + salt + ':' + hash);
console.log('ADMIN_SESSION_SECRET=' + randomBytes(32).toString('base64url'));
