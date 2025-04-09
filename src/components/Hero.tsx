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
          
          
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            
          </div>
        </div>
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