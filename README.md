# מטבחי דניאל — אתר תדמית

דף נחיתה של נגריית מטבחי יוקרה "מטבחי דניאל" (דימונה). בנוי מחדש על בסיס האתר הקודם
[ohadk1/daniel-kitchens-landing-page](https://github.com/ohadk1/daniel-kitchens-landing-page),
עם שמירה מלאה על התוכן ועל פלטת הצבעים של המותג.

## סטאק

- **Next.js 16** (App Router) + React 19 + TypeScript
- **Tailwind CSS v4** — הטוקנים מוגדרים ב-`@theme` בתוך `src/app/globals.css`, אין `tailwind.config.ts`
- **Motion** (framer-motion v13) לאנימציות, **Lenis** לגלילה חלקה, **Embla** לקרוסלת ההמלצות
- **Radix Dialog** ללייטבוקס ולמסמכים המשפטיים

## הרצה

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
```

## מבנה

| נתיב | תפקיד |
|---|---|
| `src/data/site.ts` | פרטי העסק, טלפונים, כתובת, קישור הוואטסאפ, תפריט הניווט |
| `src/data/content.ts` | **כל** הטקסטים העבריים — שירותים, המלצות, אודות, מסמכים משפטיים |
| `src/data/projects.ts` | פרויקטי הגלריה ותמונות ה-Hero |
| `src/lib/animations.ts` | וריאנטים משותפים של Motion (RTL-aware) |
| `src/lib/useStillMotion.ts` | מאחד `prefers-reduced-motion` עם מתג "עצירת אנימציות" של ווידג'ט הנגישות |
| `scripts/optimize-images.mjs` | דחיסת תמונות חד-פעמית + יצירת `hero.webp` ל-LCP |

**כל טקסט עברי חדש נכנס ל-`src/data/content.ts`** — לא inline בקומפוננטים.

## תמונות

`npm run optimize:images` (או `node scripts/optimize-images.mjs`) מקטין כל תמונה ב-`public/images`
לצלע ארוכה של 2000px ומקודד מחדש ל-WebP, ומייצר `hero.webp` ייעודי (1920w, ~120KB) ל-LCP.
מעבר לכך `next/image` מייצר AVIF/WebP רספונסיבי אוטומטית ב-Vercel.

## הוספת פרויקט לגלריה

1. הכנס את התמונות ל-`public/images/` לפי המוסכמה `N-M.webp`.
2. הרץ את סקריפט האופטימיזציה.
3. הוסף רשומה ב-`src/data/projects.ts` דרך העוזר `build()`.

הגריד מחשב את פריסת ה-bento לבד — אין צורך לכוונן ידנית.
