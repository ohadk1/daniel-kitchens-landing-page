'use client';

import {
  Clock4,
  Compass,
  Hammer,
  ShieldCheck,
  Truck,
  Wrench,
  type LucideIcon,
} from 'lucide-react';
import { motion, type Variants } from 'motion/react';
import { services } from '@/data/content';
import { whatsappUrl } from '@/data/site';
import { fadeIn, fadeUp, smooth, stagger, viewportOnce } from '@/lib/animations';
import { useStillMotion } from '@/lib/useStillMotion';

const ICONS: Record<string, LucideIcon> = {
  Compass,
  Wrench,
  Hammer,
  Truck,
  Clock4,
  ShieldCheck,
};

/** Cards alternate their entry direction so the grid assembles from both sides. */
const cardVariants = (index: number): Variants => ({
  hidden: { opacity: 0, y: 28, x: index % 2 === 0 ? 28 : -28 },
  show: { opacity: 1, y: 0, x: 0, transition: smooth },
});

export default function Services() {
  const reduced = useStillMotion();

  return (
    <section id="services" className="bg-kitchen-light py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          <h2 className="heading-rule heading-rule-center font-display text-3xl sm:text-4xl lg:text-[2.75rem] text-kitchen-ink">
            {services.heading}
          </h2>
          <p className="mt-6 text-base sm:text-lg leading-relaxed text-kitchen-muted text-balance">
            {services.subheading}
          </p>
        </motion.div>

        <motion.ul
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          {services.items.map((item, index) => {
            const Icon = ICONS[item.icon];

            return (
              <motion.li
                key={item.title}
                variants={reduced ? fadeIn : cardVariants(index)}
                whileHover={reduced ? undefined : { y: -8 }}
                transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                className="group h-full rounded-2xl bg-gradient-to-br from-kitchen to-kitchen-wood p-px shadow-sm transition-shadow duration-300 hover:shadow-2xl"
              >
                <div className="flex h-full flex-col rounded-2xl bg-white p-7">
                  <span className="inline-flex size-14 items-center justify-center rounded-xl bg-kitchen/25 text-kitchen-wood transition-transform duration-300 ease-out group-hover:-rotate-6 group-hover:scale-110">
                    {Icon ? <Icon aria-hidden="true" className="size-7" /> : null}
                  </span>

                  <h3 className="mt-5 font-display text-xl text-kitchen-ink">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-kitchen-muted leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.li>
            );
          })}
        </motion.ul>

        <motion.div
          className="mt-16 rounded-3xl bg-kitchen px-6 py-10 text-center text-kitchen-ink sm:px-10 lg:px-14 lg:py-14"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          <h3 className="font-display text-2xl sm:text-3xl text-kitchen-ink">
            {services.bannerHeading}
          </h3>
          <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-kitchen-ink/85 text-balance">
            {services.bannerText}
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-kitchen-wood px-8 py-4 font-semibold text-white shadow-lg transition-colors duration-200 hover:bg-kitchen-charcoal"
          >
            לקבלת הצעת מחיר
          </a>
        </motion.div>
      </div>
    </section>
  );
}
