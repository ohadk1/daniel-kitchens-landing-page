import { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Button } from './ui/button';
const kitchenImages = [{
  url: 'https://i.postimg.cc/rmpLKMQF/20220922-111717-Copy.jpg',
  alt: 'מטבח מודרני',
  title: 'מטבח מודרני',
  description: 'מטבח בסגנון מודרני עם חזית לבנה וידיות נסתרות'
}, {
  url: 'https://i.postimg.cc/FRnXS8Bb/20220922-111737.jpg',
  alt: 'מטבח בגוון טבעי',
  title: 'מטבח בגוון טבעי',
  description: 'עיצוב מטבח בגוונים טבעיים המשלב עץ וחומרים איכותיים'
}, {
  url: 'https://i.postimg.cc/0jMR0nTT/20220922-111747.jpg',
  alt: 'מטבח עם משטח עבודה',
  title: 'מטבח עם משטח עבודה',
  description: 'מטבח מרווח עם משטח עבודה גדול ופתרונות אחסון'
}, {
  url: 'https://i.postimg.cc/XqRMHF3p/20220922-111754.jpg',
  alt: 'מטבח בהתאמה אישית',
  title: 'מטבח בהתאמה אישית',
  description: 'עיצוב מטבח מותאם אישית עם פתרונות פרקטיים'
}, {
  url: 'https://i.postimg.cc/wxZdjKJg/20220922-111801.jpg',
  alt: 'מטבח מודרני עם אי',
  title: 'מטבח מודרני עם אי',
  description: 'מטבח מודרני המשלב אי מרכזי לאירוח ובישול'
}, {
  url: 'https://i.postimg.cc/7YzrCBM7/20220922-111808.jpg',
  alt: 'מטבח עם מקרר משולב',
  title: 'מטבח עם מקרר משולב',
  description: 'עיצוב הכולל מקרר משולב ביחידות האחסון'
},
// Initial 6 images shown, rest will be revealed with "Show More"
{
  url: 'https://i.postimg.cc/x1yr5cZ1/20221108-153941-01.jpg',
  alt: 'מטבח בגימור אלגנטי',
  title: 'מטבח בגימור אלגנטי',
  description: 'עיצוב מטבח בגימור אלגנטי המשלב חומרים איכותיים'
}, {
  url: 'https://i.postimg.cc/QMX2yjLk/20221108-154108-01.jpg',
  alt: 'מטבח בסגנון קלאסי',
  title: 'מטבח בסגנון קלאסי',
  description: 'מטבח בסגנון קלאסי עם פרטי נגרות מסורתיים'
}, {
  url: 'https://i.postimg.cc/vm3JRCbR/20221108-154119-01.jpg',
  alt: 'מטבח פינתי',
  title: 'מטבח פינתי',
  description: 'פתרון יצירתי למטבח בפינת החדר עם ניצול מקסימלי של המרחב'
}, {
  url: 'https://i.postimg.cc/gJjfG42x/20221108-154144-01.jpg',
  alt: 'מטבח בדירת קבלן',
  title: 'מטבח בדירת קבלן',
  description: 'שדרוג מטבח בדירת קבלן לעיצוב אישי וייחודי'
}, {
  url: 'https://i.postimg.cc/J0BvknJm/20221108-154202-01.jpg',
  alt: 'מטבח בצבע לבן',
  title: 'מטבח בצבע לבן',
  description: 'מטבח בצבע לבן נקי עם משטח עבודה מאבן טבעית'
}, {
  url: 'https://i.postimg.cc/Bvp0SX5V/4546-16-Copy.jpg',
  alt: 'מטבח מודרני',
  title: 'מטבח מודרני',
  description: 'עיצוב מטבח מודרני המשלב פונקציונליות ואסתטיקה'
}, {
  url: 'https://i.postimg.cc/Kc6vs30P/DSC00477.jpg',
  alt: 'מטבח עם תאורה מיוחדת',
  title: 'מטבח עם תאורה מיוחדת',
  description: 'עיצוב תאורה ייחודי המדגיש את יופי המטבח'
}, {
  url: 'https://i.postimg.cc/4NpNC40r/DSC00482.jpg',
  alt: 'מטבח עם אי מרכזי',
  title: 'מטבח עם אי מרכזי',
  description: 'מטבח עם אי מרכזי המשמש כמוקד לבישול ואירוח'
}, {
  url: 'https://i.postimg.cc/htg4KWWh/DSC00502.jpg',
  alt: 'מטבח מעוצב',
  title: 'מטבח מעוצב',
  description: 'מטבח בעיצוב ייחודי המשלב פונקציונליות ואסתטיקה'
}, {
  url: 'https://i.postimg.cc/wjVqvfg2/DSC00686.jpg',
  alt: 'מטבח בסגנון מינימליסטי',
  title: 'מטבח מינימליסטי',
  description: 'עיצוב נקי ומינימליסטי עם דגש על פרקטיות'
}, {
  url: 'https://i.postimg.cc/43xJh63g/DSC00724.jpg',
  alt: 'מטבח משפחתי',
  title: 'מטבח משפחתי',
  description: 'מטבח מרווח המתאים לצרכי משפחה גדולה'
}, {
  url: 'https://i.postimg.cc/d0NJRh7T/DSC00731.jpg',
  alt: 'מטבח בדירה קטנה',
  title: 'מטבח בדירה קטנה',
  description: 'פתרונות חכמים למטבח בדירה קטנה'
}, {
  url: 'https://i.postimg.cc/nzsp3n7S/DSC00741.jpg',
  alt: 'מטבח עם פינת אוכל',
  title: 'מטבח עם פינת אוכל',
  description: 'מטבח משולב עם פינת אוכל נוחה לשימוש יומיומי'
}, {
  url: 'https://i.postimg.cc/nz6Z5NGF/DSC00744.jpg',
  alt: 'מטבח עם נגיעות צבע',
  title: 'מטבח עם נגיעות צבע',
  description: 'מטבח בצבעים טבעיים עם נגיעות צבע מודרניות'
}, {
  url: 'https://i.postimg.cc/nrBZtT3v/DSC00749.jpg',
  alt: 'מטבח בדירת גג',
  title: 'מטבח בדירת גג',
  description: 'עיצוב מטבח המותאם במיוחד לדירת גג ייחודית'
}, {
  url: 'https://i.postimg.cc/c4G0cyJT/DSC00756.jpg',
  alt: 'מטבח בבית פרטי',
  title: 'מטבח בבית פרטי',
  description: 'מטבח רחב ידיים המתאים לצרכי בית פרטי גדול'
}, {
  url: 'https://i.postimg.cc/3Jj7SS4h/DSC00801.jpg',
  alt: 'מטבח בסגנון כפרי',
  title: 'מטבח כפרי',
  description: 'מטבח בסגנון כפרי המשלב חומרים טבעיים ונגיעות מסורתיות'
}, {
  url: 'https://i.postimg.cc/GmcRZFGy/DSC00806.jpg',
  alt: 'מטבח בגוונים בהירים',
  title: 'מטבח בגוונים בהירים',
  description: 'מטבח בגוונים בהירים היוצרים תחושת מרחב ואור'
}, {
  url: 'https://i.postimg.cc/wjWCZS9C/DSC00811.jpg',
  alt: 'מטבח עם פתרונות אחסון',
  title: 'מטבח עם פתרונות אחסון',
  description: 'מטבח המציע פתרונות אחסון חכמים ופרקטיים'
}, {
  url: 'https://i.postimg.cc/x8ShLQPz/DSC00816.jpg',
  alt: 'מטבח עם חלון גדול',
  title: 'מטבח עם חלון גדול',
  description: 'מטבח המשלב חלון גדול המכניס אור טבעי'
}, {
  url: 'https://i.postimg.cc/brHMT56F/DSC00836.jpg',
  alt: 'מטבח בעיצוב מיוחד',
  title: 'מטבח בעיצוב מיוחד',
  description: 'פתרון ייחודי למטבח בעל צרכים מיוחדים'
}, {
  url: 'https://i.postimg.cc/9QJ2VDYN/FB-IMG-1598302773880.jpg',
  alt: 'מטבח בהתאמה אישית',
  title: 'מטבח בהתאמה אישית',
  description: 'מטבח שעוצב בהתאמה אישית מלאה לצרכי הלקוח'
}, {
  url: 'https://i.postimg.cc/HLngLTSW/IMG-20220626-WA0007-01.jpg',
  alt: 'מטבח בגוון עץ',
  title: 'מטבח בגוון עץ',
  description: 'מטבח בגוון עץ טבעי המשרה אווירה חמה וביתית'
}, {
  url: 'https://i.postimg.cc/DzNKJRDr/IMG-20220626-WA0008-01.jpg',
  alt: 'מטבח מודרני קטן',
  title: 'מטבח מודרני קטן',
  description: 'פתרון מודרני למטבח קטן עם מקסימום פונקציונליות'
}, {
  url: 'https://i.postimg.cc/pTnMDqbg/IMG-20220626-WA0010-01.jpg',
  alt: 'מטבח עם ארונות גבוהים',
  title: 'מטבח עם ארונות גבוהים',
  description: 'מטבח המנצל את גובה החלל עם ארונות עד התקרה'
}, {
  url: 'https://i.postimg.cc/ZnttjpJ0/IMG-20220626-WA0011-01.jpg',
  alt: 'מטבח בסגנון תעשייתי',
  title: 'מטבח בסגנון תעשייתי',
  description: 'עיצוב מטבח ��השראה תעשייתית עם חומרים גולמיים'
}, {
  url: 'https://i.postimg.cc/rs16Hspj/IMG-20220922-WA0009.jpg',
  alt: 'מטבח בגוונים כהים',
  title: 'מטבח בגוונים כהים',
  description: 'מטבח אלגנטי בגוונים כהים המשרה יוקרה'
}, {
  url: 'https://i.postimg.cc/PfYkJ3MD/IMG-20220922-WA0012.jpg',
  alt: 'מטבח קלאסי לבן',
  title: 'מטבח קלאסי לבן',
  description: 'מטבח בסגנון קלאסי בצבע לבן נקי'
}, {
  url: 'https://i.postimg.cc/pXvMFf06/IMG-20220922-WA0015.jpg',
  alt: 'מטבח פתוח לסלון',
  title: 'מטבח פתוח לסלון',
  description: 'עיצוב מטבח פתוח המשתלב בחלל הסלון'
}, {
  url: 'https://i.postimg.cc/CL4THRXL/IMG-20220922-WA0016.jpg',
  alt: 'מטבח בגוונים טבעיים',
  title: 'מטבח בגוונים טבעיים',
  description: 'שילוב של גוונים טבעיים ליצירת מטבח חם ומזמין'
}, {
  url: 'https://i.postimg.cc/7ZYvBxr1/IMG-20220922-WA0017.jpg',
  alt: 'מטבח מעוצב בקפידה',
  title: 'מטבח מעוצב בקפידה',
  description: 'מטבח שתוכנן עד לפרט האחרון לנוחות מקסימלית'
}, {
  url: 'https://i.postimg.cc/k5B0mf4B/IMG-20220922-WA0018.jpg',
  alt: 'מטבח עם משטח שיש',
  title: 'מטבח עם משטח שיש',
  description: 'מטבח המשלב משטח שיש איכותי לעבודה נוחה'
}, {
  url: 'https://i.postimg.cc/CKXWLkBJ/IMG-20220922-WA0019.jpg',
  alt: 'מטבח מודרני מעוצב',
  title: 'מטבח מודרני מעוצב',
  description: 'עיצוב מודרני למטבח המשלב פונקציונליות ויופי'
}];
const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [visibleImages, setVisibleImages] = useState(6); // Initially show 6 images

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
  return <section id="gallery" className="py-20 bg-kitchen-light bg-[c0b8a8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-kitchen-DEFAULT mb-12">הגלריה שלנו</h2>
        <p className="text-xl text-center text-gray-700 max-w-3xl mx-auto mb-12">
          מבחר מהמטבחים שעיצבנו וייצרנו עבור לקוחותינו. כל מטבח מיוצר בהתאמה אישית לצרכי הלקוח ולחלל הספציפי.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {kitchenImages.slice(0, visibleImages).map((image, index) => <div key={index} className="group relative overflow-hidden rounded-lg shadow-lg cursor-pointer transition-transform duration-300 hover:scale-[1.02]" onClick={() => openLightbox(index)}>
              <img src={image.url} alt={image.alt} className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-110" />
            </div>)}
        </div>
        
        <div className="text-center mt-12">
          {visibleImages < kitchenImages.length && <Button onClick={handleShowMore} className="bg-kitchen-accent hover:bg-opacity-90 text-white px-8 py-3 rounded-md text-lg font-medium">
              הצג עוד
            </Button>}
        </div>
      </div>

      {selectedImage !== null && <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
          <button onClick={closeLightbox} className="absolute top-4 right-4 text-white hover:text-kitchen-accent" aria-label="סגור">
            <X size={32} />
          </button>
          
          <button onClick={goToPrev} className="absolute left-4 text-white hover:text-kitchen-accent" aria-label="תמונה קודמת">
            <ChevronLeft size={40} />
          </button>
          
          
          
          <button onClick={goToNext} className="absolute right-4 text-white hover:text-kitchen-accent" aria-label="תמונה הבאה">
            <ChevronRight size={40} />
          </button>
        </div>}
    </section>;
};
export default Gallery;