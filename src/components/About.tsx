import { CheckCircle } from 'lucide-react';
const About = () => {
  const advantages = ["מעל 25 שנות ניסיון בתכנון וייצור מטבחים", "חומרים איכותיים העומדים בסטנדרטים הגבוהים ביותר", "צוות נגרים מקצועי ומיומן", "התאמה מושלמת לצרכי הלקוח ולחלל", "ליווי אישי משלב התכנון ועד ההתקנה", "שירות ואחריות ללא פשרות"];
  return <section id="about" className="py-20 bg-kitchen-DEFAULT text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">אודות מטבחי דניאל</h2>
            <p className="text-lg mb-6 leading-relaxed">
              מטבחי דניאל הוא עסק משפחתי עם מסורת ארוכה של נגרות איכותית המתמחה בייצור מטבחי יוקרה.
              הנגרייה שלנו הוקמה בשנת 1998 ומאז אנו מספקים מטבחים מעוצבים באיכות גבוהה ללא פשרות.
            </p>
            <p className="text-lg mb-8 leading-relaxed">
              אנו מאמינים שהמטבח הוא לב הבית, ולכן אנו משקיעים את כל המאמצים בייצור מטבחים המשלבים 
              פונקציונליות, אסתטיקה וחדשנות. כל מטבח שאנו מייצרים מותאם באופן אישי לצרכי הלקוח,
              לסגנון העיצובי שלו ולמרחב המיועד.
            </p>
            
            <h3 className="text-2xl font-semibold mb-4">למה לבחור במטבחי דניאל?</h3>
            <ul className="space-y-3">
              {advantages.map((advantage, index) => <li key={index} className="flex items-start text-slate-50">
                  <CheckCircle className="text-kitchen-accent mt-1 ml-2 flex-shrink-0" />
                  <span className="text-zinc-950">{advantage}</span>
                </li>)}
            </ul>
          </div>
          
          <div className="relative">
            <div className="aspect-[4/5] overflow-hidden rounded-lg">
              <img src="https://images.unsplash.com/photo-1556911073-38141963c9e0" alt="נגרייה מקצועית" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -left-6 w-2/3 bg-kitchen-accent p-6 rounded-lg shadow-xl">
              <p className="text-lg font-bold text-slate-50">
                "אנו גאים לייצר מטבחים שהם לא רק יפים, אלא גם עומדים במבחן הזמן"
              </p>
              <p className="mt-2 font-medium text-slate-50">- דניאל, מייסד</p>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default About;