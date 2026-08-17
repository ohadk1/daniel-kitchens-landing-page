'use client';

import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { AnimatePresence, motion } from 'motion/react';
import { X } from 'lucide-react';
import { easeOutExpo } from '@/lib/animations';
import { useStillMotion } from '@/lib/useStillMotion';

interface Props {
  title: string;
  content: string;
  icon: React.ReactNode;
}

export default function LegalDialog({ title, content, icon }: Props) {
  const [open, setOpen] = useState(false);
  const reduced = useStillMotion();

  const cardMotion = reduced
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, scale: 0.94, y: 12 },
        animate: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 0.96, y: 8 },
      };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          className="flex w-full items-start gap-2 rounded-xl border border-white/20 px-3 py-2.5 text-start text-sm text-white/80 transition-colors duration-300 hover:bg-kitchen/30 hover:text-white"
        >
          <span aria-hidden="true" className="mt-0.5 shrink-0 text-kitchen">
            {icon}
          </span>
          {/* No truncation: the labels have to survive the a11y widget's 160% text scale. */}
          <span className="min-w-0">{title}</span>
        </button>
      </Dialog.Trigger>

      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <motion.div
                className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-black/60 p-4 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: easeOutExpo }}
              >
                <Dialog.Content asChild forceMount>
                  <motion.div
                    dir="rtl"
                    className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl"
                    {...cardMotion}
                    transition={{ duration: 0.32, ease: easeOutExpo }}
                  >
                    <Dialog.Close asChild>
                      <button
                        type="button"
                        aria-label="סגירה"
                        className="absolute top-4 end-4 grid h-9 w-9 place-items-center rounded-full text-kitchen-muted transition-colors hover:bg-kitchen/40 hover:text-kitchen-ink"
                      >
                        <X className="h-5 w-5" aria-hidden="true" />
                      </button>
                    </Dialog.Close>

                    <div className="flex items-center gap-2 pe-10">
                      <span aria-hidden="true" className="text-kitchen-wood">
                        {icon}
                      </span>
                      <Dialog.Title className="font-display text-xl text-kitchen-ink">
                        {title}
                      </Dialog.Title>
                    </div>

                    <Dialog.Description className="mt-4 max-h-[60vh] overflow-y-auto text-sm leading-relaxed text-kitchen-ink sm:text-base">
                      {content}
                    </Dialog.Description>
                  </motion.div>
                </Dialog.Content>
              </motion.div>
            </Dialog.Overlay>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
