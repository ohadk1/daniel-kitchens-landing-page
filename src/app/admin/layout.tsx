import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ניהול האתר — מטבחי דניאל',
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-kitchen-light">{children}</div>;
}
