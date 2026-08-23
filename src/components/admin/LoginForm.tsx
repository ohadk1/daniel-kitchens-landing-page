'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button, Field, TextInput } from './ui';

export default function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setBusy(true);
    setError('');

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => ({}))) as { error?: string };
        setError(data.error ?? 'ההתחברות נכשלה');
        return;
      }

      const next = params.get('next');
      // Only ever follow an in-app path — a full URL here would be an open redirect.
      router.replace(next && next.startsWith('/admin') ? next : '/admin');
      router.refresh();
    } catch {
      setError('אין חיבור לשרת');
    } finally {
      setBusy(false);
    }
  };

  return (
    <main dir="rtl" className="grid min-h-screen place-items-center px-4">
      <form
        onSubmit={submit}
        className="w-full max-w-sm rounded-2xl bg-white p-7 shadow-sm"
      >
        <h1 className="font-display text-2xl text-kitchen-ink">ניהול האתר</h1>
        <p className="mt-1.5 text-sm text-kitchen-muted">מטבחי דניאל</p>

        <div className="mt-6">
          <Field label="סיסמה">
            <TextInput
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              autoFocus
              required
            />
          </Field>
        </div>

        {error && (
          <p role="alert" className="mt-3 text-sm text-red-700">
            {error}
          </p>
        )}

        <Button type="submit" tone="primary" disabled={busy} className="mt-6 w-full">
          {busy ? 'מתחבר…' : 'כניסה'}
        </Button>
      </form>
    </main>
  );
}
