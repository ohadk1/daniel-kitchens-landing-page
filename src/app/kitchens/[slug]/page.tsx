import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import AccessibilityWidget from '@/components/AccessibilityWidget';
import ProjectBody from '@/components/gallery/ProjectBody';
import { kitchenProjects, projectBySlug } from '@/data/projects';
import { site } from '@/data/site';

/* Every kitchen is known at build time, so all pages are prerendered as static HTML. */
export function generateStaticParams() {
  return kitchenProjects.map((project) => ({ slug: project.slug }));
}

export const dynamicParams = false;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project) return {};

  const title = `מטבח ${project.title} | ${site.name}`;
  const description = project.excerpt;
  const url = `${site.url}/kitchens/${project.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: 'article',
      images: [{ url: project.coverImage, width: 1200, height: 630, alt: project.coverAlt }],
    },
  };
}

export default async function KitchenPage({ params }: Props) {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project) notFound();

  const index = kitchenProjects.findIndex((p) => p.slug === slug);
  const next = kitchenProjects[(index + 1) % kitchenProjects.length];

  return (
    <>
      <a href="#project" className="skip-link">
        דלג לתוכן העיקרי
      </a>
      <Navbar />

      <main id="project">
        {/* Hero — the kitchen's own cover frame, full bleed. */}
        <section className="relative h-[70vh] min-h-[420px] w-full overflow-hidden bg-kitchen-deep">
          <Image
            src={project.coverImage}
            alt={project.coverAlt}
            fill
            priority
            sizes="100vw"
            quality={85}
            className="object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/25"
          />

          <div className="absolute inset-x-0 bottom-0">
            <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8 lg:pb-16">
              <Link
                href="/#gallery"
                className="inline-flex items-center gap-2 text-sm text-white/85 transition-colors hover:text-white"
              >
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
                חזרה לגלריה
              </Link>
              <p className="mt-6 text-sm uppercase tracking-[0.2em] text-white/75">
                פרויקט מטבח
              </p>
              <h1 className="mt-2 font-display text-4xl text-white sm:text-5xl lg:text-6xl">
                {project.title}
              </h1>
              <p className="mt-3 max-w-2xl text-lg text-white/90">{project.subtitle}</p>
            </div>
          </div>
        </section>

        {/* Copy + specs, then the frames. Client component: it owns the lightbox. */}
        <ProjectBody project={project} />

        <section className="bg-kitchen-section py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <p className="text-sm uppercase tracking-[0.2em] text-kitchen-muted">
              הפרויקט הבא
            </p>
            <Link
              href={`/kitchens/${next.slug}`}
              className="mt-3 inline-block font-display text-3xl text-kitchen-ink underline decoration-kitchen-wood decoration-2 underline-offset-8 transition-colors hover:decoration-kitchen-ink sm:text-4xl"
            >
              {next.title}
            </Link>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
      <AccessibilityWidget />
    </>
  );
}
