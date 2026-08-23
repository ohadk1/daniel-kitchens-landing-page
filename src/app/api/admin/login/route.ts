import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {
  SESSION_COOKIE,
  createSessionToken,
  sessionMaxAgeSeconds,
  verifyPassword,
} from '@/lib/admin/session';

/** Best-effort throttle. Serverless instances are short-lived so this is not a hard
 *  limit, but it removes the free unlimited guessing that a bare compare would allow. */
const attempts = new Map<string, { count: number; until: number }>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 8;

const clientKey = (request: NextRequest) =>
  request.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown';

export async function POST(request: NextRequest) {
  const key = clientKey(request);
  const now = Date.now();
  const record = attempts.get(key);

  if (record && record.until > now && record.count >= MAX_ATTEMPTS) {
    return NextResponse.json(
      { error: 'יותר מדי ניסיונות. נסה שוב בעוד כמה דקות.' },
      { status: 429 },
    );
  }

  let password = '';
  try {
    password = String(((await request.json()) as { password?: unknown }).password ?? '');
  } catch {
    return NextResponse.json({ error: 'בקשה לא תקינה' }, { status: 400 });
  }

  if (!verifyPassword(password)) {
    const next = record && record.until > now ? record : { count: 0, until: now + WINDOW_MS };
    attempts.set(key, { count: next.count + 1, until: next.until });
    return NextResponse.json({ error: 'סיסמה שגויה' }, { status: 401 });
  }

  attempts.delete(key);

  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE, createSessionToken(), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: sessionMaxAgeSeconds,
  });
  return response;
}
