'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { testimonials } from '@/data/content';
import { fadeUp, viewportOnce } from '@/lib/animations';
import { useStillMotion } from '@/lib/useStillMotion';

type Testimonial = (typeof testimonials.items)[number];

function initials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join('');
}

function Stars({ rating }: { rating: number }) {
  return (
    <motion.div
      className="flex gap-1"
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09 } } }}
      role="img"
      aria-label={`דירוג ${rating} מתוך 5`}
    >
      {Array.from({ length: 5 }, (_, index) => (
        <motion.span
          key={index}
          variants={{
            hidden: { opacity: 0, scale: 0.6 },
            show: { opacity: 1, scale: 1, transition: { duration: 0.35 } },
          }}
        >
          <Star
            aria-hidden="true"
            className={
              index < rating
                ? 'size-5 fill-kitchen-wood text-kitchen-wood'
                : 'size-5 text-kitchen-gray'
            }
          />
        </motion.span>
      ))}
    </motion.div>
  );
}

function TestimonialCard({
  item,
  active,
  reduced,
}: {
  item: Testimonial;
  active: boolean;
  reduced: boolean;
}) {
  return (
    <div
      className={`relative h-full overflow-hidden rounded-2xl bg-white p-8 shadow-lg transition-all duration-500 ease-out ${
        active || reduced ? 'opacity-100 scale-100' : 'opacity-60 scale-[0.94]'
      }`}
    >
      <Quote
        aria-hidden="true"
        className="pointer-events-none absolute -top-4 start-4 size-28 text-kitchen opacity-30"
      />

      <div className="relative">
        <Stars rating={item.rating} />

        <p className="mt-6 text-kitchen-ink leading-relaxed">{item.text}</p>

        <div className="mt-8 flex items-center gap-4">
          <span
            aria-hidden="true"
            className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-kitchen font-display text-lg text-kitchen-ink"
          >
            {initials(item.name)}
          </span>
          <span className="flex flex-col">
            <span className="font-display text-kitchen-ink">{item.name}</span>
            <span className="text-sm text-kitchen-muted">{item.role}</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const reduced = useStillMotion();

  const plugins = useMemo(
    () =>
      reduced
        ? []
        : [
            Autoplay({
              delay: 5500,
              stopOnInteraction: true,
              stopOnMouseEnter: true,
              stopOnFocusIn: true,
            }),
          ],
    [reduced],
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, direction: 'rtl', align: 'center' },
    plugins,
  );

  const [selected, setSelected] = useState(0);
  const [snaps, setSnaps] = useState<number[]>([]);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    setSnaps(emblaApi.scrollSnapList());
    onSelect();

    emblaApi.on('select', onSelect).on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect).off('reInit', onSelect);
    };
  }, [emblaApi]);

  // The plugin list re-inits on its own, but stop autoplay eagerly so flipping the
  // widget's "stop animations" switch halts the carousel on the same tick.
  useEffect(() => {
    if (!emblaApi || !reduced) return;
    emblaApi.plugins().autoplay?.stop();
  }, [emblaApi, reduced]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi],
  );

  const items = testimonials.items;
  const hasControls = items.length > 1;

  return (
    <section id="testimonials" className="bg-kitchen-section py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="heading-rule heading-rule-center text-center font-display text-3xl sm:text-4xl lg:text-[2.75rem] text-kitchen-ink"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          {testimonials.heading}
        </motion.h2>

        <div
          className="mt-12"
          role="group"
          aria-roledescription="קרוסלה"
          aria-label={testimonials.heading}
        >
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="-ms-6 flex touch-pan-y items-stretch py-2">
              {items.map((item, index) => (
                <div
                  key={item.name}
                  className="min-w-0 flex-[0_0_100%] ps-6 sm:flex-[0_0_70%] lg:flex-[0_0_42%]"
                  role="group"
                  aria-roledescription="שקופית"
                  aria-label={`${index + 1} מתוך ${items.length}`}
                >
                  <TestimonialCard
                    item={item}
                    active={index === selected}
                    reduced={reduced}
                  />
                </div>
              ))}
            </div>
          </div>

          {hasControls && (
            <div className="mt-10 flex items-center justify-center gap-6">
              {/* RTL: the button on the right goes back. */}
              <button
                type="button"
                onClick={scrollPrev}
                aria-label="חוות הדעת הקודמת"
                className="inline-flex size-12 items-center justify-center rounded-full bg-white text-kitchen-ink shadow-md transition-colors duration-200 hover:bg-kitchen-wood hover:text-white"
              >
                <ChevronRight aria-hidden="true" className="size-6" />
              </button>

              <ul className="flex items-center gap-3">
                {snaps.map((_, index) => (
                  <li key={index}>
                    <button
                      type="button"
                      onClick={() => scrollTo(index)}
                      aria-label={`מעבר לחוות הדעת ${index + 1}`}
                      aria-current={index === selected ? 'true' : undefined}
                      className={`block h-2.5 rounded-full transition-all duration-300 ${
                        index === selected
                          ? 'w-8 bg-kitchen-wood'
                          : 'w-2.5 bg-kitchen-gray/60 hover:bg-kitchen-wood/70'
                      }`}
                    />
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={scrollNext}
                aria-label="חוות הדעת הבאה"
                className="inline-flex size-12 items-center justify-center rounded-full bg-white text-kitchen-ink shadow-md transition-colors duration-200 hover:bg-kitchen-wood hover:text-white"
              >
                <ChevronLeft aria-hidden="true" className="size-6" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
