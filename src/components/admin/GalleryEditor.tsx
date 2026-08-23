'use client';

import { useRef, useState } from 'react';
import { ArrowRight, ImagePlus, Star, Trash2 } from 'lucide-react';
import type { StoredProject } from '@/lib/admin/content';
import { prepareImage, type PreparedImage } from './imageProcessing';
import { Button, Field, IconButton, TextArea, TextInput } from './ui';

/** Paragraphs are edited as one block of text and split on blank lines — an array
 *  editor for prose is more machinery than the job needs. */
const toText = (paragraphs: string[]) => paragraphs.join('\n\n');
const toParagraphs = (text: string) =>
  text
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

const move = <T,>(list: T[], from: number, to: number): T[] => {
  if (to < 0 || to >= list.length) return list;
  const next = [...list];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
};

type Rows = { label: string; value: string }[];

function RowEditor({
  legend,
  hint,
  rows,
  onChange,
}: {
  legend: string;
  hint: string;
  rows: Rows;
  onChange: (rows: Rows) => void;
}) {
  return (
    <fieldset>
      <legend className="mb-1.5 text-sm font-medium text-kitchen-ink">{legend}</legend>
      <p className="mb-2 text-xs text-kitchen-muted">{hint}</p>

      <div className="space-y-2">
        {rows.map((row, index) => (
          <div key={index} className="flex gap-2">
            <TextInput
              value={row.label}
              placeholder="שם השדה"
              aria-label={`${legend}: שם השדה ${index + 1}`}
              className="w-36 shrink-0"
              onChange={(event) =>
                onChange(rows.map((r, i) => (i === index ? { ...r, label: event.target.value } : r)))
              }
            />
            <TextInput
              value={row.value}
              placeholder="הערך"
              aria-label={`${legend}: ערך ${index + 1}`}
              onChange={(event) =>
                onChange(rows.map((r, i) => (i === index ? { ...r, value: event.target.value } : r)))
              }
            />
            <IconButton
              label={`מחיקת שורה ${index + 1}`}
              className="self-center text-red-700"
              onClick={() => onChange(rows.filter((_, i) => i !== index))}
            >
              <Trash2 className="h-4 w-4" aria-hidden="true" />
            </IconButton>
          </div>
        ))}
      </div>

      <Button className="mt-2" onClick={() => onChange([...rows, { label: '', value: '' }])}>
        הוספת שורה
      </Button>
    </fieldset>
  );
}

