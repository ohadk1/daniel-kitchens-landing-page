'use client';

import { useSyncExternalStore } from 'react';
import { useReducedMotion } from 'motion/react';

/**
 * The accessibility widget writes `data-motion="off"` on <html>. CSS reacts to that on
 * its own, but JS-driven animation (motion, Lenis, Embla, rAF counters) does not — so
 * every animated component reads this instead of `useReducedMotion()` directly.
 */
function subscribe(onChange: () => void) {
  if (typeof MutationObserver === 'undefined') return () => {};
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-motion'],
  });
  return () => observer.disconnect();
}

const getSnapshot = () => document.documentElement.dataset.motion === 'off';
const getServerSnapshot = () => false;

export function useMotionOff() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/** True when movement should be suppressed — OS preference or the site's own toggle. */
export function useStillMotion() {
  const reduced = useReducedMotion();
  const motionOff = useMotionOff();
  return Boolean(reduced) || motionOff;
}
