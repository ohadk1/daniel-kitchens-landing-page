
import { ArrowLeft } from 'lucide-react';

const Hero = () => {
  return <section id="home" className="relative h-screen">
      {/* Background image with overlay */}
      <div className="absolute inset-0 bg-black">
        <div className="absolute inset-0 bg-[url('https://i.postimg.cc/x8yzXKfM/DSC00477.jpg')] bg-cover bg-center bg-no-repeat opacity-80"></div>
      </div>
      
      {/* Content */}
      <div className="relative h-full flex flex-col justify-center items-center text-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center animate-fade-in mt-32">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">מטבחי דניאל</h1>
          <p className="text-xl sm:text-2xl mb-8 max-w-2xl mx-auto">
            עיצוב וייצור מטבחים בהתאמה אישית, איכות ושירות ללא פשרות
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="#gallery" 
              className="px-8 py-3 bg-white text-kitchen-DEFAULT font-bold rounded-md hover:bg-opacity-90 transition-colors"
            >
              לגלריה
            </a>
            <a 
              href="#about" 
              className="px-8 py-3 border-2 border-white text-white font-bold rounded-md hover:bg-white hover:bg-opacity-10 transition-colors"
            >
              אודות
            </a>
          </div>
        </div>
      </div>
      
      {/* Quote button at bottom */}
      <div className="absolute bottom-20 left-0 right-0 flex justify-center">
        <a 
          href="https://wa.me/972542395502?text=היי%20אני%20מעוניין%2Fת%20לקבל%20הצעת%20מחיר" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="px-8 py-3 bg-kitchen-accent text-white font-bold rounded-md hover:bg-opacity-90 transition-colors animate-bounce"
        >
          הצעת מחיר
        </a>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center">
        <a href="#gallery" className="animate-bounce">
          <svg className="w-6 h-6 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </a>
      </div>
    </section>;
};

export default Hero;
