'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { cta } from '@/data/content';
import { whatsappUrl } from '@/data/site';
import { fadeUp, stagger, viewportOnce } from '@/lib/animations';
import { useStillMotion } from '@/lib/useStillMotion';

function WhatsAppGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      fill="currentColor"
      className="size-6"
    >
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.96-.95 1.16-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.06 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35Z" />
      <path d="M12.04 2C6.6 2 2.18 6.42 2.18 11.86c0 1.74.46 3.44 1.32 4.94L2 22l5.34-1.4a9.83 9.83 0 0 0 4.7 1.2h.01c5.43 0 9.85-4.42 9.85-9.86a9.79 9.79 0 0 0-2.88-6.97A9.77 9.77 0 0 0 12.04 2Zm0 17.94h-.01a8.2 8.2 0 0 1-4.17-1.14l-.3-.18-3.1.81.83-3.02-.2-.31a8.13 8.13 0 0 1-1.25-4.34c0-4.52 3.68-8.19 8.2-8.19a8.14 8.14 0 0 1 5.79 2.4 8.11 8.11 0 0 1 2.4 5.8c0 4.52-3.68 8.19-8.19 8.19Z" />
    </svg>
  );
}

export default function CallToAction() {
  const reduced = useStillMotion();
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const [magnetic, setMagnetic] = useState(false);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 220, damping: 20, mass: 0.4 });
  const y = useSpring(rawY, { stiffness: 220, damping: 20, mass: 0.4 });

  useEffect(() => {
    if (reduced) {
      setMagnetic(false);
      rawX.set(0);
      rawY.set(0);
      return;
    }
    const query = window.matchMedia('(pointer: fine)');
    const sync = () => setMagnetic(query.matches);
    sync();
    query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, [reduced, rawX, rawY]);

  const handleMove = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      if (!magnetic || !buttonRef.current) return;
      const rect = buttonRef.current.getBoundingClientRect();
      const offsetX = event.clientX - (rect.left + rect.width / 2);
      const offsetY = event.clientY - (rect.top + rect.height / 2);
      rawX.set(Math.max(-14, Math.min(14, offsetX * 0.3)));
      rawY.set(Math.max(-10, Math.min(10, offsetY * 0.35)));
    },
    [magnetic, rawX, rawY],
  );

  const reset = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  return (
    <section id="cta" className="relative isolate overflow-hidden py-24 lg:py-32">
      <Image
        src="/images/4-1.webp"
        alt=""
        aria-hidden="true"
        fill
        loading="lazy"
        sizes="100vw"
        className="scale-105 object-cover blur-[2px]"
      />
      {/* 95% keeps every line above 4.5:1 no matter how dark the photo runs behind it. */}
      <div aria-hidden="true" className="absolute inset-0 bg-kitchen/95" />

      <motion.div
        className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8"
        variants={stagger(0.12)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
      >
        <motion.h2
          variants={fadeUp}
          className="mx-auto max-w-3xl font-display text-3xl sm:text-4xl lg:text-5xl text-kitchen-ink text-balance"
        >
          {cta.heading}
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="mx-auto mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-kitchen-ink/90 text-balance"
        >
          {cta.text}
        </motion.p>

        <motion.div variants={fadeUp} className="mt-10 flex justify-center">
          <motion.div style={magnetic ? { x, y } : undefined}>
            <motion.a
              ref={buttonRef}
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onMouseMove={handleMove}
              onMouseLeave={reset}
              onBlur={reset}
              animate={reduced ? { scale: 1 } : { scale: [1, 1.03, 1] }}
              transition={
                reduced
                  ? { duration: 0 }
                  : {
                      duration: 2.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }
              }
              className="inline-flex items-center gap-3 rounded-full bg-kitchen-wood px-8 py-4 text-base font-semibold text-white shadow-xl transition-colors duration-200 hover:bg-kitchen-charcoal sm:text-lg"
            >
              <WhatsAppGlyph />
              {cta.button}
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.p
          variants={fadeUp}
          className="mt-5 text-sm text-kitchen-ink"
        >
          {cta.note}
        </motion.p>
      </motion.div>
    </section>
  );
}
