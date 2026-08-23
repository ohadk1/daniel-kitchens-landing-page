/** Shape of content/projects.json, plus the validation the save endpoint runs before
 *  anything is committed. The panel writes straight into the repository, so nothing
 *  here trusts its input: bad slugs or filenames would become real paths. */

export interface StoredImage {
  file: string;
  alt: string;
}

export interface StoredProject {
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  body: string[];
  specs: { label: string; value: string }[];
  credits?: { label: string; value: string }[];
  cover: string;
  span?: 'wide' | 'tall';
  images: StoredImage[];
}

export interface StoredContent {
  projects: StoredProject[];
  heroSlides: StoredImage[];
}

export const CONTENT_PATH = 'content/projects.json';
export const IMAGE_DIR = 'public/images';

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
/** No slashes, no dots outside the extension — these become paths under public/images. */
export const IMAGE_FILE = /^[a-zA-Z0-9]+(?:[-_][a-zA-Z0-9]+)*\.webp$/;

class InvalidContent extends Error {}

const fail = (message: string): never => {
  throw new InvalidContent(message);
};

const str = (value: unknown, field: string, max = 400): string => {
  if (typeof value !== 'string') fail(`${field} חייב להיות טקסט`);
  const trimmed = (value as string).trim();
  if (!trimmed) fail(`${field} לא יכול להיות ריק`);
  if (trimmed.length > max) fail(`${field} ארוך מדי`);
  return trimmed;
};

const strList = (value: unknown, field: string, max = 4000): string[] => {
  if (!Array.isArray(value)) fail(`${field} חייב להיות רשימה`);
  return (value as unknown[])
    .map((entry) => (typeof entry === 'string' ? entry.trim() : fail(`${field} חייב להיות טקסט`)))
    .filter((entry) => entry.length > 0)
    .map((entry) => (entry.length > max ? fail(`${field} ארוך מדי`) : entry));
};

const rows = (value: unknown, field: string): { label: string; value: string }[] => {
  if (!Array.isArray(value)) fail(`${field} חייב להיות רשימה`);
  return (value as Record<string, unknown>[])
    .filter((row) => row && (String(row.label ?? '').trim() || String(row.value ?? '').trim()))
    .map((row) => ({
      label: str(row.label, `${field}: כותרת`, 60),
      value: str(row.value, `${field}: ערך`, 200),
    }));
};

const images = (value: unknown, field: string): StoredImage[] => {
  if (!Array.isArray(value)) fail(`${field} חייב להיות רשימה`);
  return (value as Record<string, unknown>[]).map((image) => {
    const file = str(image?.file, `${field}: קובץ`, 120);
    if (!IMAGE_FILE.test(file)) fail(`שם קובץ לא תקין: ${file}`);
    return { file, alt: str(image?.alt, `${field}: תיאור תמונה`, 300) };
  });
};

export function parseContent(input: unknown): StoredContent {
  const raw = input as Record<string, unknown>;
  if (!raw || typeof raw !== 'object') fail('תוכן לא תקין');
  if (!Array.isArray(raw.projects)) fail('חסרה רשימת גלריות');
  if ((raw.projects as unknown[]).length === 0) fail('חייבת להישאר לפחות גלריה אחת');

  const projects = (raw.projects as Record<string, unknown>[]).map((entry) => {
    const slug = str(entry.slug, 'מזהה הגלריה', 60);
    if (!SLUG.test(slug)) fail(`מזהה לא תקין: ${slug}. מותר אותיות אנגליות קטנות, ספרות ומקף.`);

    const title = str(entry.title, 'שם הגלריה', 80);
    const frames = images(entry.images, `גלריה ${title}`);
    if (frames.length === 0) fail(`בגלריה "${title}" חייבת להיות לפחות תמונה אחת`);

    const cover = str(entry.cover, `גלריה ${title}: תמונת שער`, 120);
    if (!frames.some((image) => image.file === cover)) {
      fail(`תמונת השער של "${title}" אינה אחת מתמונות הגלריה`);
    }

    const credits = entry.credits === undefined ? [] : rows(entry.credits, `גלריה ${title}: קרדיטים`);
    const span = entry.span === 'wide' || entry.span === 'tall' ? entry.span : undefined;

    return {
      slug,
      title,
      subtitle: str(entry.subtitle, `גלריה ${title}: כותרת משנה`, 160),
      excerpt: str(entry.excerpt, `גלריה ${title}: תיאור קצר`, 400),
      body: strList(entry.body, `גלריה ${title}: תיאור מלא`),
      specs: rows(entry.specs, `גלריה ${title}: מפרט`),
      ...(credits.length ? { credits } : {}),
      cover,
      ...(span ? { span } : {}),
      images: frames,
    } satisfies StoredProject;
  });

  const seen = new Set<string>();
  for (const project of projects) {
    if (seen.has(project.slug)) fail(`המזהה "${project.slug}" מופיע פעמיים`);
    seen.add(project.slug);
  }

  const heroSlides = images(raw.heroSlides, 'תמונות ראש הדף');
  if (heroSlides.length === 0) fail('חייבת להיות לפחות תמונה אחת בראש הדף');

  const known = new Set(projects.flatMap((project) => project.images.map((image) => image.file)));
  for (const slide of heroSlides) {
    // Hero frames may be dedicated files that live outside any gallery, so only reject
    // a slide that points at a gallery image which no longer exists.
    if (!known.has(slide.file) && !slide.file.startsWith('hero-')) {
      fail(`התמונה ${slide.file} בראש הדף אינה קיימת באף גלריה`);
    }
  }

  return { projects, heroSlides };
}

export const serializeContent = (content: StoredContent) =>
  `${JSON.stringify(content, null, 2)}\n`;

export const isInvalidContent = (error: unknown) => error instanceof InvalidContent;
