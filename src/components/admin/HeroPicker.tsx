'use client';

import { useMemo } from 'react';
import type { StoredContent, StoredImage } from '@/lib/admin/content';
import { IconButton } from './ui';

/** Chooses which frames run in the slideshow at the top of the home page. Only frames
 *  that already belong to a gallery can be picked, plus the dedicated `hero-*` files. */
export default function HeroPicker({
  content,
  previews,
  onChange,
}: {
  content: StoredContent;
  previews: Record<string, string>;
  onChange: (slides: StoredImage[]) => void;
}) {
  const chosen = content.heroSlides;

  const candidates = useMemo(
    () =>
      content.projects.flatMap((project) =>
        project.images.map((image) => ({
          file: image.file,
          title: project.title,
          alt: image.alt,
        })),
      ),
    [content.projects],
  );

  /* Slides added before this panel existed point at hero-*.webp files that are not in
     any gallery. They stay listed so they can be removed, just not re-added. */
  const orphans = chosen.filter((slide) => !candidates.some((c) => c.file === slide.file));

  const srcOf = (file: string) => previews[file] ?? `/images/${file}`;
  const isChosen = (file: string) => chosen.some((slide) => slide.file === file);

  const toggle = (file: string, alt: string, title: string) => {
    if (isChosen(file)) {
      if (chosen.length === 1) return;
      onChange(chosen.filter((slide) => slide.file !== file));
      return;
    }
    onChange([...chosen, { file, alt: alt ? `${alt} — ${title}` : title }]);
  };

  const move = (index: number, to: number) => {
    if (to < 0 || to >= chosen.length) return;
    const next = [...chosen];
    const [slide] = next.splice(index, 1);
    next.splice(to, 0, slide);
    onChange(next);
  };

  return (
    <section className="mt-10">
      <h2 className="font-display text-lg text-kitchen-ink">תמונות ראש הדף</h2>
      <p className="mt-1 text-xs text-kitchen-muted">
        התמונות שמתחלפות בראש דף הבית. עדיף תמונות לרוחב — בראש הדף הן נפרשות על כל המסך.
      </p>

      <ol className="mt-4 space-y-2">
        {chosen.map((slide, index) => (
          <li key={slide.file} className="flex items-center gap-3 rounded-2xl bg-white p-2.5 shadow-sm">
            <span className="w-5 shrink-0 text-center text-sm tabular-nums text-kitchen-muted">
              {index + 1}
            </span>
            {/* eslint-disable-next-line @next/next/no-img-element -- blob previews cannot go through the image optimizer */}
            <img
              src={srcOf(slide.file)}
              alt=""
              className="h-12 w-20 shrink-0 rounded-lg bg-kitchen-section object-cover"
            />
            <span className="min-w-0 flex-1 truncate text-sm text-kitchen-ink">{slide.alt}</span>
            <IconButton label="הזזה למעלה" disabled={index === 0} onClick={() => move(index, index - 1)}>
              ↑
            </IconButton>
            <IconButton
              label="הזזה למטה"
              disabled={index === chosen.length - 1}
              onClick={() => move(index, index + 1)}
            >
              ↓
            </IconButton>
            <IconButton
              label="הסרה מראש הדף"
              disabled={chosen.length === 1}
              onClick={() => onChange(chosen.filter((_, i) => i !== index))}
            >
              ✕
            </IconButton>
          </li>
        ))}
      </ol>

      {orphans.length > 0 && (
        <p className="mt-2 text-xs text-kitchen-muted">
          {orphans.length === 1 ? 'שקופית אחת משתמשת' : `${orphans.length} שקופיות משתמשות`} בתמונה
          ייעודית שאינה חלק מגלריה. אפשר להסיר אותה, אך לא להוסיף אותה מחדש מכאן.
        </p>
      )}

      <details className="mt-4">
        <summary className="cursor-pointer text-sm font-medium text-kitchen-ink">
          בחירת תמונות מהגלריות
        </summary>
        <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-5">
          {candidates.map((candidate) => (
            <button
              key={candidate.file}
              type="button"
              onClick={() => toggle(candidate.file, candidate.alt, candidate.title)}
              aria-pressed={isChosen(candidate.file)}
              title={`${candidate.title} — ${candidate.alt}`}
              className={`relative overflow-hidden rounded-lg border-2 transition-colors ${
                isChosen(candidate.file) ? 'border-kitchen-wood' : 'border-transparent'
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- blob previews cannot go through the image optimizer */}
              <img
                src={srcOf(candidate.file)}
                alt={`${candidate.title} — ${candidate.alt}`}
                className="aspect-[4/3] w-full bg-kitchen-section object-cover"
              />
            </button>
          ))}
        </div>
      </details>
    </section>
  );
}
