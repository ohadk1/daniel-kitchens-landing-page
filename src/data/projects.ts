export interface ProjectImage {
  url: string;
  alt: string;
}

export interface Project {
  id: string;
  title: string;
  /** Shown on the card and in the lightbox header. */
  subtitle: string;
  coverImage: string;
  /** Alt of the cover frame specifically — the cover is not always `images[0]`. */
  coverAlt: string;
  /** Bento layout weight — 'wide' and 'tall' tiles span two columns/rows on desktop. */
  span?: 'wide' | 'tall';
  images: ProjectImage[];
}

const alt = (title: string, index: number) => `${title} - מטבחי דניאל, תמונה ${index}`;

const build = (
  id: string,
  title: string,
  subtitle: string,
  files: string[],
  cover: string,
  span?: Project['span'],
): Project => {
  const images = files.map((file, i) => ({ url: `/images/${file}`, alt: alt(title, i + 1) }));
  const coverImage = `/images/${cover}`;

  return {
    id,
    title,
    subtitle,
    coverImage,
    coverAlt: images.find((image) => image.url === coverImage)?.alt ?? alt(title, 1),
    span,
    images,
  };
};

export const kitchenProjects: Project[] = [
  build(
    'project1',
    'מטבח קלאסי מעוצב',
    'עבודת נגרות בהתאמה אישית',
    ['1-1.webp', '1-2.webp', '1-3.webp', '1-4.webp', '1-5.webp', '1-6.webp'],
    '1-4.webp',
    'wide',
  ),
  build(
    'project2',
    'מטבח מודרני',
    'קווים נקיים וגימור מושלם',
    ['2-1.webp', '2-2.webp', '2-3.webp', '2-4.webp'],
    '2-1.webp',
  ),
  build(
    'project3',
    'מטבח יוקרה',
    'חומרים איכותיים ופרזול מוביל',
    ['3-1.webp', '3-2.webp', '3-3.webp', '3-4.webp'],
    '3-1.webp',
    'tall',
  ),
  build(
    'project4',
    'מטבח משפחתי',
    'פתרונות אחסון חכמים',
    ['4-1.webp', '4-2.webp', '4-3.webp', '4-4.webp', '4-5.webp', '4-6.webp', '4-7.webp'],
    '4-1.webp',
  ),
  build(
    'project5',
    'מטבח בהיר',
    'תכנון מותאם לחלל',
    ['5-1.webp', '5-2.webp', '5-3.webp', '5-4.webp'],
    '5-1.webp',
  ),
  build(
    'project6',
    'מטבח עם אי מרכזי',
    'שילוב עבודה ואירוח',
    ['6-1.webp', '6-2.webp', '6-3.webp', '6-4.webp'],
    '6-1.webp',
    'wide',
  ),
  build(
    'project7',
    'מטבח קומפקטי',
    'ניצול מרבי של המרחב',
    ['7-1.webp', '7-2.webp', '7-3.webp'],
    '7-1.webp',
  ),
  build(
    'project8',
    'מטבח בגוונים חמים',
    'עיצוב אישי מקצה לקצה',
    ['8-1.webp', '8-2.webp', '8-3.webp', '8-4.webp'],
    '8-2.webp',
  ),
];

/** Hero slideshow — the strongest wide frames, ordered. hero.webp is the LCP asset. */
export const heroSlides = [
  { url: '/images/hero.webp', alt: 'מטבח יוקרה בעבודת נגרות של מטבחי דניאל' },
  { url: '/images/1-4.webp', alt: 'מטבח קלאסי מעוצב בהתאמה אישית' },
  { url: '/images/6-1.webp', alt: 'מטבח עם אי מרכזי' },
  { url: '/images/4-1.webp', alt: 'מטבח משפחתי עם פתרונות אחסון' },
];

export const totalProjectImages = kitchenProjects.reduce((n, p) => n + p.images.length, 0);
