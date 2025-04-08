import { Phone, MapPin, Mail, Clock, Instagram, Facebook } from 'lucide-react';
const Footer = () => {
  return <footer className="text-black bg-gray-200">
      <div className="max-w-7xl mx-auto pt-12 pb-6 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div>
            <div className="flex items-center mb-4">
              <img src="/lovable-uploads/bbd4ef99-8b93-4f8f-93be-1923b1c60b50.png" alt="מטבחי דניאל" className="h-12 w-auto" />
            </div>
            <p className="mb-4">
              מטבחי דניאל - נגריית מטבחי יוקרה המתמחה בתכנון, ייצור והתקנה של מטבחים מעוצבים באיכות הגבוהה ביותר.
            </p>
            <div className="flex space-x-4 space-x-reverse">
              <a href="https://www.facebook.com/DanielKitchensLTD" target="_blank" rel="noopener noreferrer" className="hover:text-kitchen-accent">
                <Facebook size={20} />
              </a>
              <a href="https://www.instagram.com/daniel_kitchens_ltd/" target="_blank" rel="noopener noreferrer" className="hover:text-kitchen-accent">
                <Instagram size={20} />
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
                <Phone size={18} className="ml-2" />
                <span>משרד: 08-6571125</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="ml-2" />
                <span>פקס: 08-9712757</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="ml-2" />
                <span>אלירן: 054-239-5502</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="ml-2" />
                <span>שמרית: 054-666-9687</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="ml-2" />
                <span>shimrit74@walla.co.il</span>
              </li>
              <li className="flex items-start">
                <MapPin size={18} className="ml-2 mt-1" />
                <span>הפועלים 56, דימונה, ישראל</span>
              </li>
            </ul>
          </div>
          
          {/* Opening Hours */}
          <div>
            <h3 className="text-lg font-semibold mb-4">שעות פעילות</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <Clock size={18} className="ml-2" />
                <span>א'-ה': 09:00-18:00</span>
              </li>
              <li className="flex items-center">
                <Clock size={18} className="ml-2" />
                <span>ו': 09:00-13:00</span>
              </li>
              <li className="flex items-center">
                <Clock size={18} className="ml-2" />
                <span>שבת: סגור</span>
              </li>
            </ul>
            <a href="https://wa.me/972542395502?text=היי%20אני%20מעוניין%2Fת%20לקבל%20הצעת%20מחיר" target="_blank" rel="noopener noreferrer" className="bg-kitchen-accent hover:bg-opacity-90 text-white px-4 py-2 rounded-md text-sm font-medium inline-block mt-4">
              לקבלת הצעת מחיר
            </a>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-10 pt-6 text-center text-sm text-white/60">
          <p>© {new Date().getFullYear()} מטבחי דניאל. כל הזכויות שמורות.</p>
        </div>
      </div>
    </footer>;
};
export default Footer;