export default function GalleryEditor({
  project,
  previews,
  onChange,
  onAddPending,
  onForget,
  onClose,
}: {
  project: StoredProject;
  /** Blob URLs for images added in this session that are not on the server yet. */
  previews: Record<string, string>;
  onChange: (project: StoredProject) => void;
  onAddPending: (image: PreparedImage) => void;
  onForget: (file: string) => void;
  onClose: () => void;
}) {
  const fileInput = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const set = <K extends keyof StoredProject>(key: K, value: StoredProject[K]) =>
    onChange({ ...project, [key]: value });

  const srcOf = (file: string) => previews[file] ?? `/images/${file}`;

  const addFiles = async (list: FileList | null) => {
    if (!list?.length) return;
    setBusy(true);
    setError('');

    try {
      const slug = project.slug || 'gallery';
      const added: StoredProject['images'] = [];

      for (const file of Array.from(list)) {
        const prepared = await prepareImage(file, slug);
        // The same photo twice would produce the same content hash — keep one.
        if (project.images.some((image) => image.file === prepared.file)) continue;
        onAddPending(prepared);
        added.push({ file: prepared.file, alt: '' });
      }

      const images = [...project.images, ...added];
      onChange({ ...project, images, cover: project.cover || images[0]?.file || '' });
    } catch (cause) {
      setError((cause as Error).message || 'לא הצלחתי לקרוא את התמונה');
    } finally {
      setBusy(false);
      if (fileInput.current) fileInput.current.value = '';
    }
  };

  const removeImage = (index: number) => {
    const [gone] = project.images.slice(index, index + 1);
    const images = project.images.filter((_, i) => i !== index);
    onForget(gone.file);
    onChange({
      ...project,
      images,
      cover: project.cover === gone.file ? (images[0]?.file ?? '') : project.cover,
    });
  };

  return (
    <main dir="rtl" className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <button
        type="button"
        onClick={onClose}
        className="inline-flex items-center gap-1.5 text-sm text-kitchen-muted hover:text-kitchen-ink"
      >
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
        חזרה לרשימת הגלריות
      </button>

      <h1 className="mt-3 font-display text-2xl text-kitchen-ink">
        {project.title || 'גלריה חדשה'}
      </h1>

      <div className="mt-7 space-y-6 rounded-2xl bg-white p-5 shadow-sm sm:p-6">
        <Field label="שם הגלריה" hint="מופיע ככותרת בעמוד הגלריה ועל הכרטיס בדף הבית.">
          <TextInput
            value={project.title}
            onChange={(event) => set('title', event.target.value)}
            placeholder="למשל: אפור מעושן מט"
          />
        </Field>

        <Field
          label="כתובת הדף"
          hint="באותיות אנגליות קטנות ומקפים בלבד. זה מה שמופיע בשורת הכתובת: /kitchens/smoked"
        >
          <TextInput
            value={project.slug}
            dir="ltr"
            onChange={(event) => set('slug', event.target.value.toLowerCase().trim())}
            placeholder="smoked"
          />
        </Field>

        <Field label="כותרת משנה" hint="שורה אחת מתחת לשם, על הכרטיס ובראש עמוד הגלריה.">
          <TextInput
            value={project.subtitle}
            onChange={(event) => set('subtitle', event.target.value)}
            placeholder="טאופ מעושן, גומחה מוארת ואי אבן"
          />
        </Field>

        <Field label="תיאור קצר" hint="הטקסט שמופיע על הכרטיס בגלריה הראשית.">
          <TextArea
            rows={3}
            value={project.excerpt}
            onChange={(event) => set('excerpt', event.target.value)}
          />
        </Field>

        <Field
          label="תיאור מלא"
          hint="הטקסט בעמוד הגלריה. שורה ריקה בין פסקאות מפרידה אותן."
        >
          <TextArea
            rows={10}
            value={toText(project.body)}
            onChange={(event) => set('body', toParagraphs(event.target.value))}
          />
        </Field>

        <RowEditor
          legend="מפרט"
          hint="הטבלה בצד עמוד הגלריה. למשל: חזיתות · מט בגוון אפור מעושן"
          rows={project.specs}
          onChange={(specs) => set('specs', specs)}
        />

        <RowEditor
          legend="קרדיטים"
          hint="לא חובה. למשל: צילום · מאור מויאל"
          rows={project.credits ?? []}
          onChange={(credits) => set('credits', credits)}
        />

        <Field label="גודל הכרטיס בגלריה הראשית" hint="כרטיס רחב מתאים לתמונת שער לרוחב, גבוה לתמונה לאורך.">
          <select
            value={project.span ?? 'normal'}
            onChange={(event) => {
              const value = event.target.value;
              set('span', value === 'wide' || value === 'tall' ? value : undefined);
            }}
            className="w-full rounded-xl border border-kitchen-line bg-white px-3.5 py-2.5 text-sm text-kitchen-ink outline-none focus:border-kitchen-wood"
          >
            <option value="normal">רגיל</option>
            <option value="wide">רחב</option>
            <option value="tall">גבוה</option>
          </select>
        </Field>
      </div>

      <section className="mt-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-display text-lg text-kitchen-ink">
            תמונות ({project.images.length})
          </h2>
          <Button
            tone="primary"
            disabled={busy}
            onClick={() => fileInput.current?.click()}
          >
            <ImagePlus className="h-4 w-4" aria-hidden="true" />
            {busy ? 'מעבד…' : 'הוספת תמונות'}
          </Button>
          <input
            ref={fileInput}
            type="file"
            accept="image/*"
            multiple
            hidden
            onChange={(event) => addFiles(event.target.files)}
          />
        </div>

        <p className="mt-1.5 text-xs text-kitchen-muted">
          התמונות מוקטנות ומומרות אוטומטית. הראשונה ברשימה היא זו שנפתחת ראשונה בעמוד;
          הכוכב מסמן את תמונת השער.
        </p>

        {error && (
          <p role="alert" className="mt-3 text-sm text-red-700">
            {error}
          </p>
        )}

        <ul className="mt-4 space-y-2">
          {project.images.map((image, index) => (
            <li key={image.file} className="flex gap-3 rounded-2xl bg-white p-3 shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element -- blob previews cannot go through the image optimizer */}
              <img
                src={srcOf(image.file)}
                alt=""
                className="h-20 w-28 shrink-0 rounded-lg bg-kitchen-section object-cover"
              />

              <div className="min-w-0 flex-1">
                <TextInput
                  value={image.alt}
                  placeholder="מה רואים בתמונה"
                  aria-label={`תיאור תמונה ${index + 1}`}
                  onChange={(event) =>
                    set(
                      'images',
                      project.images.map((entry, i) =>
                        i === index ? { ...entry, alt: event.target.value } : entry,
                      ),
                    )
                  }
                />
                <p className="mt-1 truncate text-[11px] text-kitchen-muted" dir="ltr">
                  {image.file}
                  {previews[image.file] ? ' · חדשה, טרם נשמרה' : ''}
                </p>
              </div>

              <div className="flex shrink-0 flex-col gap-1">
                <div className="flex gap-1">
                  <IconButton
                    label="הזזה למעלה"
                    disabled={index === 0}
                    onClick={() => set('images', move(project.images, index, index - 1))}
                  >
                    ↑
                  </IconButton>
                  <IconButton
                    label="הזזה למטה"
                    disabled={index === project.images.length - 1}
                    onClick={() => set('images', move(project.images, index, index + 1))}
                  >
                    ↓
                  </IconButton>
                </div>
                <div className="flex gap-1">
                  <IconButton
                    label={
                      project.cover === image.file ? 'זו תמונת השער' : 'הגדרה כתמונת שער'
                    }
                    className={project.cover === image.file ? 'text-kitchen-wood' : ''}
                    onClick={() => set('cover', image.file)}
                  >
                    <Star
                      className="h-4 w-4"
                      fill={project.cover === image.file ? 'currentColor' : 'none'}
                      aria-hidden="true"
                    />
                  </IconButton>
                  <IconButton
                    label={`מחיקת תמונה ${index + 1}`}
                    className="text-red-700"
                    onClick={() => removeImage(index)}
                  >
                    <Trash2 className="h-4 w-4" aria-hidden="true" />
                  </IconButton>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {project.images.length === 0 && (
          <p className="mt-4 rounded-2xl border border-dashed border-kitchen-line p-6 text-center text-sm text-kitchen-muted">
            עדיין אין תמונות בגלריה הזאת.
          </p>
        )}
      </section>

      <div className="mt-8">
        <Button tone="primary" onClick={onClose}>
          סיימתי — חזרה לרשימה
        </Button>
        <p className="mt-2 text-xs text-kitchen-muted">
          השינויים נשמרים באתר רק בלחיצה על &quot;שמירה ופרסום&quot; במסך הראשי.
        </p>
      </div>
    </main>
  );
}
