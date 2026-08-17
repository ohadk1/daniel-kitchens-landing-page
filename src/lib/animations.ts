import type { Variants, Transition } from 'motion/react';

export const easeOutExpo = [0.16, 1, 0.3, 1] as const;

export const smooth: Transition = { duration: 0.7, ease: easeOutExpo };

/** Shared viewport config so every section reveals at the same point. */
export const viewportOnce = { once: true, amount: 0.2 } as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: smooth },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: smooth },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  show: { opacity: 1, scale: 1, transition: smooth },
};

/**
 * The page is RTL, so a positive x offset enters from the visual start (right).
 * `side: 'start'` means "slides in from the right", `'end'` from the left.
 */
export const slideFrom = (side: 'start' | 'end'): Variants => ({
  hidden: { opacity: 0, x: side === 'start' ? 48 : -48 },
  show: { opacity: 1, x: 0, transition: smooth },
});

export const stagger = (staggerChildren = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
});

/** Word-by-word headline reveal. */
export const wordStagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
};

export const wordChild: Variants = {
  hidden: { opacity: 0, y: '0.6em' },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOutExpo } },
};
