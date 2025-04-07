
import React, { useState, useEffect } from 'react';
import { 
  Eye, 
  Moon, 
  Sun, 
  Type, 
  ZoomIn, 
  ZoomOut, 
  X,
  FileText,
  Accessibility as AccessibilityIcon
} from 'lucide-react';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from './ui/dialog';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const AccessibilityWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [fontSize, setFontSize] = useState(100);
  const [highContrast, setHighContrast] = useState(false);
  const [disableAnimations, setDisableAnimations] = useState(false);

  // Apply font size change
  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}%`;
  }, [fontSize]);

  // Apply high contrast
  useEffect(() => {
    if (highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  }, [highContrast]);

  // Apply animation disable
  useEffect(() => {
    if (disableAnimations) {
      document.documentElement.classList.add('reduce-motion');
    } else {
      document.documentElement.classList.remove('reduce-motion');
    }
  }, [disableAnimations]);

  // Reset all settings
  const resetSettings = () => {
    setFontSize(100);
    setHighContrast(false);
    setDisableAnimations(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 shadow-lg transition-transform duration-300 hover:scale-110"
        aria-label="הגדרות נגישות"
      >
        <AccessibilityIcon className="h-6 w-6" />
      </button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md max-h-[80vh] overflow-auto" dir="rtl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">הגדרות נגישות</DialogTitle>
            <DialogDescription>
              התאמת האתר לצרכי הנגישות שלך
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="display">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="display">תצוגה</TabsTrigger>
              <TabsTrigger value="reading">קריאה</TabsTrigger>
              <TabsTrigger value="legal">משפטי</TabsTrigger>
            </TabsList>
            
            <TabsContent value="display" className="mt-4">
              <div className="space-y-4">
                <div className="bg-gray-100 p-3 rounded-lg">
                  <h3 className="font-medium mb-2">ניגודיות</h3>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => setHighContrast(false)}
                      variant={highContrast ? "outline" : "default"}
                      className="flex-1"
                    >
                      <Sun className="ml-2 h-4 w-4" />
                      רגיל
                    </Button>
                    <Button 
                      onClick={() => setHighContrast(true)}
                      variant={highContrast ? "default" : "outline"}
                      className="flex-1"
                    >
                      <Moon className="ml-2 h-4 w-4" />
                      ניגודיות גבוהה
                    </Button>
                  </div>
                </div>
                
                <div className="bg-gray-100 p-3 rounded-lg">
                  <h3 className="font-medium mb-2">אנימציות</h3>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => setDisableAnimations(false)}
                      variant={disableAnimations ? "outline" : "default"}
                      className="flex-1"
                    >
                      אנימציות פעילות
                    </Button>
                    <Button 
                      onClick={() => setDisableAnimations(true)}
                      variant={disableAnimations ? "default" : "outline"}
                      className="flex-1"
                    >
                      ללא אנימציות
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="reading" className="mt-4">
              <div className="bg-gray-100 p-3 rounded-lg">
                <h3 className="font-medium mb-2">גודל טקסט</h3>
                <div className="flex items-center justify-between mb-2">
                  <button
                    onClick={() => setFontSize(Math.max(fontSize - 10, 100))}
                    disabled={fontSize <= 100}
                    className="p-2 bg-white rounded-full shadow disabled:opacity-50"
                  >
                    <ZoomOut className="h-4 w-4" />
                  </button>
                  <span className="text-lg font-medium">{fontSize}%</span>
                  <button
                    onClick={() => setFontSize(Math.min(fontSize + 10, 200))}
                    disabled={fontSize >= 200}
                    className="p-2 bg-white rounded-full shadow disabled:opacity-50"
                  >
                    <ZoomIn className="h-4 w-4" />
                  </button>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full" 
                    style={{ width: `${((fontSize - 100) / 100) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="mt-4 p-4 border rounded-lg">
                <p className="font-medium">דוגמת טקסט</p>
                <p className="mt-2">כך ייראה הטקסט באתר בהתאם להגדרות שבחרתם.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="legal" className="mt-4">
              <div className="space-y-4">
                <div className="bg-gray-100 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2 flex items-center">
                    <FileText className="ml-2 h-4 w-4" />
                    הצהרת נגישות
                  </h3>
                  <p className="text-sm">
                    אנו פועלים להנגיש את האתר לכלל האוכלוסייה, כולל אנשים עם מוגבלויות. 
                    בוצעו התאמות נגישות בהתאם לתקן הישראלי (ת"י 5568) ולרמה AA של תקן WCAG 2.0.
                  </p>
                </div>
                
                <div className="bg-gray-100 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2 flex items-center">
                    <FileText className="ml-2 h-4 w-4" />
                    מדיניות פרטיות
                  </h3>
                  <p className="text-sm">
                    אנו מתחייבים לשמור על פרטיות המידע שלך. הפרטים שתמסור ישמשו אך ורק לצורכי יצירת קשר, 
                    שירות או עדכונים שיווקיים מטעמנו. אנו לא נעביר את המידע לגורם שלישי ללא הסכמתך. 
                    תוכל לבקש להסיר את פרטיך בכל עת.
                  </p>
                </div>
                
                <div className="bg-gray-100 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2 flex items-center">
                    <FileText className="ml-2 h-4 w-4" />
                    תנאי שימוש
                  </h3>
                  <p className="text-sm">
                    השימוש באתר זה מהווה הסכמה לתנאים המפורטים. אין להעתיק, לשכפל או להשתמש בתכני האתר 
                    ללא אישור מראש. איננו אחראים על נזקים ישירים או עקיפים הנובעים מהשימוש באתר.
                  </p>
                </div>
                
                <div className="bg-gray-100 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2 flex items-center">
                    <FileText className="ml-2 h-4 w-4" />
                    כתב ויתור
                  </h3>
                  <p className="text-sm">
                    התכנים באתר נועדו למידע כללי בלבד ואינם מהווים ייעוץ מקצועי. כל פעולה שתתבצע על סמך 
                    מידע זה היא באחריות המשתמש בלבד.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-between mt-4">
            <Button variant="outline" onClick={resetSettings}>
              איפוס הגדרות
            </Button>
            <DialogClose asChild>
              <Button>סגירה</Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AccessibilityWidget;
