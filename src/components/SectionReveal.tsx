'use client';

import { motion, type Variants } from 'motion/react';
import { fadeUp, viewportOnce } from '@/lib/animations';
import { useStillMotion } from '@/lib/useStillMotion';

interface Props {
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
  delay?: number;
  as?: 'div' | 'section' | 'li' | 'article' | 'span';
}

/** Reveals its children once they scroll into view. Collapses to a plain fade when
 *  the visitor asked for reduced motion. */
export default function SectionReveal({
  children,
  className,
  variants = fadeUp,
  delay = 0,
  as = 'div',
}: Props) {
  const reduced = useStillMotion();
  const Component = motion[as];

  const resolved: Variants = reduced
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.3 } } }
    : variants;

  return (
    <Component
      className={className}
      variants={resolved}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      transition={{ delay }}
    >
      {children}
    </Component>
  );
}
