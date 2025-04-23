import { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Button } from './ui/button';

const kitchenImages = [
  // מערך התמונות נשאר כפי שהוא
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [visibleImages, setVisibleImages] = useState(6);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  const goToNext = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % kitchenImages.length);
    }
  };

  const goToPrev = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + kitchenImages.length) % kitchenImages.length);
    }
  };

  const handleShowMore = () => {
    const newVisibleCount = Math.min(visibleImages + 6, kitchenImages.length);
    setVisibleImages(newVisibleCount);
  };

  return (
    <section id="gallery" className="py-20 bg-[c0b8a8] bg-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-kitchen-DEFAULT mb-12">הגלריה שלנו</h2>
        <p className="text-xl text-center text-gray-700 max-w-3xl mx-auto mb-12">
          מבחר מהמטבחים שעיצבנו וייצרנו עבור לקוחותינו. כל מטבח מיוצר בהתאמה אישית לצרכי הלקוח ולחלל הספציפי.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {kitchenImages.slice(0, visibleImages).map((image, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-lg shadow-lg cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
              onClick={() => openLightbox(index)}
            >
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          {visibleImages < kitchenImages.length && (
            <Button
              onClick={handleShowMore}
              className="bg-kitchen-accent hover:bg-opacity-90 text-white px-8 py-3 rounded-md text-lg font-medium"
            >
              הצג עוד
            </Button>
          )}
        </div>
      </div>

      {selectedImage !== null && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-kitchen-accent"
            aria-label="סגור"
          >
            <X size={32} />
          </button>

          <button
            onClick={goToPrev}
            className="absolute left-4 text-white hover:text-kitchen-accent"
            aria-label="תמונה קודמת"
          >
            <ChevronLeft size={40} />
          </button>

          <div className="max-w-4xl max-h-[80vh]">
            <img
              src={kitchenImages[selectedImage].url}
              alt={kitchenImages[selectedImage].alt}
              className="max-w-full max-h-[80vh] object-contain"
            />
            {/* הסרת הכותרת / טקסט מתחת לתמונה */}
          </div>

          <button
            onClick={goToNext}
            className="absolute right-4 text-white hover:text-kitchen-accent"
            aria-label="תמונה הבאה"
          >
            <ChevronRight size={40} />
          </button>
        </div>
      )}
    </section>
  );
};

export default Gallery;
