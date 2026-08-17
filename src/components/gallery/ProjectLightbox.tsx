'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import * as Dialog from '@radix-ui/react-dialog';
import { AnimatePresence, motion, type PanInfo } from 'motion/react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { easeOutExpo } from '@/lib/animations';
import { useStillMotion } from '@/lib/useStillMotion';
import type { Project } from '@/data/projects';

interface Props {
  project: Project | null;
  open: boolean;
  onClose: () => void;
}

const SWIPE_THRESHOLD = 80;

/** +1 = next (visual left in RTL), -1 = previous (visual right). */
const slideVariants = {
  enter: (direction: number) => ({ opacity: 0, x: direction > 0 ? -64 : 64 }),
  center: { opacity: 1, x: 0 },
  exit: (direction: number) => ({ opacity: 0, x: direction > 0 ? 64 : -64 }),
};

export default function ProjectLightbox({ project, open, onClose }: Props) {
  const reduced = useStillMotion();
  // Held so the exit animation still has content to render after the parent clears `project`.
  const [active, setActive] = useState<Project | null>(project);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Keyed on `open` too: reopening the same card keeps `project` identity, and skipping the
  // reset while closed leaves the last frame in place for the exit animation.
  useEffect(() => {
    if (!project || !open) return;
    setActive(project);
    setIndex(0);
    setDirection(0);
  }, [project, open]);

  const total = active?.images.length ?? 0;

  const paginate = useCallback(
    (dir: number) => {
      if (total < 2) return;
      setDirection(dir);
      setIndex((prev) => (prev + dir + total) % total);
    },
    [total],
  );

  const jumpTo = useCallback(
    (next: number) => {
      setDirection(next > index ? 1 : -1);
      setIndex(next);
    },
    [index],
  );

  // RTL reading order: ArrowRight goes back, ArrowLeft goes forward.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        paginate(-1);
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        paginate(1);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, paginate]);

  useEffect(() => {
    if (!open) return;
    thumbRefs.current[index]?.scrollIntoView({
      behavior: reduced ? 'auto' : 'smooth',
      block: 'nearest',
      inline: 'center',
    });
  }, [index, open, reduced]);

  // RTL filmstrip: dragging the photo to the right pulls the next frame in from the left.
  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x > SWIPE_THRESHOLD) paginate(1);
    else if (info.offset.x < -SWIPE_THRESHOLD) paginate(-1);
  };

  const current = active?.images[index];
  const neighbours =
    active && total > 1
      ? [active.images[(index + 1) % total], active.images[(index - 1 + total) % total]]
      : [];

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(next) => {
        if (!next) onClose();
      }}
    >
      <AnimatePresence>
        {open && active && current && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 z-50 bg-black/92 backdrop-blur-sm"
              />
            </Dialog.Overlay>

            <Dialog.Content asChild forceMount aria-describedby={undefined}>
              <motion.div
                dir="rtl"
                initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.35, ease: easeOutExpo }}
                className="fixed inset-0 z-50 flex flex-col overflow-hidden focus:outline-none"
              >
                <header className="flex shrink-0 items-start gap-4 px-4 py-4 sm:px-6">
                  <div className="min-w-0 flex-1">
                    <Dialog.Title className="truncate font-display text-lg text-white sm:text-xl">
                      {active.title}
                    </Dialog.Title>
                    <p className="truncate text-sm text-white/70">{active.subtitle}</p>
                  </div>

                  <p
                    className="shrink-0 rounded-full bg-white/10 px-3 py-1 text-sm tabular-nums text-white/90"
                    aria-live="polite"
                  >
                    <span dir="ltr" aria-hidden="true">{`${index + 1} / ${total}`}</span>
                    <span className="sr-only">{`תמונה ${index + 1} מתוך ${total}`}</span>
                  </p>

                  <Dialog.Close
                    aria-label="סגירה"
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                  >
                    <X className="h-5 w-5" aria-hidden="true" />
                  </Dialog.Close>
                </header>

                <div className="relative min-h-0 flex-1 px-2 pb-2 sm:px-14 lg:px-20">
                  <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                      key={`${active.id}-${index}`}
                      custom={direction}
                      variants={reduced ? undefined : slideVariants}
                      initial={reduced ? { opacity: 0 } : 'enter'}
                      animate={reduced ? { opacity: 1 } : 'center'}
                      exit={reduced ? { opacity: 0 } : 'exit'}
                      transition={{ duration: 0.4, ease: easeOutExpo }}
                      drag={total > 1 ? 'x' : false}
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.18}
                      dragMomentum={false}
                      onDragEnd={onDragEnd}
                      className="absolute inset-0 cursor-grab touch-pan-y active:cursor-grabbing"
                    >
                      <Image
                        src={current.url}
                        alt={current.alt}
                        fill
                        sizes="100vw"
                        loading="lazy"
                        draggable={false}
                        className="select-none object-contain"
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* Neighbours stay mounted so the next swipe is instant. */}
                  <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-0">
                    {neighbours.map((image) =>
                      image ? (
                        <Image
                          key={image.url}
                          src={image.url}
                          alt=""
                          fill
                          sizes="100vw"
                          loading="lazy"
                          className="object-contain"
                        />
                      ) : null,
                    )}
                  </div>

                  {total > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={() => paginate(-1)}
                        aria-label="התמונה הקודמת"
                        className="absolute top-1/2 start-1 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25 sm:start-3 sm:h-12 sm:w-12"
                      >
                        <ChevronRight className="h-6 w-6" aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        onClick={() => paginate(1)}
                        aria-label="התמונה הבאה"
                        className="absolute top-1/2 end-1 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25 sm:end-3 sm:h-12 sm:w-12"
                      >
                        <ChevronLeft className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </>
                  )}
                </div>

                <div className="shrink-0 overflow-x-auto px-4 py-4 sm:px-6">
                  {/* min-w-full + w-max centres a short strip without clipping a long one. */}
                  <ul className="flex w-max min-w-full justify-center gap-2 sm:gap-3">
                    {active.images.map((image, i) => (
                      <li key={image.url}>
                        <button
                          type="button"
                          ref={(node) => {
                            thumbRefs.current[i] = node;
                          }}
                          onClick={() => jumpTo(i)}
                          aria-label={`מעבר לתמונה ${i + 1} מתוך ${total}`}
                          aria-current={i === index ? 'true' : undefined}
                          className={`relative h-14 w-20 overflow-hidden rounded-lg transition-opacity sm:h-16 sm:w-24 ${
                            i === index
                              ? 'opacity-100 ring-2 ring-kitchen'
                              : 'opacity-50 hover:opacity-90'
                          }`}
                        >
                          <Image
                            src={image.url}
                            alt=""
                            fill
                            sizes="96px"
                            loading="lazy"
                            className="object-cover"
                          />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
