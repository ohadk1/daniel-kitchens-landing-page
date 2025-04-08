
import React, { useState, useEffect } from 'react';
import { 
  Eye, 
  Moon, 
  Sun, 
  Type, 
  ZoomIn, 
  ZoomOut, 
  X,
  Keyboard,
  MousePointer,
  AlignCenter,
  MonitorSmartphone,
  AudioLines,
  Focus
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
import { Switch } from './ui/switch';
import { Label } from './ui/label';

const AccessibilityWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [fontSize, setFontSize] = useState(100);
  const [highContrast, setHighContrast] = useState(false);
  const [disableAnimations, setDisableAnimations] = useState(false);
  const [keyboardNavigation, setKeyboardNavigation] = useState(false);
  const [screenReader, setScreenReader] = useState(false);
  const [focusVisible, setFocusVisible] = useState(false);

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

  // Apply keyboard navigation
  useEffect(() => {
    if (keyboardNavigation) {
      document.documentElement.classList.add('keyboard-navigation');
    } else {
      document.documentElement.classList.remove('keyboard-navigation');
    }
  }, [keyboardNavigation]);

  // Apply screen reader optimization
  useEffect(() => {
    if (screenReader) {
      document.documentElement.classList.add('screen-reader-optimize');
    } else {
      document.documentElement.classList.remove('screen-reader-optimize');
    }
  }, [screenReader]);

  // Apply focus visible
  useEffect(() => {
    if (focusVisible) {
      document.documentElement.classList.add('focus-visible-enabled');
    } else {
      document.documentElement.classList.remove('focus-visible-enabled');
    }
  }, [focusVisible]);

  // Reset all settings
  const resetSettings = () => {
    setFontSize(100);
    setHighContrast(false);
    setDisableAnimations(false);
    setKeyboardNavigation(false);
    setScreenReader(false);
    setFocusVisible(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 shadow-lg transition-transform duration-300 hover:scale-110"
        aria-label="הגדרות נגישות"
      >
        <Eye className="h-6 w-6" />
      </button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-auto" dir="rtl">
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
              <TabsTrigger value="navigation">ניווט</TabsTrigger>
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
                
                <div className="bg-gray-100 p-3 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MonitorSmartphone className="h-4 w-4" />
                      <Label htmlFor="responsive-view">תמיכה במסכים שונים</Label>
                    </div>
                    <span className="text-sm text-green-600">פעיל</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">האתר מותאם אוטומטית למובייל ולמסכים בגדלים שונים</p>
                </div>
                
                <div className="bg-gray-100 p-3 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Focus className="h-4 w-4" />
                      <Label htmlFor="focus-visible">הדגשת מיקוד חזותי</Label>
                    </div>
                    <Switch 
                      id="focus-visible" 
                      checked={focusVisible}
                      onCheckedChange={setFocusVisible}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">הדגשה ברורה של האלמנט הממוקד בעת שימוש במקלדת</p>
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
                    aria-label="הקטן טקסט"
                  >
                    <ZoomOut className="h-4 w-4" />
                  </button>
                  <span className="text-lg font-medium">{fontSize}%</span>
                  <button
                    onClick={() => setFontSize(Math.min(fontSize + 10, 200))}
                    disabled={fontSize >= 200}
                    className="p-2 bg-white rounded-full shadow disabled:opacity-50"
                    aria-label="הגדל טקסט"
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
                <p className="text-xs text-gray-500 mt-2">האתר תומך בהגדלת תצוגה עד 200%</p>
              </div>
              
              <div className="bg-gray-100 p-3 rounded-lg mt-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AudioLines className="h-4 w-4" />
                    <Label htmlFor="screen-reader">אופטימיזציה לקוראי מסך</Label>
                  </div>
                  <Switch 
                    id="screen-reader" 
                    checked={screenReader}
                    onCheckedChange={setScreenReader}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">הוספת מידע לקוראי מסך לשיפור הנגישות</p>
              </div>
              
              <div className="mt-4 p-4 border rounded-lg">
                <p className="font-medium">דוגמת טקסט</p>
                <p className="mt-2">כך ייראה הטקסט באתר בהתאם להגדרות שבחרתם.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="navigation" className="mt-4">
              <div className="space-y-4">
                <div className="bg-gray-100 p-3 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Keyboard className="h-4 w-4" />
                      <Label htmlFor="keyboard-nav">ניווט באמצעות מקלדת</Label>
                    </div>
                    <Switch 
                      id="keyboard-nav" 
                      checked={keyboardNavigation}
                      onCheckedChange={setKeyboardNavigation}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">אופטימיזציה לניווט באמצעות מקלדת (Tab, Shift+Tab, Enter)</p>
                </div>
                
                <div className="bg-gray-100 p-3 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MousePointer className="h-4 w-4" />
                      <Label htmlFor="no-mouse">גלישה ללא עכבר</Label>
                    </div>
                    <span className="text-sm text-green-600">פעיל</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">האתר מאפשר גלישה מלאה ללא שימוש בעכבר</p>
                </div>
                
                <div className="bg-gray-100 p-3 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlignCenter className="h-4 w-4" />
                      <Label htmlFor="semantic-structure">מבנה סמנטי</Label>
                    </div>
                    <span className="text-sm text-green-600">פעיל</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">האתר בנוי עם מבנה סמנטי נכון וכותרות היררכיות</p>
                </div>
                
                <div className="bg-gray-100 p-3 rounded-lg">
                  <h3 className="font-medium mb-2">עזרה בניווט</h3>
                  <p className="text-sm">
                    ניתן לנווט באתר באמצעות:
                  </p>
                  <ul className="text-sm list-disc list-inside mr-4 mt-2">
                    <li>מקש Tab - מעבר לאלמנט הבא</li>
                    <li>Shift + Tab - מעבר לאלמנט הקודם</li>
                    <li>Enter / Space - הפעלת האלמנט הנוכחי</li>
                    <li>חיצי מקלדת - ניווט בתפריטים</li>
                  </ul>
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
