
import { useState, useEffect } from 'react';
import { Menu, X, Phone, Instagram, Facebook } from 'lucide-react';

// Create a new ContactMenu component for the dropdown
const ContactMenu = () => {
  return (
    <div className="absolute right-0 mt-2 w-64 bg-black/90 shadow-lg rounded-md overflow-hidden z-50">
      <div className="p-4">
        <h3 className="font-bold text-white border-b pb-2 mb-3 text-right">צור קשר</h3>
        <div className="space-y-3 text-white">
          <p className="flex items-center justify-between">
            <span className="font-medium">משרד:</span>
            <span>08-6571125</span>
          </p>
          <p className="flex items-center justify-between">
            <span className="font-medium">פקס:</span>
            <span>08-9712757</span>
          </p>
          <p className="flex items-center justify-between">
            <span className="font-medium">אלירן:</span>
            <span>054-239-5502</span>
          </p>
          <p className="flex items-center justify-between">
            <span className="font-medium">שמרית:</span>
            <span>054-666-9687</span>
          </p>
        </div>
      </div>
    </div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showContact, setShowContact] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close contact menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (showContact && !target.closest('.contact-menu-container')) {
        setShowContact(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showContact]);

  return (
    <nav className={`fixed w-full z-30 transition-all duration-300 ${scrolled ? 'bg-black/90 shadow-lg' : 'bg-transparent'}`} style={{ top: '0' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-4 space-x-reverse">
            <div className="flex-shrink-0 flex items-center">
              <a href="#" className="flex items-center">
                <img src="/lovable-uploads/bbd4ef99-8b93-4f8f-93be-1923b1c60b50.png" alt="מטבחי דניאל" className="h-12 w-auto ml-4" />
              </a>
              <div className="flex space-x-2 space-x-reverse">
                <a 
                  href="https://www.facebook.com/DanielKitchensLTD" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="פייסבוק"
                  className="hover:text-kitchen-accent transition-colors"
                >
                  <Facebook size={18} />
                </a>
                <a 
                  href="https://www.instagram.com/daniel_kitchens_ltd/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="אינסטגרם"
                  className="hover:text-kitchen-accent transition-colors"
                >
                  <Instagram size={18} />
                </a>
              </div>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4 space-x-reverse">
              <a href="#home" className="text-white hover:text-kitchen-accent px-3 py-2 rounded-md text-lg font-medium">בית</a>
              <a href="#gallery" className="text-white hover:text-kitchen-accent px-3 py-2 rounded-md text-lg font-medium">גלריה</a>
              <a href="#about" className="text-white hover:text-kitchen-accent px-3 py-2 rounded-md text-lg font-medium">אודות</a>
              <a href="#services" className="text-white hover:text-kitchen-accent px-3 py-2 rounded-md text-lg font-medium">שירותים</a>
              
              {/* Contact menu with dropdown */}
              <div className="relative contact-menu-container">
                <button 
                  onClick={() => setShowContact(!showContact)}
                  className="text-white hover:text-kitchen-accent px-3 py-2 rounded-md text-lg font-medium focus:outline-none"
                >
                  צור קשר
                </button>
                {showContact && <ContactMenu />}
              </div>
              
              <a 
                href="https://wa.me/972542395502?text=היי%20אני%20מעוניין%2Fת%20לקבל%20הצעת%20מחיר" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-kitchen-accent hover:bg-opacity-90 text-white px-5 py-2 rounded-md text-lg font-medium"
              >
                הצעת מחיר
              </a>
            </div>
          </div>
          <div className="md:hidden">
            <button 
              type="button" 
              onClick={() => setIsOpen(!isOpen)} 
              className="inline-flex items-center justify-center p-2 rounded-md text-white"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-black/95">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a 
              href="#home" 
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-kitchen-accent block px-3 py-2 rounded-md text-base font-medium"
            >
              בית
            </a>
            <a 
              href="#gallery" 
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-kitchen-accent block px-3 py-2 rounded-md text-base font-medium"
            >
              גלריה
            </a>
            <a 
              href="#about" 
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-kitchen-accent block px-3 py-2 rounded-md text-base font-medium"
            >
              אודות
            </a>
            <a 
              href="#services" 
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-kitchen-accent block px-3 py-2 rounded-md text-base font-medium"
            >
              שירותים
            </a>
            <div className="text-white px-3 py-2 rounded-md text-base font-medium">
              <div className="font-bold mb-2">צור קשר:</div>
              <div className="pr-4 space-y-2 text-sm">
                <p>משרד: 08-6571125</p>
                <p>פקס: 08-9712757</p>
                <p>אלירן: 054-239-5502</p>
                <p>שמרית: 054-666-9687</p>
              </div>
            </div>
            <a 
              href="https://wa.me/972542395502?text=היי%20אני%20מעוניין%2Fת%20לקבל%20הצעת%20מחיר" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-kitchen-accent hover:bg-opacity-90 text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              הצעת מחיר
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
