'use client';

import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import { Compass, Hammer, MessageCircle, Truck, type LucideIcon } from 'lucide-react';
import SectionReveal from '@/components/SectionReveal';
import { easeOutExpo, viewportOnce } from '@/lib/animations';
import { useStillMotion } from '@/lib/useStillMotion';
import { process } from '@/data/content';

const ICONS: Record<string, LucideIcon> = {
  MessageCircle,
  Compass,
  Hammer,
  Truck,
};

const stepVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.94 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, delay: 0.15 + i * 0.16, ease: easeOutExpo },
  }),
};

const reducedVariants = {
  hidden: { opacity: 0 },
  show: () => ({ opacity: 1, transition: { duration: 0.3 } }),
};

const num = (i: number) => String(i + 1).padStart(2, '0');

export default function ProcessTimeline() {
  const reduced = useStillMotion();
  const trackRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start 0.8', 'center 0.5'],
  });
  const rawScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const lineScale = useSpring(rawScale, { stiffness: 90, damping: 24, mass: 0.4 });

  const variants = reduced ? reducedVariants : stepVariants;

  return (
    <section id="process" className="py-20 lg:py-28 bg-kitchen-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal className="text-center">
          <h2 className="heading-rule heading-rule-center text-3xl sm:text-4xl lg:text-5xl text-kitchen-ink text-balance">
            {process.heading}
          </h2>
          <p className="mt-6 mx-auto max-w-2xl text-base sm:text-lg text-kitchen-muted text-balance">
            {process.subheading}
          </p>
        </SectionReveal>

        <div ref={trackRef} className="mt-14 lg:mt-20">
          {/* Desktop — horizontal timeline */}
          <div className="relative hidden lg:block">
            <div
              aria-hidden="true"
              className="absolute top-10 inset-x-[12.5%] h-0.5 rounded-full bg-kitchen"
            >
              <motion.div
                className="h-full w-full origin-right rounded-full bg-kitchen-wood"
                style={{ scaleX: reduced ? 1 : lineScale }}
              />
            </div>

            <ol className="relative grid grid-cols-4 gap-8">
              {process.steps.map((step, i) => {
                const Icon = ICONS[step.icon];
                return (
                  <motion.li
                    key={step.title}
                    custom={i}
                    variants={variants}
                    initial="hidden"
                    whileInView="show"
                    viewport={viewportOnce}
                    className="text-center"
                  >
                    <div className="relative mx-auto grid h-20 w-20 place-items-center rounded-full bg-kitchen-wood text-white shadow-lg shadow-kitchen-wood/25 ring-8 ring-kitchen-light">
                      {Icon && <Icon className="h-8 w-8" aria-hidden="true" />}
                      <span
                        dir="ltr"
                        aria-hidden="true"
                        className="absolute -bottom-2 grid h-7 min-w-7 place-items-center rounded-full bg-kitchen-charcoal px-2 font-display text-xs text-white"
                      >
                        {num(i)}
                      </span>
                    </div>
                    <h3 className="mt-8 text-xl text-kitchen-ink">{step.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-kitchen-muted">
                      {step.description}
                    </p>
                  </motion.li>
                );
              })}
            </ol>
          </div>

          {/* Mobile / tablet — vertical timeline */}
          <div className="relative lg:hidden">
            <div
              aria-hidden="true"
              className="absolute top-2 bottom-8 start-[27px] w-0.5 rounded-full bg-kitchen"
            >
              <motion.div
                className="h-full w-full origin-top rounded-full bg-kitchen-wood"
                style={{ scaleY: reduced ? 1 : lineScale }}
              />
            </div>

            <ol className="relative space-y-10">
              {process.steps.map((step, i) => {
                const Icon = ICONS[step.icon];
                return (
                  <motion.li
                    key={step.title}
                    custom={i}
                    variants={variants}
                    initial="hidden"
                    whileInView="show"
                    viewport={viewportOnce}
                    className="flex items-start gap-5"
                  >
                    <div className="relative grid h-14 w-14 shrink-0 place-items-center rounded-full bg-kitchen-wood text-white shadow-md shadow-kitchen-wood/25 ring-8 ring-kitchen-light">
                      {Icon && <Icon className="h-6 w-6" aria-hidden="true" />}
                      <span
                        dir="ltr"
                        aria-hidden="true"
                        className="absolute -bottom-2 grid h-6 min-w-6 place-items-center rounded-full bg-kitchen-charcoal px-1.5 font-display text-[11px] text-white"
                      >
                        {num(i)}
                      </span>
                    </div>
                    <div className="pt-1">
                      <h3 className="text-lg text-kitchen-ink sm:text-xl">{step.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-kitchen-muted sm:text-base">
                        {step.description}
                      </p>
                    </div>
                  </motion.li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
