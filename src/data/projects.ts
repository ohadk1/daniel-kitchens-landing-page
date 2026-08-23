import content from '../../content/projects.json';

export interface ProjectImage {
  url: string;
  alt: string;
}

export interface Project {
  /** URL segment: /kitchens/<slug> */
  slug: string;
  /** The kitchen's own name — the page's H1. */
  title: string;
  /** One line under the title, on the card and the page hero. */
  subtitle: string;
  /** Short copy for the gallery card. */
  excerpt: string;
  /** Full copy on the project page. Each entry is a paragraph. */
  body: string[];
  /** Spec rows shown on the project page. */
  specs: { label: string; value: string }[];
  /** Photography / design credit lines, when the project has them. */
  credits?: { label: string; value: string }[];
  /** The frame used for the card and the page hero. */
  coverImage: string;
  coverAlt: string;
  /** Bento layout weight — 'wide' and 'tall' tiles span two columns/rows on desktop. */
  span?: 'wide' | 'tall';
  images: ProjectImage[];
}

/** The editable shape stored in content/projects.json, which the admin panel writes.
 *  Alt text is stored per frame describing only what is pictured; the kitchen name and
 *  the business name are appended here so they never have to be typed twice. */
interface StoredProject {
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  body: string[];
  specs: { label: string; value: string }[];
  credits?: { label: string; value: string }[];
  cover: string;
  span?: string;
  images: { file: string; alt: string }[];
}

const toProject = (stored: StoredProject): Project => {
  const images = stored.images.map((image) => ({
    url: `/images/${image.file}`,
    alt: `${image.alt} — ${stored.title}, מטבחי דניאל`,
  }));
  const coverImage = `/images/${stored.cover}`;

  return {
    slug: stored.slug,
    title: stored.title,
    subtitle: stored.subtitle,
    excerpt: stored.excerpt,
    body: stored.body,
    specs: stored.specs,
    credits: stored.credits,
    coverImage,
    coverAlt: images.find((image) => image.url === coverImage)?.alt ?? images[0].alt,
    span: stored.span === 'wide' || stored.span === 'tall' ? stored.span : undefined,
    images,
  };
};

export const kitchenProjects: Project[] = (content.projects as StoredProject[]).map(toProject);

export const projectBySlug = (slug: string) =>
  kitchenProjects.find((project) => project.slug === slug);

/** Hero slideshow — the strongest wide frames, ordered. */
export const heroSlides = content.heroSlides.map((slide) => ({
  url: `/images/${slide.file}`,
  alt: slide.alt,
}));

export const totalProjectImages = kitchenProjects.reduce((n, p) => n + p.images.length, 0);
