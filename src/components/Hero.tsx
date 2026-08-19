'use client';

import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useScroll, useTransform } from 'motion/react';
import { Check, ChevronsDown, Pause, Play } from 'lucide-react';
import { hero } from '@/data/content';
import { heroSlides } from '@/data/projects';
import { whatsappUrl } from '@/data/site';
import { easeOutExpo, smooth, stagger, wordChild, wordStagger } from '@/lib/animations';
import { useStillMotion } from '@/lib/useStillMotion';

const SLIDE_MS = 6000;

const slideshowUi = {
  pause: 'השהיית מצגת התמונות',
  play: 'הפעלת מצגת התמונות',
} as const;

function WhatsAppGlyph({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.29-.77.95-.94 1.15-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.29-.02-.45.13-.6.13-.13.3-.35.44-.52.15-.17.2-.29.3-.49.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.29-1.04 1.01-1.04 2.47s1.06 2.86 1.21 3.06c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.75-.71 2-1.4.25-.69.25-1.28.17-1.4-.07-.12-.27-.2-.57-.35zM12.05 21.8h-.02a9.8 9.8 0 0 1-4.99-1.37l-.36-.21-3.71.97.99-3.62-.23-.37a9.77 9.77 0 0 1-1.5-5.22c0-5.4 4.4-9.8 9.82-9.8a9.75 9.75 0 0 1 6.94 2.88 9.72 9.72 0 0 1 2.87 6.93c0 5.4-4.4 9.81-9.81 9.81zM20.52 3.45A11.72 11.72 0 0 0 12.05 0C5.57 0 .3 5.27.29 11.75c0 2.07.54 4.09 1.57 5.87L.19 24l6.53-1.71a11.73 11.73 0 0 0 5.32 1.36h.01c6.48 0 11.75-5.27 11.76-11.75a11.68 11.68 0 0 0-3.29-8.45z" />
    </svg>
  );
}

const headlineLines = hero.headline.split('\n');

