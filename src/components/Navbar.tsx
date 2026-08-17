'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import * as Dialog from '@radix-ui/react-dialog';
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from 'motion/react';
import { ChevronDown, Mail, Menu, Phone, Printer, X } from 'lucide-react';
import { contact, navLinks, whatsappUrl } from '@/data/site';
import { easeOutExpo } from '@/lib/animations';
import { useStillMotion } from '@/lib/useStillMotion';

/** Matches the `lg:` breakpoint the desktop nav switches at. */
const DESKTOP_QUERY = '(min-width: 1024px)';

interface ContactRow {
  label: string;
  number: string;
  /** Missing on the fax row — it renders as plain text, not a link. */
  tel?: string;
}

const contactRows: ContactRow[] = [
  { label: contact.office.label, number: contact.office.number, tel: contact.office.tel },
  { label: contact.fax.label, number: contact.fax.number },
  { label: contact.eliran.label, number: contact.eliran.number, tel: contact.eliran.tel },
  { label: contact.shimrit.label, number: contact.shimrit.number, tel: contact.shimrit.tel },
];

const sectionIds = navLinks.map((l) => l.href.slice(1));

function WhatsAppGlyph({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.29-.77.95-.94 1.15-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.29-.02-.45.13-.6.13-.13.3-.35.44-.52.15-.17.2-.29.3-.49.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.29-1.04 1.01-1.04 2.47s1.06 2.86 1.21 3.06c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.75-.71 2-1.4.25-.69.25-1.28.17-1.4-.07-.12-.27-.2-.57-.35zM12.05 21.8h-.02a9.8 9.8 0 0 1-4.99-1.37l-.36-.21-3.71.97.99-3.62-.23-.37a9.77 9.77 0 0 1-1.5-5.22c0-5.4 4.4-9.8 9.82-9.8a9.75 9.75 0 0 1 6.94 2.88 9.72 9.72 0 0 1 2.87 6.93c0 5.4-4.4 9.81-9.81 9.81zM20.52 3.45A11.72 11.72 0 0 0 12.05 0C5.57 0 .3 5.27.29 11.75c0 2.07.54 4.09 1.57 5.87L.19 24l6.53-1.71a11.73 11.73 0 0 0 5.32 1.36h.01c6.48 0 11.75-5.27 11.76-11.75a11.68 11.68 0 0 0-3.29-8.45z" />
    </svg>
  );
}

