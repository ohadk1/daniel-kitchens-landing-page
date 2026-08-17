'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { whatsappUrl } from '@/data/site';
import { easeOutExpo } from '@/lib/animations';
import { useStillMotion } from '@/lib/useStillMotion';

const LABEL = 'דברו איתנו';
const ARIA = 'פנייה בוואטסאפ לקבלת הצעת מחיר';
const SHOW_AFTER = 400;

/** WhatsApp's teal-green, nudged a shade darker: white on #25D366 is only 1.98:1, this
 *  lands at ~4.8:1 so both the glyph and the hover label clear WCAG AA. */
const BRAND = '#0e8074';

function WhatsAppGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7" aria-hidden="true">
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.65-2.05-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.47s1.06 2.87 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.28.17-1.41-.07-.13-.27-.2-.57-.35Z" />
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.33 4.96L2 22l5.26-1.38a9.87 9.87 0 0 0 4.77 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.13h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.36c0-4.54 3.7-8.24 8.25-8.24a8.18 8.18 0 0 1 5.82 2.42 8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24Z" />
    </svg>
  );
}

export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false);
  const reduced = useStillMotion();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SHOW_AFTER);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={ARIA}
          style={{ backgroundColor: BRAND }}
          className="group fixed bottom-6 end-6 z-40 flex h-14 items-center rounded-full text-white shadow-xl ring-1 ring-kitchen-charcoal/30"
          initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.6 }}
          animate={reduced ? { opacity: 1 } : { opacity: 1, scale: 1 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.35, ease: easeOutExpo }}
          whileHover={reduced ? undefined : { scale: 1.08 }}
          whileTap={reduced ? undefined : { scale: 0.95 }}
        >
          {!reduced && (
            <span
              aria-hidden="true"
              style={{ backgroundColor: BRAND }}
              className="absolute inset-0 -z-10 animate-ping rounded-full opacity-60 motion-reduce:hidden"
            />
          )}

          <span className="grid h-14 w-14 shrink-0 place-items-center">
            <WhatsAppGlyph />
          </span>

          <span
            aria-hidden="true"
            className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold opacity-0 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:max-w-[10rem] group-hover:pe-5 group-hover:opacity-100 group-focus-visible:max-w-[10rem] group-focus-visible:pe-5 group-focus-visible:opacity-100"
          >
            {LABEL}
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
