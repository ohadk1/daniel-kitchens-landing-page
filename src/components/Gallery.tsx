import { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { kitchenProjects } from '@/data/projectsData';

const Gallery = () => {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);

  const openProject = (projectIndex: number) => {
    setSelectedProjectIndex(projectIndex);
    setSelectedImageIndex(0);
    document.body.style.overflow = 'hidden';
  };

  const closeProject = () => {
    setSelectedProjectIndex(null);
    document.body.style.overflow = 'auto';
  };

  const goToNextImage = () => {
    if (selectedProjectIndex !== null) {
      const images = kitchenProjects[selectedProjectIndex].images;
      setSelectedImageIndex((selectedImageIndex + 1) % images.length);
    }
  };

  const goToPrevImage = () => {
    if (selectedProjectIndex !== null) {
      const images = kitchenProjects[selectedProjectIndex].images;
      setSelectedImageIndex((selectedImageIndex - 1 + images.length) % images.length);
    }
  };

  return (
    <section id="gallery" className="py-20 bg-gray-200 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-kitchen-DEFAULT mb-12">הגלריה שלנו</h2>
        <p className="text-center text-gray-600 max-w-xl mx-auto mb-10">
          מבחר מהמטבחים שעיצבנו עבור לקוחותינו. כל מטבח מיוצר בהתאמה אישית לצרכי הלקוח ולחלל הספציפי.
        </p>

        {/* הגריד ל-8 פרויקטים */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {kitchenProjects.map((project, index) => (
            <div
              key={project.id}
              className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer transition-transform duration-300 hover:scale-105"
              onClick={() => openProject(index)}
            >
              <img
                src={`/images/${index + 1}-1.webp`} // עדכון אם הנתיב הוא local
                alt={project.images[0].alt}
                className="w-full h-72 object-cover"
              />
            </div>
          ))}
        </div>

        {/* לייטבוקס */}
        {selectedProjectIndex !== null && (
          <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
            <button onClick={closeProject} className="absolute top-4 right-4 text-white hover:text-kitchen-accent" aria-label="סגור">
              <X size={32} />
            </button>

            <button onClick={goToPrevImage} className="absolute left-4 text-white hover:text-kitchen-accent" aria-label="תמונה קודמת">
              <ChevronLeft size={40} />
            </button>

            <div className="max-w-4xl max-h-[80vh]">
              <img
                src={`/images/${selectedProjectIndex + 1}-${selectedImageIndex + 1}.webp`}
                alt={kitchenProjects[selectedProjectIndex].images[selectedImageIndex].alt}
                className="max-w-full max-h-[80vh] object-contain"
              />
            </div>

            <button onClick={goToNextImage} className="absolute right-4 text-white hover:text-kitchen-accent" aria-label="תמונה הבאה">
              <ChevronRight size={40} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
