/* Prints the two secrets the admin panel needs. Run:  npm run admin:secrets -- "<password>"
   Paste the output into Vercel > Settings > Environment Variables. Nothing is written to
   disk and the password itself is never stored anywhere. */
import { randomBytes, scryptSync } from 'node:crypto';

const password = process.argv[2];

if (!password || password.length < 12) {
  console.error('Usage: npm run admin:secrets -- "<password of at least 12 characters>"');
  process.exit(1);
}

const salt = randomBytes(16).toString('hex');
const hash = scryptSync(password, salt, 64).toString('hex');

console.log('ADMIN_PASSWORD_HASH=' + salt + ':' + hash);
console.log('ADMIN_SESSION_SECRET=' + randomBytes(32).toString('base64url'));
