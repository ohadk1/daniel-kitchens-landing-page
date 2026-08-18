'use client';

import Image from 'next/image';
import { Expand } from 'lucide-react';
import type { Project } from '@/data/projects';

interface Props {
  project: Project;
  index: number;
  onOpen: () => void;
}

export default function ProjectCard({ project, index, onOpen }: Props) {
  const count = project.images.length;

  return (
    <button
      type="button"
      onClick={onOpen}
      data-index={index}
      aria-label={`פתיחת גלריית ${project.title}, ${count} תמונות`}
      className="group relative block h-full w-full overflow-hidden rounded-2xl bg-kitchen-deep text-start"
    >
      <Image
        src={project.coverImage}
        alt={project.coverAlt}
        fill
        loading="lazy"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        quality={80}
        className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform group-hover:scale-105 group-focus-visible:scale-105"
      />

      {/* Scrim strength is constant at every breakpoint so the caption clears AA on any cover. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-black/90 from-0% via-black/65 via-35% to-transparent to-75%"
      />

      <span
        aria-hidden="true"
        className="absolute top-4 end-4 grid h-9 w-9 place-items-center rounded-full bg-white/15 text-white opacity-0 backdrop-blur-sm transition-all duration-500 group-hover:opacity-100 group-focus-visible:opacity-100"
      >
        <Expand className="h-4 w-4" />
      </span>

      <div className="absolute inset-x-0 bottom-0 p-5 lg:p-6">
        <div className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] lg:translate-y-2 lg:group-hover:translate-y-0 lg:group-focus-visible:translate-y-0">
          <h3 className="font-display text-xl text-white">{project.title}</h3>
          <p className="mt-1 text-sm text-white">{project.subtitle}</p>
          <span className="mt-3 inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-xs text-white backdrop-blur-sm lg:opacity-0 lg:transition-opacity lg:duration-500 lg:group-hover:opacity-100 lg:group-focus-visible:opacity-100">
            {count} תמונות
          </span>
        </div>
      </div>
    </button>
  );
}
