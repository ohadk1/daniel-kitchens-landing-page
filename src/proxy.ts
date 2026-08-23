import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { SESSION_COOKIE, verifySessionToken } from '@/lib/admin/session';

/** Gate for the owner-only panel. The API routes under /api/admin check the session
 *  again themselves — this only keeps the pages from rendering to a stranger. */
export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (pathname === '/admin/login') return NextResponse.next();

  if (!verifySessionToken(request.cookies.get(SESSION_COOKIE)?.value)) {
    const login = new URL('/admin/login', request.url);
    if (pathname !== '/admin') login.searchParams.set('next', pathname + search);
    return NextResponse.redirect(login);
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};