export default function Hero() {
  const reduced = useStillMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const timerRef = useRef<number | null>(null);
  const [index, setIndex] = useState(0);
  /** 'auto' also holds while the pointer or keyboard focus is inside the hero; an explicit
   *  play overrides that, or the button would look dead while hovering. */
  const [playback, setPlayback] = useState<'auto' | 'paused' | 'playing'>('auto');
  const [held, setHeld] = useState(false);
  const paused = playback === 'paused';

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);

  const autoPlay =
    !reduced && heroSlides.length > 1 && !paused && (playback === 'playing' || !held);

  const restartTimer = useCallback(() => {
    if (timerRef.current !== null) window.clearInterval(timerRef.current);
    timerRef.current = null;
    if (!autoPlay) return;
    timerRef.current = window.setInterval(
      () => setIndex((i) => (i + 1) % heroSlides.length),
      SLIDE_MS,
    );
  }, [autoPlay]);

  useEffect(() => {
    restartTimer();
    return () => {
      if (timerRef.current !== null) window.clearInterval(timerRef.current);
      timerRef.current = null;
    };
  }, [restartTimer]);

  // Manual selection restarts the cycle, or the next tick would overwrite it.
  const goToSlide = (i: number) => {
    setIndex(i);
    restartTimer();
  };

  const activeSlide = heroSlides[index];

  return (
    <section
      ref={sectionRef}
      id="home"
      aria-label="ראשי"
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onFocus={() => setHeld(true)}
      onBlur={() => setHeld(false)}
      className="relative isolate flex min-h-[100svh] w-full flex-col justify-center overflow-hidden bg-kitchen-charcoal"
    >
      {/* Slideshow layer */}
      <motion.div
        aria-hidden="true"
        style={reduced ? undefined : { y: parallaxY }}
        /* Taller than the section so the parallax shift never exposes the background. */
        className="absolute inset-x-0 -top-[10%] -z-10 h-[125%]"
      >
        <AnimatePresence initial={false}>
          <motion.div
            key={activeSlide.url}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0.2 : 1.4, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <div className={reduced ? 'absolute inset-0' : 'absolute inset-0 animate-kenburns'}>
              <Image
                src={activeSlide.url}
                alt={activeSlide.alt}
                fill
                sizes="100vw"
                quality={92}
                {...(activeSlide.url === heroSlides[0].url
                  ? { preload: true, fetchPriority: 'high' as const }
                  : /* Eager, but never preloaded — only slide 1 owns a <link rel=preload>.
                       Lazy let the first crossfade land on an unpainted frame. */
                    { loading: 'eager' as const })}
                className="object-cover"
              />
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/55 to-black/35" />
      </motion.div>

      <div className="mx-auto w-full max-w-7xl px-4 pt-28 pb-28 sm:px-6 sm:pt-32 lg:px-8">
        <motion.div
          initial="hidden"
          animate="show"
          variants={stagger(0.12, 0.25)}
          className="mx-auto flex max-w-4xl flex-col items-center text-center"
        >
          <motion.p
            variants={{
              hidden: { opacity: 0, y: reduced ? 0 : 16 },
              show: { opacity: 1, y: 0, transition: smooth },
            }}
            /* Solid dark pill: beige-on-photo measured as low as 1.3:1 over bright
               cabinetry — white on charcoal/70 clears 4.5:1 on every slide. */
            className="rounded-full border border-white/25 bg-kitchen-charcoal/70 px-4 py-1.5 text-xs font-medium tracking-wide text-white backdrop-blur-sm sm:text-sm"
          >
            {hero.eyebrow}
          </motion.p>

          <motion.h1
            variants={reduced ? { hidden: { opacity: 0 }, show: { opacity: 1 } } : wordStagger}
            className="mt-6 font-display text-4xl leading-[1.15] font-bold text-balance text-white sm:text-5xl lg:text-7xl"
          >
            {headlineLines.map((line, lineIndex) => (
              <span key={lineIndex} className="block">
                {line
                  .trim()
                  .split(/\s+/)
                  .map((word, wordIndex) => (
                    <Fragment key={`${lineIndex}-${wordIndex}`}>
                      <motion.span
                        variants={reduced ? undefined : wordChild}
                        className="inline-block"
                      >
                        {word}
                      </motion.span>{' '}
                    </Fragment>
                  ))}
              </span>
            ))}
          </motion.h1>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: reduced ? 0 : 20 },
              show: { opacity: 1, y: 0, transition: smooth },
            }}
            className="mt-6 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg"
          >
            {hero.subheadline}
          </motion.p>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: reduced ? 0 : 20 },
              show: { opacity: 1, y: 0, transition: smooth },
            }}
            className="mt-9 flex w-full flex-wrap items-center justify-center gap-3 sm:gap-4"
          >
            <motion.a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={reduced ? undefined : { y: -3 }}
              whileTap={reduced ? undefined : { scale: 0.97 }}
              transition={{ duration: 0.25, ease: easeOutExpo }}
              className="inline-flex items-center gap-2.5 rounded-full bg-kitchen px-7 py-4 text-base font-semibold text-kitchen-ink shadow-xl shadow-black/25 transition-colors hover:bg-kitchen-deep"
            >
              <WhatsAppGlyph />
              {hero.primaryCta}
            </motion.a>

            <motion.a
              href="#gallery"
              whileHover={reduced ? undefined : { y: -3 }}
              whileTap={reduced ? undefined : { scale: 0.97 }}
              transition={{ duration: 0.25, ease: easeOutExpo }}
              className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/5 px-7 py-4 text-base font-semibold text-white backdrop-blur-sm transition-colors hover:border-white hover:bg-white/15"
            >
              {hero.secondaryCta}
            </motion.a>
          </motion.div>

          <motion.ul
            variants={{
              hidden: { opacity: 0, y: reduced ? 0 : 16 },
              show: { opacity: 1, y: 0, transition: smooth },
            }}
            className="mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-3"
          >
            {hero.badges.map((badge) => (
              <li key={badge} className="flex items-center gap-2 text-sm text-white/80">
                <Check className="h-4 w-4 shrink-0 text-kitchen" aria-hidden="true" />
                {badge}
              </li>
            ))}
          </motion.ul>
        </motion.div>
      </div>

      {/* Slide dots + playback control */}
      {heroSlides.length > 1 && (
        <div className="absolute inset-x-0 bottom-24 z-10 flex items-center justify-center gap-3 sm:bottom-20">
          <div className="flex items-center gap-2.5">
            {heroSlides.map((slide, i) => {
              const isActive = index === i;
              return (
                <button
                  key={slide.url}
                  type="button"
                  onClick={() => goToSlide(i)}
                  aria-label={`מעבר לתמונה ${i + 1}: ${slide.alt}`}
                  aria-current={isActive ? 'true' : undefined}
                  className={`h-2.5 rounded-full transition-all duration-500 ${
                    isActive ? 'w-8 bg-kitchen' : 'w-2.5 bg-white/45 hover:bg-white/70'
                  }`}
                />
              );
            })}
          </div>

          {!reduced && (
            <button
              type="button"
              onClick={() => setPlayback((p) => (p === 'paused' ? 'playing' : 'paused'))}
              aria-label={paused ? slideshowUi.play : slideshowUi.pause}
              aria-pressed={paused}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-kitchen-charcoal/70 text-white transition-colors hover:bg-kitchen-charcoal"
            >
              {paused ? (
                <Play className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Pause className="h-4 w-4" aria-hidden="true" />
              )}
            </button>
          )}
        </div>
      )}

      {/* Scroll cue */}
      <motion.a
        href="#gallery"
        aria-label="גלילה לגלריית המטבחים"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute inset-x-0 bottom-6 z-10 mx-auto flex h-12 w-12 items-center justify-center rounded-full text-white/75 transition-colors hover:text-white sm:bottom-6"
      >
        <motion.span
          animate={reduced ? undefined : { y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="flex"
        >
          <ChevronsDown className="h-7 w-7" aria-hidden="true" />
        </motion.span>
      </motion.a>
    </section>
  );
}
