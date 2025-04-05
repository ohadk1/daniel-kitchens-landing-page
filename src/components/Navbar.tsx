
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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

  return (
    <nav className={`fixed w-full z-30 transition-all duration-300 ${scrolled ? 'bg-black/90 shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <a href="#" className="flex items-center">
                <img src="/lovable-uploads/bbd4ef99-8b93-4f8f-93be-1923b1c60b50.png" alt="מטבחי דניאל" className="h-12 w-auto" />
              </a>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4 space-x-reverse">
              <a href="#home" className="text-white hover:text-kitchen-accent px-3 py-2 rounded-md text-lg font-medium">בית</a>
              <a href="#gallery" className="text-white hover:text-kitchen-accent px-3 py-2 rounded-md text-lg font-medium">גלריה</a>
              <a href="#about" className="text-white hover:text-kitchen-accent px-3 py-2 rounded-md text-lg font-medium">אודות</a>
              <a href="#services" className="text-white hover:text-kitchen-accent px-3 py-2 rounded-md text-lg font-medium">שירותים</a>
              <a 
                href="https://wa.me/972000000000?text=אשמח%20לקבל%20הצעת%20מחיר%20למטבח%20חדש" 
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
            <a 
              href="https://wa.me/972000000000?text=אשמח%20לקבל%20הצעת%20מחיר%20למטבח%20חדש" 
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
