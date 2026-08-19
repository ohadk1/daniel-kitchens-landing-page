import type { MetadataRoute } from 'next';
import { site } from '@/data/site';
import { kitchenProjects } from '@/data/projects';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: site.url,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 1,
    },
    ...kitchenProjects.map((project) => ({
      url: `${site.url}/kitchens/${project.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];
}
