// Define the project structure
export interface Project {
  id: string;
  title?: string;
  description?: string;
  coverImage: string;
  images: {
    url: string;
    alt: string;
  }[];
}

// Projects data – with local image paths and no visible text
export const kitchenProjects: Project[] = [
  ...Array.from({ length: 8 }, (_, i) => {
    const group = i + 1;
    const images = Array.from({ length: 4 }, (_, j) => {
      const imageNumber = `${group}-${j + 1}`;
      return {
        url: `/images/${imageNumber}.webp`,
        alt: `תמונה ${imageNumber}`
      };
    });

    return {
      id: `project${group}`,
      title: "",
      description: "",
      coverImage: images[0].url,
      images
    };
  })
];
