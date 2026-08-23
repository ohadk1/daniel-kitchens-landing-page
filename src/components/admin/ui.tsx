'use client';

/** Small building blocks shared by the admin screens. Plain and dense on purpose —
 *  this is a tool, not a showroom, and it should stay readable on a phone. */

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-kitchen-ink">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-kitchen-muted">{hint}</span>}
    </label>
  );
}

const inputClass =
  'w-full rounded-xl border border-kitchen-line bg-white px-3.5 py-2.5 text-sm text-kitchen-ink ' +
  'outline-none transition-colors placeholder:text-kitchen-muted/60 focus:border-kitchen-wood';

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${inputClass} ${props.className ?? ''}`} />;
}

export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={`${inputClass} leading-relaxed ${props.className ?? ''}`} />;
}

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  tone?: 'primary' | 'plain' | 'danger';
};

export function Button({ tone = 'plain', className = '', ...props }: ButtonProps) {
  const tones = {
    primary: 'bg-kitchen-wood text-white hover:bg-kitchen-wood/90 disabled:bg-kitchen-wood/50',
    plain: 'bg-white text-kitchen-ink border border-kitchen-line hover:bg-kitchen-light',
    danger: 'bg-white text-red-700 border border-red-200 hover:bg-red-50',
  } as const;

  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${tones[tone]} ${className}`}
    />
  );
}

/** Square icon button used for the reorder arrows and per-image actions. */
export function IconButton({
  label,
  className = '',
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { label: string }) {
  return (
    <button
      {...props}
      aria-label={label}
      title={label}
      className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-kitchen-line bg-white text-kitchen-ink transition-colors hover:bg-kitchen-light disabled:cursor-not-allowed disabled:opacity-35 ${className}`}
    />
  );
}
