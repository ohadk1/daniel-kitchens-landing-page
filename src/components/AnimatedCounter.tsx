'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'motion/react';
import { useStillMotion } from '@/lib/useStillMotion';

interface Props {
  value: number;
  prefix?: string;
  suffix?: string;
  /** Render the number as-is (no thousands separator) — used for the founding year. */
  raw?: boolean;
  duration?: number;
}

export default function AnimatedCounter({
  value,
  prefix = '',
  suffix = '',
  raw = false,
  duration = 1600,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduced = useStillMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setDisplay(value);
      return;
    }

    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      // easeOutExpo — fast start, gentle settle.
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setDisplay(Math.round(value * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduced, value, duration]);

  const formatted = raw ? String(display) : display.toLocaleString('he-IL');
  const final = raw ? String(value) : value.toLocaleString('he-IL');

  // `aria-label` is prohibited on a bare span, so the value ships as real text instead:
  // the ticking digits are hidden and a visually-hidden twin carries the end state.
  return (
    <span ref={ref}>
      <span aria-hidden="true">
        {prefix}
        {formatted}
        {suffix}
      </span>
      <span className="sr-only">{`${prefix}${final}${suffix}`}</span>
    </span>
  );
}
