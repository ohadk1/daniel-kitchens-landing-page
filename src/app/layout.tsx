import type { Metadata, Viewport } from 'next';
import { Heebo, Rubik } from 'next/font/google';
import './globals.css';
import { site, contact } from '@/data/site';

const heebo = Heebo({
  subsets: ['hebrew', 'latin'],
  variable: '--font-heebo',
  display: 'swap',
});

const rubik = Rubik({
  subsets: ['hebrew', 'latin'],
  weight: ['500', '600', '700'],
  variable: '--font-rubik',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: `${site.name} - ${site.tagline}`,
  description: site.description,
  authors: [{ name: site.name }],
  keywords: [
    'מטבחים',
    'מטבחי יוקרה',
    'נגריית מטבחים',
    'מטבח בהתאמה אישית',
    'מטבחים דימונה',
    'מטבחי דניאל',
  ],
  openGraph: {
    title: `${site.name} - ${site.tagline}`,
    description: site.description,
    type: 'website',
    locale: 'he_IL',
    url: site.url,
    siteName: site.name,
    images: [{ url: '/images/hero.webp', width: 1920, height: 1044, alt: site.tagline }],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#ccc4b4',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HomeAndConstructionBusiness',
  name: site.name,
  legalName: site.legalName,
  description: site.description,
  url: site.url,
  image: `${site.url}/images/hero.webp`,
  logo: `${site.url}/logo-main.png`,
  foundingDate: String(site.foundedYear),
  email: contact.email,
  telephone: contact.office.tel,
  address: {
    '@type': 'PostalAddress',
    streetAddress: contact.street,
    addressLocality: contact.city,
    addressCountry: contact.country,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
      opens: '09:00',
      closes: '18:00',
    },
  ],
  sameAs: [contact.social.facebook, contact.social.instagram],
};

/** Runs before first paint: drops the no-JS escape hatch and replays the saved
 *  accessibility settings so a returning visitor never sees a default-styled frame.
 *  Key + value shapes must match AccessibilityWidget's STORAGE_KEY / sanitize(). */
const bootScript = `(function(){var d=document.documentElement;d.classList.remove('no-js');try{var r=localStorage.getItem('daniel-kitchens:a11y');if(!r)return;var s=JSON.parse(r)||{};var n=Number(s.fontScale);n=isFinite(n)?Math.min(160,Math.max(100,Math.round(n/10)*10)):100;if(n!==100)d.style.fontSize=n+'%';if(s.contrast===true)d.setAttribute('data-contrast','high');if(s.motionOff===true)d.setAttribute('data-motion','off');if(s.focusVisible===true)d.setAttribute('data-focus','visible');}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="he"
      dir="rtl"
      /* `no-js` keeps the reveal animations' opacity:0 markup readable without JS;
         the script below removes it before anything paints. That removal happens
         before hydration, so React must be told not to flag the class difference. */
      className={`no-js ${heebo.variable} ${rubik.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>
        <script
          type="application/ld+json"
          // Escaping `<` keeps a future data edit from closing the script tag early.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
        />
        {children}
      </body>
    </html>
  );
}
