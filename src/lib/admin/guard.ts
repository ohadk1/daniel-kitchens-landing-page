import { cookies } from 'next/headers';
import { SESSION_COOKIE, verifySessionToken } from './session';

/** The proxy already redirects unauthenticated page requests; API routes call this so a
 *  stranger hitting them directly gets a 401 rather than a redirect to a login page. */
export async function isSignedIn(): Promise<boolean> {
  const jar = await cookies();
  return verifySessionToken(jar.get(SESSION_COOKIE)?.value);
}