function ContactList({
  tone,
  onNavigate,
}: {
  tone: 'light' | 'dark';
  onNavigate?: () => void;
}) {
  const rowBase =
    tone === 'dark'
      ? 'text-white/85 hover:text-white hover:bg-white/10'
      : 'text-kitchen-ink hover:bg-kitchen-ink/10';
  const labelTone = tone === 'dark' ? 'text-white/55' : 'text-kitchen-muted';

  return (
    <ul className="flex flex-col gap-0.5">
      {contactRows.map((row) => {
        const inner = (
          <>
            {row.tel ? (
              <Phone className="h-4 w-4 shrink-0 opacity-70" aria-hidden="true" />
            ) : (
              <Printer className="h-4 w-4 shrink-0 opacity-70" aria-hidden="true" />
            )}
            <span className={`text-xs ${labelTone}`}>{row.label}</span>
            <span dir="ltr" className="ms-auto font-medium tabular-nums">
              {row.number}
            </span>
          </>
        );

        return (
          <li key={row.label}>
            {row.tel ? (
              <a
                href={`tel:${row.tel}`}
                onClick={onNavigate}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${rowBase}`}
              >
                {inner}
              </a>
            ) : (
              <div
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${
                  tone === 'dark' ? 'text-white/60' : 'text-kitchen-muted'
                }`}
              >
                {inner}
              </div>
            )}
          </li>
        );
      })}
      <li>
        <a
          href={`mailto:${contact.email}`}
          onClick={onNavigate}
          className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${rowBase}`}
        >
          <Mail className="h-4 w-4 shrink-0 opacity-70" aria-hidden="true" />
          <span dir="ltr" className="truncate">
            {contact.email}
          </span>
        </a>
      </li>
    </ul>
  );
}

export default function Navbar() {
  const reduced = useStillMotion();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>(sectionIds[0]);
  const [contactOpen, setContactOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const contactWrapRef = useRef<HTMLLIElement>(null);
  /** Radix returns focus to the trigger on close — skip that when the panel closed
   *  because a link was followed, so the anchor target keeps the focus. */
  const restoreFocusRef = useRef(true);

  const { scrollYProgress, scrollY } = useScroll();
  const progressScaleX = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 40,
    restDelta: 0.001,
  });

  useMotionValueEvent(scrollY, 'change', (v) => {
    setScrolled(v > 40);
  });

  // Initial state on mount (deep links / restored scroll position).
  useEffect(() => {
    setScrolled(window.scrollY > 40);
  }, []);

  // Active-section tracking.
  useEffect(() => {
    const els = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.25, 0.5, 1] },
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Escape closes the contact dropdown — the mobile dialog handles its own.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setContactOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Outside click closes the desktop contact dropdown.
  useEffect(() => {
    if (!contactOpen) return;
    const onDown = (e: PointerEvent) => {
      if (!contactWrapRef.current?.contains(e.target as Node)) setContactOpen(false);
    };
    document.addEventListener('pointerdown', onDown);
    return () => document.removeEventListener('pointerdown', onDown);
  }, [contactOpen]);

  // Radix owns focus trap, focus restore, Escape and scroll lock — but a resize past
  // the desktop breakpoint would leave the trap on a hidden panel.
  useEffect(() => {
    if (!mobileOpen) return;
    const mq = window.matchMedia(DESKTOP_QUERY);
    const onChange = () => {
      if (mq.matches) setMobileOpen(false);
    };
    onChange();
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [mobileOpen]);

  const closeMobile = useCallback((restoreFocus = true) => {
    restoreFocusRef.current = restoreFocus;
    setMobileOpen(false);
  }, []);

  const solid = scrolled || mobileOpen;
  const linkTone = solid ? 'text-kitchen-ink' : 'text-white';

  return (
    <motion.header
      initial={reduced ? { opacity: 0 } : { y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: easeOutExpo, delay: 0.1 }}
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300 ${
        scrolled ? 'bg-kitchen/85 shadow-[0_4px_24px_rgba(28,26,23,0.12)] backdrop-blur-xl' : 'bg-transparent'
      }`}
    >
      {/* Reading progress — origin is the visual right because the page is RTL. */}
      <motion.div
        aria-hidden="true"
        style={{ scaleX: progressScaleX, transformOrigin: 'right' }}
        className="absolute inset-x-0 top-0 h-[3px] bg-kitchen-wood"
      />

      <Dialog.Root
        open={mobileOpen}
        onOpenChange={(open) => {
          if (open) restoreFocusRef.current = true;
          setMobileOpen(open);
        }}
      >
        <nav
          aria-label="ניווט ראשי"
          /* Wraps instead of clipping once the a11y widget scales the root font (1.4.4). */
          className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-4 gap-y-1 px-4 py-1 sm:px-6 lg:px-8"
        >
          <a
            href="#home"
            aria-label="מטבחי דניאל - חזרה לראש הדף"
            className={`flex shrink-0 items-center transition-all duration-300 ${
              scrolled ? 'h-16' : 'h-20'
            }`}
          >
            <Image
              src="/logo-main.png"
              alt="מטבחי דניאל - לוגו"
              width={957}
              height={356}
              sizes="150px"
              /* Above the fold: no preload (the hero owns that), but no lazy pop-in either. */
              loading="eager"
              /* The logo artwork is solid black on transparent — invert it to white while the
                 bar floats over the dark hero, keep it black once the beige bar kicks in. */
              className={`w-auto transition-all duration-300 ${
                scrolled
                  ? 'h-10'
                  : 'h-12 brightness-0 invert drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]'
              }`}
            />
          </a>

          {/* Desktop nav */}
          <ul className="hidden flex-wrap items-center gap-x-1 gap-y-0.5 lg:flex">
            {navLinks.map((link) => {
              const id = link.href.slice(1);
              const isActive = active === id;
              return (
                <li key={link.href} className="relative">
                  <a
                    href={link.href}
                    aria-current={isActive ? 'true' : undefined}
                    className={`group relative block px-3 py-2 text-sm font-medium transition-colors ${linkTone} ${
                      isActive ? 'opacity-100' : 'opacity-80 hover:opacity-100'
                    }`}
                  >
                    {link.label}
                    <span
                      aria-hidden="true"
                      className={`pointer-events-none absolute inset-x-3 bottom-1 h-px origin-center scale-x-0 transition-transform duration-300 group-hover:scale-x-100 ${
                        solid ? 'bg-kitchen-ink/50' : 'bg-white/60'
                      }`}
                    />
                  </a>
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-pill"
                      aria-hidden="true"
                      transition={{ duration: 0.4, ease: easeOutExpo }}
                      className={`absolute inset-x-3 -bottom-0.5 h-[3px] rounded-full ${
                        solid ? 'bg-kitchen-wood' : 'bg-kitchen'
                      }`}
                    />
                  )}
                </li>
              );
            })}

            {/* Contact dropdown */}
            <li
              className="relative"
              ref={contactWrapRef}
              /* Mouse-only: on touch laptops a tap fires a synthetic enter and then a
                 click, which used to open and immediately re-close the panel. */
              onPointerEnter={(e) => {
                if (e.pointerType === 'mouse') setContactOpen(true);
              }}
              onPointerLeave={(e) => {
                if (e.pointerType === 'mouse') setContactOpen(false);
              }}
            >
              <button
                type="button"
                onClick={() => setContactOpen((v) => !v)}
                aria-expanded={contactOpen}
                aria-controls="navbar-contact-menu"
                className={`flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors ${linkTone} opacity-80 hover:opacity-100`}
              >
                צור קשר
                <ChevronDown
                  aria-hidden="true"
                  className={`h-4 w-4 transition-transform duration-300 ${
                    contactOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <AnimatePresence>
                {contactOpen && (
                  <motion.div
                    id="navbar-contact-menu"
                    initial={{ opacity: 0, y: reduced ? 0 : -8, scale: reduced ? 1 : 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: reduced ? 0 : -8, scale: reduced ? 1 : 0.97 }}
                    transition={{ duration: 0.22, ease: easeOutExpo }}
                    className="absolute end-0 top-full w-72 origin-top rounded-2xl border border-kitchen-ink/10 bg-kitchen-light/95 p-2 shadow-2xl backdrop-blur-xl"
                  >
                    <ContactList tone="light" onNavigate={() => setContactOpen(false)} />
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          </ul>

          <div className="flex shrink-0 items-center gap-2">
            <motion.a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileTap={reduced ? undefined : { scale: 0.95 }}
              whileHover={reduced ? undefined : { scale: 1.03 }}
              transition={{ duration: 0.2, ease: easeOutExpo }}
              className="hidden items-center gap-2 rounded-full bg-kitchen-wood px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-kitchen-wood/25 transition-colors hover:bg-kitchen-wood/90 sm:flex"
            >
              <WhatsAppGlyph />
              הצעת מחיר
            </motion.a>

            <Dialog.Trigger asChild>
              <button
                type="button"
                aria-label="פתיחת תפריט"
                className={`relative z-50 inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors lg:hidden ${
                  scrolled
                    ? 'text-kitchen-ink hover:bg-kitchen-ink/10'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                <Menu className="h-6 w-6" aria-hidden="true" />
              </button>
            </Dialog.Trigger>
          </div>
        </nav>

        {/* Mobile panel — Radix supplies the focus trap, focus restore, Escape and
            scroll lock; the close button now lives inside the dialog. */}
        <AnimatePresence>
          {mobileOpen && (
            <Dialog.Portal forceMount>
              <Dialog.Overlay asChild forceMount>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.28, ease: easeOutExpo }}
                  className="fixed inset-0 z-[60] bg-kitchen-charcoal/97 backdrop-blur-md lg:hidden"
                >
                  <Dialog.Content
                    asChild
                    forceMount
                    aria-describedby={undefined}
                    onCloseAutoFocus={(event) => {
                      if (!restoreFocusRef.current) event.preventDefault();
                      restoreFocusRef.current = true;
                    }}
                  >
                    <motion.div
                      initial="hidden"
                      animate="show"
                      variants={{
                        show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
                      }}
                      className="flex h-[100dvh] flex-col overflow-y-auto pb-10"
                    >
                      <Dialog.Title className="sr-only">תפריט ניווט</Dialog.Title>

                      <div
                        className={`mx-auto flex w-full max-w-7xl shrink-0 items-center justify-end px-4 sm:px-6 ${
                          scrolled ? 'h-16' : 'h-20'
                        }`}
                      >
                        <Dialog.Close asChild>
                          <button
                            type="button"
                            aria-label="סגירת תפריט"
                            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10"
                          >
                            <X className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </Dialog.Close>
                      </div>

                      <div className="px-6 pt-4">
                        <ul className="flex flex-col gap-1">
                          {navLinks.map((link) => (
                            <motion.li
                              key={link.href}
                              variants={{
                                hidden: { opacity: 0, y: reduced ? 0 : 16 },
                                show: {
                                  opacity: 1,
                                  y: 0,
                                  transition: { duration: 0.45, ease: easeOutExpo },
                                },
                              }}
                            >
                              <a
                                href={link.href}
                                onClick={() => closeMobile(false)}
                                aria-current={active === link.href.slice(1) ? 'true' : undefined}
                                className={`block rounded-xl px-3 py-3 font-display text-2xl transition-colors ${
                                  active === link.href.slice(1)
                                    ? 'text-kitchen'
                                    : 'text-white hover:text-kitchen'
                                }`}
                              >
                                {link.label}
                              </a>
                            </motion.li>
                          ))}
                        </ul>

                        <motion.div
                          variants={{
                            hidden: { opacity: 0, y: reduced ? 0 : 16 },
                            show: {
                              opacity: 1,
                              y: 0,
                              transition: { duration: 0.45, ease: easeOutExpo },
                            },
                          }}
                          className="mt-8 border-t border-white/15 pt-6"
                        >
                          <p className="mb-2 px-3 text-xs font-semibold tracking-wide text-white/50">
                            צור קשר
                          </p>
                          <ContactList tone="dark" onNavigate={() => closeMobile(false)} />
                        </motion.div>

                        <motion.a
                          variants={{
                            hidden: { opacity: 0, y: reduced ? 0 : 16 },
                            show: {
                              opacity: 1,
                              y: 0,
                              transition: { duration: 0.45, ease: easeOutExpo },
                            },
                          }}
                          href={whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => closeMobile(false)}
                          className="mt-8 flex items-center justify-center gap-2 rounded-full bg-kitchen-wood px-6 py-4 text-base font-semibold text-white active:scale-[0.98]"
                        >
                          <WhatsAppGlyph className="h-5 w-5" />
                          הצעת מחיר
                        </motion.a>
                      </div>
                    </motion.div>
                  </Dialog.Content>
                </motion.div>
              </Dialog.Overlay>
            </Dialog.Portal>
          )}
        </AnimatePresence>
      </Dialog.Root>
    </motion.header>
  );
}
