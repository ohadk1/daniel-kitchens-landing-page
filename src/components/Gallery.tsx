
import { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const kitchenImages = [
  {
    url: 'https://images.unsplash.com/photo-1556911220-bff31c812dba',
    alt: 'מטבח מודרני עם אי מרכזי',
    title: 'מטבח מודרני',
    description: 'מטבח בסגנון מודרני עם חזית לבנה וידיות נסתרות'
  },
  {
    url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c',
    alt: 'מטבח יוקרתי עם גימור עץ',
    title: 'מטבח בסגנון כפרי',
    description: 'שילוב של עץ אלון טבעי וצבע לבן בעיצוב כפרי מודרני'
  },
  {
    url: 'https://images.unsplash.com/photo-1600585152915-d208bec867a1',
    alt: 'מטבח מינימליסטי',
    title: 'מטבח מינימליסטי',
    description: 'עיצוב נקי בקווים ישרים וצבעוניות מונוכרומטית'
  },
  {
    url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3',
    alt: 'מטבח בסגנון תעשייתי',
    title: 'מטבח תעשייתי',
    description: 'שילוב של מתכת, בטון וחומרים חשופים ליצירת מראה תעשייתי אותנטי'
  },
  {
    url: 'https://images.unsplash.com/photo-1600489000022-c2086d79f9d4',
    alt: 'מטבח בהתאמה אישית',
    title: 'מטבח בהתאמה אישית',
    description: 'פתרון מותאם לחלל מאתגר עם פינות אחסון חכמות'
  },
  {
    url: 'https://images.unsplash.com/photo-1565183928294-7063f23ce0f8',
    alt: 'מטבח בסגנון סקנדינבי',
    title: 'מטבח סקנדינבי',
    description: 'קווים נקיים, צבעים בהירים וחומרים טבעיים בהשראה נורדית'
  },
  // More images that will be shown when "הצג עוד" is clicked
  {
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
    alt: 'מטבח בסגנון רטרו',
    title: 'מטבח רטרו',
    description: 'עיצוב המשלב אלמנטים רטרו עם פונקציונליות מודרנית'
  },
  {
    url: 'https://images.unsplash.com/photo-1600047509807-f8261a3f7538',
    alt: 'מטבח עם פינת אוכל משולבת',
    title: 'מטבח עם פינת אוכל',
    description: 'פתרון מושלם למטבחים עם חלל משולב לאכילה'
  },
  {
    url: 'https://images.unsplash.com/photo-1600563438938-a9a27215d8be',
    alt: 'מטבח קלאסי',
    title: 'מטבח קלאסי',
    description: 'עיצוב אלגנטי עם פרטי נגרות מסורתיים'
  },
  {
    url: 'https://images.unsplash.com/photo-1484154218962-a197022b5858',
    alt: 'מטבח קומפקטי',
    title: 'מטבח קומפקטי',
    description: 'ניצול חכם של חלל קטן עם פונקציונליות מירבית'
  }
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(6);

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
    setVisibleCount(kitchenImages.length);
  };

  return (
    <section id="gallery" className="py-20 bg-kitchen-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-kitchen-DEFAULT mb-12">הגלריה שלנו</h2>
        <p className="text-xl text-center text-gray-700 max-w-3xl mx-auto mb-12">
          מבחר מהמטבחים שעיצבנו וייצרנו עבור לקוחותינו. כל מטבח מיוצר בהתאמה אישית לצרכי הלקוח ולחלל הספציפי.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {kitchenImages.slice(0, visibleCount).map((image, index) => (
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-white text-xl font-semibold">{image.title}</h3>
                <p className="text-white/90 mt-2">{image.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        {visibleCount < kitchenImages.length && (
          <div className="text-center mt-12">
            <Button 
              onClick={handleShowMore}
              className="bg-kitchen-accent hover:bg-opacity-90 text-white px-8 py-3 rounded-md text-lg font-medium"
            >
              הצג עוד
            </Button>
          </div>
        )}

        <div className="text-center mt-12">
          <a 
            href="https://wa.me/972000000000?text=אשמח%20לקבל%20הצעת%20מחיר%20למטבח%20חדש" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-kitchen-accent hover:bg-opacity-90 text-white px-8 py-3 rounded-md text-lg font-medium inline-block"
          >
            רוצים מטבח כזה? דברו איתנו עכשיו
          </a>
        </div>
      </div>

      {/* Lightbox */}
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
            <div className="text-white text-center mt-4">
              <h3 className="text-xl font-semibold">{kitchenImages[selectedImage].title}</h3>
              <p className="mt-2">{kitchenImages[selectedImage].description}</p>
            </div>
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
