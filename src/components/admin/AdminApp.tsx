'use client';

import { useCallback, useMemo, useState } from 'react';
import { ArrowRight, LogOut, Plus, Trash2 } from 'lucide-react';
import type { StoredContent, StoredProject } from '@/lib/admin/content';
import GalleryEditor from './GalleryEditor';
import HeroPicker from './HeroPicker';
import { Button, IconButton } from './ui';
import type { PreparedImage } from './imageProcessing';

/** Files prepared during this session, keyed by filename, waiting to be committed. */
export type Pending = Map<string, PreparedImage>;

const emptyProject = (): StoredProject => ({
  slug: '',
  title: '',
  subtitle: '',
  excerpt: '',
  body: [''],
  specs: [{ label: '', value: '' }],
  cover: '',
  images: [],
});

const move = <T,>(list: T[], from: number, to: number): T[] => {
  if (to < 0 || to >= list.length) return list;
  const next = [...list];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
};

export default function AdminApp({ initial }: { initial: StoredContent }) {
  const [content, setContent] = useState<StoredContent>(initial);
  const [editing, setEditing] = useState<number | null>(null);
  const [pending, setPending] = useState<Pending>(new Map());
  const [removed, setRemoved] = useState<string[]>([]);
  const [dirty, setDirty] = useState(false);
  const [status, setStatus] = useState<{ tone: 'ok' | 'error'; text: string } | null>(null);
  const [saving, setSaving] = useState(false);

  const update = useCallback((next: StoredContent) => {
    setContent(next);
    setDirty(true);
    setStatus(null);
  }, []);

  const addPending = useCallback((image: PreparedImage) => {
    setPending((current) => new Map(current).set(image.file, image));
  }, []);

  /** Remember what the editor dropped so the save can prune orphans from the repo. */
  const forget = useCallback((file: string) => {
    setRemoved((current) => (current.includes(file) ? current : [...current, file]));
  }, []);

  const previews = useMemo(() => {
    const map: Record<string, string> = {};
    pending.forEach((image, file) => {
      map[file] = image.previewUrl;
    });
    return map;
  }, [pending]);

  const save = async () => {
    setSaving(true);
    setStatus(null);

    try {
      /* Images go up one at a time as loose blobs — one request carrying all of them
         would blow past the body limit — and the save turns them into a single commit. */
      const added: { file: string; sha: string }[] = [];
      const used = new Set([
        ...content.projects.flatMap((project) => project.images.map((image) => image.file)),
        ...content.heroSlides.map((slide) => slide.file),
      ]);

      for (const [file, image] of pending) {
        if (!used.has(file)) continue;

        const form = new FormData();
        form.append('file', image.blob, file);
        form.append('name', file);

        const response = await fetch('/api/admin/image', { method: 'POST', body: form });
        const data = (await response.json().catch(() => ({}))) as { sha?: string; error?: string };
        if (!response.ok || !data.sha) throw new Error(data.error ?? 'העלאת התמונה נכשלה');
        added.push({ file, sha: data.sha });
      }

      const response = await fetch('/api/admin/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, added, removed, message: 'עדכון גלריה מממשק הניהול' }),
      });
      const data = (await response.json().catch(() => ({}))) as { error?: string };
      if (!response.ok) throw new Error(data.error ?? 'השמירה נכשלה');

      setPending(new Map());
      setRemoved([]);
      setDirty(false);
      setStatus({
        tone: 'ok',
        text: 'נשמר. האתר יתעדכן תוך כדקה — רענן אותו אחר כך כדי לראות את השינוי.',
      });
    } catch (error) {
      setStatus({ tone: 'error', text: (error as Error).message });
    } finally {
      setSaving(false);
    }
  };

  const logout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    window.location.href = '/admin/login';
  };

  const removeGallery = (index: number) => {
    const project = content.projects[index];
    if (!confirm(`למחוק את הגלריה "${project.title}" ואת כל התמונות שלה?`)) return;

    project.images.forEach((image) => forget(image.file));
    update({
      ...content,
      projects: content.projects.filter((_, i) => i !== index),
      heroSlides: content.heroSlides.filter(
        (slide) => !project.images.some((image) => image.file === slide.file),
      ),
    });
  };

  if (editing !== null) {
    return (
      <GalleryEditor
        project={content.projects[editing]}
        previews={previews}
        onAddPending={addPending}
        onForget={forget}
        onChange={(project) =>
          update({
            ...content,
            projects: content.projects.map((entry, i) => (i === editing ? project : entry)),
          })
        }
        onClose={() => setEditing(null)}
      />
    );
  }

  return (
    <main dir="rtl" className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl text-kitchen-ink">ניהול הגלריה</h1>
          <p className="mt-1 text-sm text-kitchen-muted">
            {content.projects.length} גלריות ·{' '}
            {content.projects.reduce((n, p) => n + p.images.length, 0)} תמונות
          </p>
        </div>
        <Button onClick={logout}>
          <LogOut className="h-4 w-4" aria-hidden="true" />
          יציאה
        </Button>
      </header>

      <section className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg text-kitchen-ink">הגלריות</h2>
          <p className="text-xs text-kitchen-muted">הסדר כאן הוא הסדר באתר</p>
        </div>

        <ul className="mt-3 space-y-2">
          {content.projects.map((project, index) => (
            <li
              key={project.slug || `new-${index}`}
              className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-sm"
            >
              <span className="w-5 shrink-0 text-center text-sm tabular-nums text-kitchen-muted">
                {index + 1}
              </span>

              <div className="flex shrink-0 flex-col gap-1">
                <IconButton
                  label="הזזה למעלה"
                  disabled={index === 0}
                  onClick={() =>
                    update({ ...content, projects: move(content.projects, index, index - 1) })
                  }
                >
                  ↑
                </IconButton>
                <IconButton
                  label="הזזה למטה"
                  disabled={index === content.projects.length - 1}
                  onClick={() =>
                    update({ ...content, projects: move(content.projects, index, index + 1) })
                  }
                >
                  ↓
                </IconButton>
              </div>

              <button
                type="button"
                onClick={() => setEditing(index)}
                className="min-w-0 flex-1 text-right"
              >
                <span className="block truncate font-medium text-kitchen-ink">
                  {project.title || 'גלריה ללא שם'}
                </span>
                <span className="block truncate text-xs text-kitchen-muted">
                  {project.images.length} תמונות · {project.subtitle || 'ללא כותרת משנה'}
                </span>
              </button>

              <Button onClick={() => setEditing(index)}>עריכה</Button>

              <IconButton
                label={`מחיקת ${project.title || 'הגלריה'}`}
                className="text-red-700"
                onClick={() => removeGallery(index)}
              >
                <Trash2 className="h-4 w-4" aria-hidden="true" />
              </IconButton>
            </li>
          ))}
        </ul>

        <Button
          className="mt-3"
          onClick={() => {
            update({ ...content, projects: [...content.projects, emptyProject()] });
            setEditing(content.projects.length);
          }}
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          גלריה חדשה
        </Button>
      </section>

      <HeroPicker
        content={content}
        previews={previews}
        onChange={(heroSlides) => update({ ...content, heroSlides })}
      />

      <div className="sticky bottom-0 -mx-4 mt-10 border-t border-kitchen-line bg-kitchen-light/95 px-4 py-4 backdrop-blur sm:-mx-6 sm:px-6">
        {status && (
          <p
            role="status"
            className={`mb-3 text-sm ${status.tone === 'ok' ? 'text-green-700' : 'text-red-700'}`}
          >
            {status.text}
          </p>
        )}
        <div className="flex flex-wrap items-center gap-3">
          <Button tone="primary" onClick={save} disabled={saving || !dirty}>
            {saving ? 'שומר…' : 'שמירה ופרסום'}
          </Button>
          {dirty && !saving && (
            <span className="text-xs text-kitchen-muted">יש שינויים שלא נשמרו</span>
          )}
          <a
            href="/"
            className="ms-auto inline-flex items-center gap-1.5 text-sm text-kitchen-muted hover:text-kitchen-ink"
          >
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
            לאתר
          </a>
        </div>
      </div>
    </main>
  );
}
