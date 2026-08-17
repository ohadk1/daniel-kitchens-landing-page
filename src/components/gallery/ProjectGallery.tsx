'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { MessageCircle } from 'lucide-react';
import { useStillMotion } from '@/lib/useStillMotion';
import SectionReveal from '@/components/SectionReveal';
import ProjectCard from './ProjectCard';
import ProjectLightbox from './ProjectLightbox';
import { fadeIn, fadeUp, stagger, viewportOnce } from '@/lib/animations';
import { gallery } from '@/data/content';
import { kitchenProjects, type Project } from '@/data/projects';
import { whatsappUrl } from '@/data/site';

/** Column cells each tile eats on the 3-column desktop grid. */
const units = (project: Project) => (project.span ? 2 : 1);
const totalUnits = kitchenProjects.reduce((n, p) => n + units(p), 0);
/** 11 units over 3 columns leaves one hole in the last row — widen the last plain tile. */
const widenLast = totalUnits % 3 === 2;

function spanClass(project: Project, isLast: boolean) {
  if (project.span === 'wide') return 'lg:col-span-2';
  if (project.span === 'tall') return 'lg:row-span-2';
  if (isLast && widenLast) return 'lg:col-span-2';
  return '';
}

export default function ProjectGallery() {
  const reduced = useStillMotion();
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [open, setOpen] = useState(false);

  const openProject = (project: Project) => {
    setActiveProject(project);
    setOpen(true);
  };

  return (
    <section id="gallery" className="py-20 lg:py-28 bg-kitchen-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal className="text-center">
          <h2 className="heading-rule heading-rule-center text-3xl sm:text-4xl lg:text-5xl text-kitchen-ink text-balance">
            {gallery.heading}
          </h2>
          <p className="mt-6 mx-auto max-w-2xl text-base sm:text-lg text-kitchen-muted text-balance">
            {gallery.subheading}
          </p>
        </SectionReveal>

        <motion.div
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-12 lg:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:grid-flow-dense auto-rows-[240px] sm:auto-rows-[280px] lg:auto-rows-[300px] gap-4 lg:gap-6"
        >
          {kitchenProjects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={reduced ? fadeIn : fadeUp}
              className={spanClass(project, index === kitchenProjects.length - 1)}
            >
              <ProjectCard
                project={project}
                index={index}
                onOpen={() => openProject(project)}
              />
            </motion.div>
          ))}
        </motion.div>

        <SectionReveal className="mt-12 text-center">
          <p className="text-kitchen-muted">
            רוצים לראות עוד?{' '}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-medium text-kitchen-ink underline decoration-kitchen-wood decoration-2 underline-offset-4 transition-colors hover:decoration-kitchen-ink"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              דברו איתנו
            </a>
          </p>
        </SectionReveal>
      </div>

      <ProjectLightbox
        project={activeProject}
        open={open}
        onClose={() => setOpen(false)}
      />
    </section>
  );
}
