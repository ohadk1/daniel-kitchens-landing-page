import { Phone, MapPin, Mail, Clock, Instagram, Facebook, ChevronDown } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { useState } from 'react';
const Footer = () => {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  const toggleItem = (id: string) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  const legalSections = [{
    id: 'accessibility',
    title: 'הצהרת נגישות',
    content: 'אנו פועלים להנגיש את האתר לכלל האוכלוסייה, כולל אנשים עם מוגבלויות. בוצעו התאמות נגישות בהתאם לתקן הישראלי (ת"י 5568) ולרמה AA של תקן WCAG 2.0. אנו מחויבים להמשיך ולשפר את נגישות האתר בהתאם לצורך ולדרישות החוק.'
  }, {
    id: 'privacy',
    title: 'מדיניות פרטיות',
    content: 'אנו מתחייבים לשמור על פרטיות המידע שלך. הפרטים שתמסור ישמשו אך ורק לצורכי יצירת קשר, שירות או עדכונים שיווקיים מטעמנו. אנו לא נעביר את המידע לגורם שלישי ללא הסכמתך. תוכל לבקש להסיר את פרטיך בכל עת.'
  }, {
    id: 'terms',
    title: 'תנאי שימוש',
    content: 'השימוש באתר זה מהווה הסכמה לתנאים המפורטים. אין להעתיק, לשכפל או להשתמש בתכני האתר ללא אישור מראש. איננו אחראים על נזקים ישירים או עקיפים הנובעים מהשימוש באתר.'
  }, {
    id: 'disclaimer',
    title: 'כתב ויתור',
    content: 'התכנים באתר נועדו למידע כללי בלבד ואינם מהווים ייעוץ מקצועי. כל פעולה שתתבצע על סמך מידע זה היא באחריות המשתמש בלבד.'
  }];
  return <footer className="text-black bg-gray-200">
      <div className="max-w-7xl mx-auto pt-12 pb-6 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and About */}
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
          
          {/* Quick Links */}
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
          
          {/* Contact Info */}
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
                <span>shimrit74@walla.co.il</span>
              </li>
              <li className="flex items-start">
                <MapPin size={18} className="ml-2 mt-1" aria-hidden="true" />
                <span>הפועלים 56, דימונה, ישראל</span>
              </li>
            </ul>
          </div>
          
          {/* Opening Hours */}
          <div>
            <h3 className="text-lg font-semibold mb-4">שעות פעילות</h3>
            <ul className="space-y-3">
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
        
        {/* Legal Sections */}
        <div className="mt-10 border-t border-gray-300 pt-6">
          <h3 className="text-lg font-semibold mb-4">מידע משפטי</h3>
          <div className="space-y-3">
            {legalSections.map(section => <Collapsible key={section.id} open={openItems[section.id]} onOpenChange={() => toggleItem(section.id)} className="border border-gray-300 rounded-md">
                <CollapsibleTrigger className="w-full p-3 flex items-center justify-between text-right bg-gray-100 hover:bg-gray-200 rounded-md">
                  <span className="font-medium">{section.title}</span>
                  <ChevronDown className={`h-5 w-5 transition-transform ${openItems[section.id] ? 'transform rotate-180' : ''}`} />
                </CollapsibleTrigger>
                <CollapsibleContent className="p-4 text-sm">
                  <p>{section.content}</p>
                </CollapsibleContent>
              </Collapsible>)}
          </div>
        </div>
        
        <div className="border-t border-gray-300 mt-10 pt-6 text-center text-sm">
          <p>© {new Date().getFullYear()} מטבחי דניאל. כל הזכויות שמורות.</p>
        </div>
      </div>
    </footer>;
};
export default Footer;