'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';
import { about } from '@/data/content';
import { fadeUp, slideFrom, stagger, viewportOnce } from '@/lib/animations';
import { useStillMotion } from '@/lib/useStillMotion';

const PULL_QUOTE = 'המטבח הוא לב הבית';

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useStillMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="bg-kitchen-section py-20 lg:py-28"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
          {/* Text — enters from the visual right (RTL start). */}
          <motion.div
            variants={reduced ? fadeUp : slideFrom('start')}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
          >
            <h2 className="heading-rule font-display text-3xl sm:text-4xl lg:text-[2.75rem] text-kitchen-ink">
              {about.heading}
            </h2>

            <div className="mt-8 space-y-5">
              {about.paragraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 24)}
                  className="text-base sm:text-lg leading-relaxed text-kitchen-muted"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <figure className="mt-8 rounded-2xl border-s-4 border-kitchen-wood bg-white/70 px-6 py-5 shadow-sm">
              <blockquote className="font-display text-2xl text-kitchen-ink">
                {PULL_QUOTE}
              </blockquote>
            </figure>

            <h3 className="mt-10 font-display text-xl sm:text-2xl text-kitchen-ink">
              {about.advantagesHeading}
            </h3>

            <motion.ul
              className="mt-6 grid gap-x-6 gap-y-4 sm:grid-cols-2"
              variants={stagger(0.09, 0.1)}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
            >
              {about.advantages.map((advantage) => (
                <motion.li
                  key={advantage}
                  variants={fadeUp}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2
                    aria-hidden="true"
                    className="mt-0.5 size-5 shrink-0 text-kitchen-wood"
                  />
                  <span className="text-kitchen-ink leading-relaxed">
                    {advantage}
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Collage — enters from the visual left (RTL end). */}
          <motion.div
            variants={reduced ? fadeUp : slideFrom('end')}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="relative mx-auto w-full max-w-md lg:max-w-none"
          >
            {/* Decorative frame behind the collage. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-5 -end-5 hidden h-[85%] w-[75%] rounded-2xl border-2 border-kitchen-wood/45 sm:block"
            />

            <motion.div
              style={{ y: reduced ? 0 : parallaxY }}
              className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-xl will-change-transform"
            >
              <Image
                src="/images/sahara-1.webp"
                alt="מטבח סהרה — האי, הוויטרינה המוארת וכיסאות הבר"
                fill
                loading="lazy"
                sizes="(min-width: 1024px) 45vw, (min-width: 640px) 60vw, 90vw"
                className="object-cover"
              />
            </motion.div>

            <div className="relative -mt-14 flex justify-start sm:mt-0 sm:block">
              <div className="relative aspect-square w-36 overflow-hidden rounded-2xl shadow-2xl ring-4 ring-kitchen-wood/70 sm:absolute sm:-bottom-10 sm:-start-8 sm:w-52 lg:w-56">
                <Image
                  src="/images/sahara-2.webp"
                  alt="מטבח סהרה — תקריב משטח השיש המעורק"
                  fill
                  loading="lazy"
                  sizes="(min-width: 1024px) 220px, (min-width: 640px) 208px, 144px"
                  className="object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
