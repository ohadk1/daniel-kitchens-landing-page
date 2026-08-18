export const site = {
  name: 'מטבחי דניאל',
  legalName: 'Daniel Kitchens LTD',
  tagline: 'מטבחי יוקרה בעבודת נגרות',
  description:
    'מטבחי דניאל - נגריית מטבחי יוקרה באיכות הגבוהה ביותר. עיצוב מותאם אישית, חומרים מעולים ומקצועיות ללא פשרות.',
  footerBlurb:
    'מטבחי דניאל - נגריית מטבחי יוקרה המתמחה בתכנון, ייצור והתקנה של מטבחים מעוצבים באיכות הגבוהה ביותר.',
  foundedYear: 1999,
  /* Live address. Swap to the custom domain once it is pointed at Vercel — this feeds
     metadataBase, the JSON-LD, the sitemap and robots.txt. */
  url: 'https://daniel-kitchens.vercel.app',
} as const;

export const contact = {
  office: { label: 'משרד', number: '08-6571125', tel: '+97286571125' },
  fax: { label: 'פקס', number: '08-9712757' },
  eliran: { label: 'אלירן', number: '054-239-5502', tel: '+972542395502' },
  shimrit: { label: 'שמרית', number: '054-666-9687', tel: '+972546669687' },
  email: 'Danielkitchensltd@gmail.com',
  address: 'הפועלים 56, דימונה, ישראל',
  street: 'הפועלים 56',
  city: 'דימונה',
  country: 'IL',
  wazeUrl: 'https://waze.com/ul?q=%D7%94%D7%A4%D7%95%D7%A2%D7%9C%D7%99%D7%9D%2056%20%D7%93%D7%99%D7%9E%D7%95%D7%A0%D7%94',
  hours: [
    { days: "א'-ה'", time: '09:00-18:00' },
    { days: "ו'-שבת", time: 'סגור' },
  ],
  social: {
    facebook: 'https://www.facebook.com/DanielKitchensLTD',
    instagram: 'https://www.instagram.com/daniel_kitchens_ltd/',
  },
} as const;

/** Every CTA on the site opens this WhatsApp thread — matches the existing site exactly. */
const WHATSAPP_NUMBER = '972542395502';
const WHATSAPP_MESSAGE = 'היי אני מעוניין/ת לקבל הצעת מחיר';

export const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE,
)}`;

export const navLinks = [
  { href: '#home', label: 'בית' },
  { href: '#gallery', label: 'גלריה' },
  { href: '#process', label: 'תהליך העבודה' },
  { href: '#about', label: 'אודות' },
  { href: '#services', label: 'שירותים' },
] as const;
