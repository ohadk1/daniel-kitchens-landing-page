import { WhatsappIcon } from './Icons';
const CallToAction = () => {
  return <section className="relative py-20 bg-kitchen-wood text-white" style={{
    backgroundImage: "url('https://images.unsplash.com/photo-1600607687644-c7f34bc91088')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundBlendMode: "multiply",
    backgroundColor: "rgba(0,0,0,0.6)"
  }}>
      <div className="absolute inset-0 bg-[#c0b8a8]"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">מוכנים למטבח חלומותיכם?</h2>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
          צרו איתנו קשר עוד היום לקבלת הצעת מחיר ללא התחייבות ותנו לנו להפוך את חלום המטבח שלכם למציאות
        </p>
        
        <a href="https://wa.me/972542395502?text=היי%20אני%20מעוניין%2Fת%20לקבל%20הצעת%20מחיר" target="_blank" rel="noopener noreferrer" className="inline-flex items-center bg-white hover:bg-opacity-90 text-black px-8 py-4 rounded-md text-xl font-medium border-2 border-white">
          <WhatsappIcon className="ml-3" />
          לקבלת הצעת מחיר בוואטסאפ
        </a>
        
        <p className="mt-6 text-white/80">
          מענה מהיר, ייעוץ מקצועי, ללא התחייבות!
        </p>
      </div>
    </section>;
};
export default CallToAction;