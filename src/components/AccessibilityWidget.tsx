'use client';

import { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { AnimatePresence, motion } from 'motion/react';
import {
  Accessibility,
  Contrast,
  Focus,
  Minus,
  Pause,
  Plus,
  RefreshCw,
  RotateCcw,
  Type,
  X,
  type LucideIcon,
} from 'lucide-react';
import { easeOutExpo } from '@/lib/animations';
import { useStillMotion } from '@/lib/useStillMotion';

const ui = {
  open: 'פתיחת תפריט נגישות',
  close: 'סגירה',
  title: 'הגדרות נגישות',
  fontSize: 'גודל טקסט',
  decrease: 'הקטנת גודל הטקסט',
  increase: 'הגדלת גודל הטקסט',
  resetFont: 'איפוס גודל הטקסט',
  contrast: 'ניגודיות גבוהה',
  stopMotion: 'עצירת אנימציות',
  focus: 'הדגשת פוקוס',
  resetAll: 'איפוס הגדרות',
} as const;

/** Keep in sync with the pre-paint script in `src/app/layout.tsx`. */
const STORAGE_KEY = 'daniel-kitchens:a11y';
const MIN_SCALE = 100;
const MAX_SCALE = 160;
const STEP = 10;

interface Settings {
  fontScale: number;
  contrast: boolean;
  motionOff: boolean;
  focusVisible: boolean;
}

const DEFAULTS: Settings = {
  fontScale: MIN_SCALE,
  contrast: false,
  motionOff: false,
  focusVisible: false,
};

/** localStorage is user-editable, so clamp the scale and coerce the flags rather than
 *  trusting the parsed shape. */
function sanitize(value: unknown): Settings {
  const raw = (value ?? {}) as Record<string, unknown>;
  const scale = Number(raw.fontScale);
  const fontScale = Number.isFinite(scale)
    ? Math.min(MAX_SCALE, Math.max(MIN_SCALE, Math.round(scale / STEP) * STEP))
    : MIN_SCALE;

  return {
    fontScale,
    contrast: raw.contrast === true,
    motionOff: raw.motionOff === true,
    focusVisible: raw.focusVisible === true,
  };
}

function applySettings(settings: Settings) {
  const root = document.documentElement;

  root.style.fontSize =
    settings.fontScale === MIN_SCALE ? '' : `${settings.fontScale}%`;

  const flag = (attr: string, on: boolean, value: string) => {
    if (on) root.setAttribute(attr, value);
    else root.removeAttribute(attr);
  };

  flag('data-contrast', settings.contrast, 'high');
  flag('data-motion', settings.motionOff, 'off');
  flag('data-focus', settings.focusVisible, 'visible');
}

interface ToggleProps {
  label: string;
  icon: LucideIcon;
  checked: boolean;
  onToggle: () => void;
}

function Toggle({ label, icon: Icon, checked, onToggle }: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={onToggle}
      className="flex w-full items-center justify-between gap-3 rounded-xl border border-kitchen-deep px-3 py-2.5 text-sm text-kitchen-ink transition-colors duration-200 hover:bg-kitchen/30"
    >
      <span className="flex items-center gap-2 text-start">
        <Icon className="h-4 w-4 shrink-0 text-kitchen-wood" aria-hidden="true" />
        {label}
      </span>
      {/* Off-state track is kitchen-gray (3.1:1 on the white card and against the
          knob); the knob keeps a ring so it stays readable on both states. */}
      <span
        aria-hidden="true"
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors duration-200 ${
          checked ? 'bg-kitchen-wood' : 'bg-kitchen-gray'
        }`}
      >
        <span
          className="absolute top-1 h-4 w-4 rounded-full bg-white ring-1 ring-kitchen-ink/45 transition-all duration-200"
          style={{ insetInlineStart: checked ? '1.5rem' : '0.25rem' }}
        />
      </span>
    </button>
  );
}

export default function AccessibilityWidget() {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [settings, setSettings] = useState<Settings>(DEFAULTS);
  const still = useStillMotion();

  // Restore saved preferences — the pre-paint script already stamped them on <html>,
  // this only syncs React state to the same source of truth.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setSettings(sanitize(JSON.parse(raw)));
    } catch {
      /* storage blocked — fall back to defaults */
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    applySettings(settings);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      /* storage blocked — settings still apply for this session */
    }
  }, [settings, loaded]);

  const setScale = (next: number) =>
    setSettings((prev) => ({
      ...prev,
      fontScale: Math.min(MAX_SCALE, Math.max(MIN_SCALE, next)),
    }));

  const cardMotion = still
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, y: 16, scale: 0.96 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: 12, scale: 0.97 },
      };

  return (
    /* Radix owns the modal semantics here: focus moves into the panel on open, is
       trapped while it is open and returns to the trigger on close. */
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          aria-label={ui.open}
          className="fixed bottom-6 start-6 z-40 grid h-14 w-14 place-items-center rounded-full bg-kitchen-wood text-white shadow-xl transition-transform duration-200 hover:scale-105 active:scale-95"
        >
          <Accessibility className="h-7 w-7" aria-hidden="true" />
        </button>
      </Dialog.Trigger>

      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Content asChild forceMount aria-describedby={undefined}>
              <motion.div
                dir="rtl"
                className="fixed bottom-[5.75rem] start-6 z-50 w-[300px] max-w-[calc(100vw-3rem)] max-h-[calc(100dvh-6rem)] origin-bottom overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl"
                {...cardMotion}
                transition={{ duration: still ? 0.15 : 0.3, ease: easeOutExpo }}
              >
                <div className="flex items-center justify-between gap-2">
                  <Dialog.Title className="font-display text-base text-kitchen-ink">
                    {ui.title}
                  </Dialog.Title>
                  <Dialog.Close asChild>
                    <button
                      type="button"
                      aria-label={ui.close}
                      className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-kitchen-muted transition-colors hover:bg-kitchen/40 hover:text-kitchen-ink"
                    >
                      <X className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </Dialog.Close>
                </div>

                <div className="mt-4 rounded-xl border border-kitchen-deep px-3 py-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="flex items-center gap-2 text-sm text-kitchen-ink">
                      <Type className="h-4 w-4 text-kitchen-wood" aria-hidden="true" />
                      {ui.fontSize}
                    </span>
                    <span
                      aria-live="polite"
                      className="text-sm font-semibold text-kitchen-muted"
                    >
                      {settings.fontScale}%
                    </span>
                  </div>

                  <div className="mt-3 flex items-center gap-2">
                    <button
                      type="button"
                      aria-label={ui.decrease}
                      disabled={settings.fontScale <= MIN_SCALE}
                      onClick={() => setScale(settings.fontScale - STEP)}
                      className="grid h-9 flex-1 place-items-center rounded-lg bg-kitchen/50 text-kitchen-ink transition-colors hover:bg-kitchen disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <Minus className="h-4 w-4" aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      aria-label={ui.resetFont}
                      onClick={() => setScale(MIN_SCALE)}
                      className="grid h-9 flex-1 place-items-center rounded-lg bg-kitchen/50 text-kitchen-ink transition-colors hover:bg-kitchen"
                    >
                      <RefreshCw className="h-4 w-4" aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      aria-label={ui.increase}
                      disabled={settings.fontScale >= MAX_SCALE}
                      onClick={() => setScale(settings.fontScale + STEP)}
                      className="grid h-9 flex-1 place-items-center rounded-lg bg-kitchen/50 text-kitchen-ink transition-colors hover:bg-kitchen disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <Plus className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                </div>

                <div className="mt-3 space-y-2">
                  <Toggle
                    label={ui.contrast}
                    icon={Contrast}
                    checked={settings.contrast}
                    onToggle={() =>
                      setSettings((prev) => ({ ...prev, contrast: !prev.contrast }))
                    }
                  />
                  <Toggle
                    label={ui.stopMotion}
                    icon={Pause}
                    checked={settings.motionOff}
                    onToggle={() =>
                      setSettings((prev) => ({ ...prev, motionOff: !prev.motionOff }))
                    }
                  />
                  <Toggle
                    label={ui.focus}
                    icon={Focus}
                    checked={settings.focusVisible}
                    onToggle={() =>
                      setSettings((prev) => ({
                        ...prev,
                        focusVisible: !prev.focusVisible,
                      }))
                    }
                  />
                </div>

                <button
                  type="button"
                  onClick={() => setSettings(DEFAULTS)}
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-kitchen-wood px-3 py-2.5 text-sm font-semibold text-white transition-opacity duration-200 hover:opacity-90"
                >
                  <RotateCcw className="h-4 w-4" aria-hidden="true" />
                  {ui.resetAll}
                </button>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
