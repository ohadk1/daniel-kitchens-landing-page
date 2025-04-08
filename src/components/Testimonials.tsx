import { Star } from 'lucide-react';
const Testimonials = () => {
  const testimonials = [{
    name: "רונית כהן",
    role: "בעלת דירה ברמת גן",
    content: "הזמנתי מטבח בהתאמה אישית ממטבחי דניאל והתוצאה מדהימה! השירות היה מקצועי מהרגע הראשון, החל מהתכנון ועד להתקנה הסופית. הצוות היה אדיב, קשוב לצרכים שלי והציע פתרונות יצירתיים שלא חשבתי עליהם.",
    rating: 5
  }, {
    name: "משה לוי",
    role: "אדריכל",
    content: "כאדריכל, אני עובד עם מטבחי דניאל כבר למעלה מ-10 שנים. האיכות של העבודה והדייקנות שלהם מרשימה. לקוחות שלי תמיד מרוצים מהתוצאה הסופית ומהשירות המקצועי שהם מקבלים.",
    rating: 5
  }, {
    name: "שירה ודוד גולן",
    role: "זוג צעיר מתל אביב",
    content: "כזוג צעיר שרכש דירה ראשונה, היה חשוב לנו לקבל מטבח איכותי במחיר הוגן. מטבחי דניאל לא רק עמדו בציפיות, אלא אף עלו עליהן. המטבח שקיבלנו מתפקד מצוין ונראה מדהים. ממליצים בחום!",
    rating: 5
  }];
  return <section className="py-20 text-white bg-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center mb-12 font-bold text-[#c0b8a8] text-4xl">לקוחות מספרים</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => <div key={index} className="backdrop-blur-sm p-8 rounded-lg border border-white/20 transition-transform duration-300 hover:-translate-y-2 bg-gray-100">
              <div className="flex mb-3">
                {[...Array(testimonial.rating)].map((_, i) => <Star key={i} className="fill-kitchen-accent text-kitchen-accent h-5 w-5" />)}
              </div>
              <p className="italic mb-6 text-slate-800">"{testimonial.content}"</p>
              <div>
                <p className="font-bold text-lg">{testimonial.name}</p>
                <p className="text-white/70">{testimonial.role}</p>
              </div>
            </div>)}
        </div>
      </div>
    </section>;
};
export default Testimonials;