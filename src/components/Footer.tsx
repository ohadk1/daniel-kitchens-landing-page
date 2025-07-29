import { Phone, MapPin, Mail, Clock, Instagram, Facebook, Shield, FileText, Accessibility, Cookie } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';

const Footer = () => {
  const legalSections = [
    {
      id: 'privacy',
      title: 'מדיניות פרטיות',
      icon: Shield,
      content: 'אנו מתחייבים לשמירה על פרטיות המשתמשים באתר. המידע האישי שתספק נועד לצורך שירות, קשר או שיפור חווית המשתמש. לא נשתף את המידע עם צדדים שלישיים ללא הסכמתך, אלא אם נדרש על פי חוק.'
    },
    {
      id: 'terms',
      title: 'תנאי שימוש',
      icon: FileText,
      content: 'השימוש באתר כפוף להסכמה על תנאי השימוש. אין להעתיק, להפיץ או לעשות שימוש מסחרי בתכני האתר ללא רשות. האתר עשוי להתעדכן מעת לעת ללא הודעה מוקדמת.'
    },
    {
      id: 'accessibility',
      title: 'הצהרת נגישות',
      icon: Accessibility,
      content: 'האתר נבנה תוך הקפדה על תקנות הנגישות בהתאם לתקן WCAG 2.1 רמה AA. במידה ונתקלתם בקושי – נשמח לקבל פניה במייל או בטופס יצירת הקשר באתר.'
    },
    {
      id: 'disclaimer',
      title: 'כתב ויתור',
      icon: FileText,
      content: 'כל המידע באתר מוצג לצרכים כלליים בלבד ואינו מהווה ייעוץ מקצועי. הסתמכות על התוכן היא באחריות המשתמש בלבד.'
    },
    {
      id: 'cookies',
      title: 'מדיניות Cookies',
      icon: Cookie,
      content: 'באתר נעשה שימוש בקבצי Cookies לצורכי סטטיסטיקה, אבטחה והתאמת חוויית משתמש. המשך שימוש באתר מהווה הסכמה לכך. ניתן לשנות הגדרות אלו בדפדפן.'
    }
  ];

  return (
    <footer className="text-black bg-gray-200">
      <div className="max-w-7xl mx-auto pt-12 pb-6 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <img src="/lovable-uploads/bbd4ef99-8b93-4f8f-93be-1923b1c60b50.png" alt="מטבחי דניאל - לוגו" className="h-14 w-auto" />
            </div>
            <p className="mb-4">
              מטבחי דניאל - נגריית מטבחי יוקרה המתמחה בתכנון, ייצור והתקנה של מטבחים מעוצבים באיכות הגבוהה ביותר.
            </p>
            <div className="flex space-x-4 space-x-reverse">
              <a href="https://www.facebook.com/DanielKitchensLTD" target="_blank" rel="noopener noreferrer" className="hover:text-kitchen-accent" aria-label="עמוד הפייסבוק שלנו">
                <Facebook size={20} className="w-10 h-10" />
              </a>
              <a href="https://www.instagram.com/daniel_kitchens_ltd/" target="_blank" rel="noopener noreferrer" className="hover:text-kitchen-accent" aria-label="עמוד האינסטגרם שלנו">
                <Instagram size={20} className="w-10 h-10" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">קישורים מהירים</h3>
            <ul className="space-y-3">
              <li>
                <a href="#home" className="hover:text-kitchen-accent">בית</a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-kitchen-accent">גלריה</a>
              </li>
              <li>
                <a href="#about" className="hover:text-kitchen-accent">אודות</a>
              </li>
              <li>
                <a href="#services" className="hover:text-kitchen-accent">שירותים</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">צור קשר</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <Phone size={18} className="ml-2" aria-hidden="true" />
                <span>משרד: 08-6571125</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="ml-2" aria-hidden="true" />
                <span>פקס: 08-9712757</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="ml-2" aria-hidden="true" />
                <span>אלירן: 054-239-5502</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="ml-2" aria-hidden="true" />
                <span>שמרית: 054-666-9687</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="ml-2" aria-hidden="true" />
                <span>Danielkitchensltd@gmail.com</span>
              </li>
              <li className="flex items-start">
                <MapPin size={18} className="ml-2 mt-1" aria-hidden="true" />
                <span>הפועלים 56, דימונה, ישראל</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">שעות פעילות</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Clock size={18} className="ml-2" aria-hidden="true" />
                <span>א'-ה': 09:00-18:00</span>
              </li>
              <li className="flex items-center">
                
                
              </li>
              <li className="flex items-center">
                <Clock size={18} className="ml-2" aria-hidden="true" />
                <span>ו'-שבת: סגור</span>
              </li>
            </ul>
            <a href="https://wa.me/972542395502?text=היי%20אני%20מעוניין%2Fת%20לקבל%20הצעת%20מחיר" target="_blank" rel="noopener noreferrer" className="bg-kitchen-accent hover:bg-opacity-90 text-white px-4 py-2 rounded-md text-sm font-medium inline-block mt-4" aria-label="צור קשר לקבלת הצעת מחיר בוואטסאפ">
              לקבלת הצעת מחיר
            </a>
          </div>
        </div>
        
        <div className="mt-10 border-t border-gray-300 pt-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 text-right">
            {legalSections.map((section) => (
              <Dialog key={section.id}>
                <DialogTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="w-full flex items-center justify-center gap-2 text-sm"
                  >
                    <section.icon className="h-4 w-4" />
                    {section.title}
                  </Button>
                </DialogTrigger>
                <DialogContent className="text-right" dir="rtl">
                  <DialogHeader>
                    <DialogTitle className="text-lg font-semibold flex items-center gap-2">
                      <section.icon className="h-5 w-5" />
                      {section.title}
                    </DialogTitle>
                  </DialogHeader>
                  <DialogDescription className="mt-4 text-base">
                    {section.content}
                  </DialogDescription>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
        
        <div className="border-t border-gray-300 mt-10 pt-6 text-center text-sm">
          <p>© {new Date().getFullYear()} מטבחי דניאל. כל הזכויות שמורות.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
