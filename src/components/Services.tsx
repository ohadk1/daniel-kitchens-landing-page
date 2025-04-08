
import { Hammer, Compass, Clock4, Wrench, ShieldCheck, Truck } from 'lucide-react';

const Services = () => {
  const services = [{
    icon: <Compass className="text-kitchen-accent h-10 w-10" aria-hidden="true" />,
    title: "תכנון והדמיה",
    description: "תכנון מקצועי והדמיות תלת-ממדיות להמחשת המטבח העתידי שלכם"
  }, {
    icon: <Wrench className="text-kitchen-accent h-10 w-10" aria-hidden="true" />,
    title: "ייצור מותאם אישית",
    description: "ייצור בהתאמה אישית לפי צרכיכם, במידות המדויקות ובסגנון המועדף עליכם"
  }, {
    icon: <Hammer className="text-kitchen-accent h-10 w-10" aria-hidden="true" />,
    title: "בחירת חומרים",
    description: "מגוון רחב של חומרים איכותיים: עץ מלא, פורמייקה, פורניר, HPL ועוד"
  }, {
    icon: <Truck className="text-kitchen-accent h-10 w-10" aria-hidden="true" />,
    title: "הובלה והתקנה",
    description: "הובלה והתקנה מקצועית על ידי צוות מיומן וותיק"
  }, {
    icon: <Clock4 className="text-kitchen-accent h-10 w-10" aria-hidden="true" />,
    title: "עמידה בלוחות זמנים",
    description: "מחויבות לעמידה בלוחות זמנים והקפדה על כל פרט ופרט"
  }, {
    icon: <ShieldCheck className="text-kitchen-accent h-10 w-10" aria-hidden="true" />,
    title: "אחריות ושירות",
    description: "אחריות מלאה על כל מטבח ושירות אדיב ומקצועי גם לאחר ההתקנה"
  }];
  return <section id="services" className="py-20 bg-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-kitchen-DEFAULT mb-12">השירותים שלנו</h2>
        <p className="text-xl text-center text-gray-700 max-w-3xl mx-auto mb-12">
          אנו מציעים מגוון שירותים מקצועיים המותאמים לצרכים הספציפיים של כל לקוח, מהתכנון הראשוני ועד להתקנה הסופית
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" role="list">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-lg shadow-lg transition-transform duration-300 hover:-translate-y-2"
              role="listitem"
              tabIndex={0}
            >
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold mb-3 text-kitchen-DEFAULT">{service.title}</h3>
              <p className="text-gray-700">{service.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 bg-kitchen-accent rounded-lg p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">מעוניינים לשמוע עוד?</h3>
          <p className="text-lg mb-6">
            צרו איתנו קשר עוד היום לתיאום פגישת ייעוץ ללא התחייבות וקבלת הצעת מחיר מותאמת אישית למטבח חלומותיכם
          </p>
          <a 
            href="https://wa.me/972542395502?text=היי%20אני%20מעוניין%2Fת%20לקבל%20הצעת%20מחיר" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="bg-#c0b8a8 text-kitchen-DEFAULT hover:bg-opacity-90 px-8 py-3 rounded-md text-white font-medium inline-block border-white border-2"
            aria-label="צור קשר בוואטסאפ לקבלת הצעת מחיר"
          >
            לקבלת הצעת מחיר
          </a>
        </div>
      </div>
    </section>;
};

export default Services;
