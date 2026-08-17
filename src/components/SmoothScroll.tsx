'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { useStillMotion } from '@/lib/useStillMotion';

/** Momentum scrolling for the whole page. Disabled entirely for visitors who asked for
 *  reduced motion (OS preference or the accessibility widget), so native scrolling —
 *  including the browser's own hash focus handling — stays untouched. */
export default function SmoothScroll() {
  const reduced = useStillMotion();

  useEffect(() => {
    if (reduced) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    // Anchor links in the navbar/hero need Lenis to own the scroll.
    const onAnchorClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement)?.closest?.('a[href^="#"]');
      if (!anchor) return;
      const id = anchor.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector<HTMLElement>(id);
      if (!target) return;
      event.preventDefault();
      lenis.scrollTo(target, { offset: -72 });
      // preventDefault() also kills the native hash focus move, which the skip link
      // depends on — put the caret on the target ourselves.
      if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    };

    document.addEventListener('click', onAnchorClick);

    return () => {
      document.removeEventListener('click', onAnchorClick);
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, [reduced]);

  return null;
}
