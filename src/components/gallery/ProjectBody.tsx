'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { MessageCircle } from 'lucide-react';
import { useStillMotion } from '@/lib/useStillMotion';
import SectionReveal from '@/components/SectionReveal';
import ProjectLightbox from './ProjectLightbox';
import { fadeIn, fadeUp, stagger, viewportOnce } from '@/lib/animations';
import type { Project } from '@/data/projects';
import { whatsappUrl } from '@/data/site';

/** Copy, specs and the frame grid. Split out of the page so the page itself stays a
 *  server component and only this part ships JS. */
export default function ProjectBody({ project }: { project: Project }) {
  const reduced = useStillMotion();
  const [open, setOpen] = useState(false);
  const [startAt, setStartAt] = useState(0);

  const openAt = (index: number) => {
    setStartAt(index);
    setOpen(true);
  };

  return (
    <>
      <section className="bg-kitchen-light py-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.4fr_1fr] lg:gap-16 lg:px-8">
          <SectionReveal>
            <h2 className="heading-rule text-2xl text-kitchen-ink sm:text-3xl">על הפרויקט</h2>
            <div className="mt-6 space-y-5">
              {project.body.map((paragraph) => (
                <p key={paragraph.slice(0, 24)} className="text-base leading-relaxed text-kitchen-muted sm:text-lg">
                  {paragraph}
                </p>
              ))}
            </div>
          </SectionReveal>

          <SectionReveal>
            <div className="rounded-2xl bg-white p-6 shadow-sm lg:p-8">
              <h2 className="font-display text-xl text-kitchen-ink">מפרט</h2>
              <dl className="mt-5 divide-y divide-kitchen-line">
                {project.specs.map((spec) => (
                  <div key={spec.label} className="flex gap-4 py-3">
                    <dt className="w-28 shrink-0 text-sm text-kitchen-muted">{spec.label}</dt>
                    <dd className="text-sm font-medium text-kitchen-ink">{spec.value}</dd>
                  </div>
                ))}
              </dl>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-kitchen px-5 py-3.5 font-medium text-kitchen-ink transition-colors hover:bg-kitchen-accent"
              >
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
                רוצים מטבח כזה? דברו איתנו
              </a>
            </div>
          </SectionReveal>
        </div>
      </section>

      <section className="bg-kitchen-section py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <h2 className="heading-rule text-2xl text-kitchen-ink sm:text-3xl">
              הגלריה — {project.images.length} תמונות
            </h2>
          </SectionReveal>

          <motion.div
            variants={stagger(0.07)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-6"
          >
            {project.images.map((image, i) => (
              <motion.button
                key={image.url}
                type="button"
                variants={reduced ? fadeIn : fadeUp}
                onClick={() => openAt(i)}
                aria-label={`הגדלת תמונה ${i + 1} מתוך ${project.images.length}`}
                /* First frame spans both columns — it is the establishing shot. */
                className={`group relative aspect-[4/3] overflow-hidden rounded-2xl bg-kitchen-deep ${
                  i === 0 ? 'sm:col-span-2 sm:aspect-[16/9]' : ''
                }`}
              >
                <Image
                  src={image.url}
                  alt={image.alt}
                  fill
                  loading={i === 0 ? 'eager' : 'lazy'}
                  sizes={i === 0 ? '(max-width: 640px) 100vw, 1200px' : '(max-width: 640px) 100vw, 50vw'}
                  quality={80}
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 group-focus-visible:scale-105"
                />
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      <ProjectLightbox
        project={project}
        open={open}
        startAt={startAt}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
