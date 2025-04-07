
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
          <img src="/lovable-uploads/bbd4ef99-8b93-4f8f-93be-1923b1c60b50.png" alt="מטבחי דניאל" className="h-32 mx-auto mb-6" />
          <h1 className="text-5xl md:text-6xl font-bold mb-6">ייצור מטבחים בעיצוב והתאמה אישית</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            מטבחי דניאל בע"מ בדימונה, ישראל. מציעים מטבחים בהתאמה אישית לכל הצרכים שלכם. עם למעלה מ-20 שנות ניסיון ומסירות למלאכה איכותית, אתם יכולים לסמוך עלינו שנהפוך את מטבח החלומות שלכם למציאות
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="https://wa.me/972542395502?text=היי%20אני%20מעוניין%2Fת%20לקבל%20הצעת%20מחיר" target="_blank" rel="noopener noreferrer" className="bg-kitchen-accent hover:bg-opacity-90 text-white px-8 py-3 rounded-md text-lg font-medium">
              לקבלת הצעת מחיר
            </a>
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
