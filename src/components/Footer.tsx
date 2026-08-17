import Image from 'next/image';
import {
  Accessibility,
  Clock,
  Cookie,
  FileText,
  Mail,
  MapPin,
  Phone,
  Printer,
  Shield,
  type LucideIcon,
} from 'lucide-react';
import { contact, navLinks, site, whatsappUrl } from '@/data/site';
import { hero, legalSections } from '@/data/content';
import LegalDialog from './LegalDialog';
import CurrentYear from './CurrentYear';

/** Column headings + the social labels live here: they are not part of the
 *  client-approved copy in @/data, but they must never be inlined twice. */
const ui = {
  quickLinks: 'קישורים מהירים',
  contactUs: 'צור קשר',
  hours: 'שעות פעילות',
  facebook: 'עמוד הפייסבוק שלנו',
  instagram: 'עמוד האינסטגרם שלנו',
  waze: 'ניווט בוויז לכתובת',
  rights: 'כל הזכויות שמורות.',
} as const;

/** lucide v1 dropped its brand icons, so Facebook/Instagram ship as inline glyphs. */
function FacebookGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.49-3.91 3.77-3.91 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.89h2.78l-.45 2.91h-2.33V22c4.78-.76 8.44-4.92 8.44-9.94Z" />
    </svg>
  );
}

function InstagramGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.26.07 1.64.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.26.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.56-.22-.96-.48-1.38-.9a3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.26-.07-1.64-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16Zm0 3.68a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32Zm0 10.16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm7.85-10.4a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0Z" />
    </svg>
  );
}

const legalIcons: Record<string, LucideIcon> = {
  Shield,
  FileText,
  Accessibility,
  Cookie,
};

const contactRows = [
  {
    key: 'office',
    icon: Phone,
    label: `${contact.office.label}: ${contact.office.number}`,
    href: `tel:${contact.office.tel}`,
  },
  {
    key: 'fax',
    icon: Printer,
    label: `${contact.fax.label}: ${contact.fax.number}`,
    href: null,
  },
  {
    key: 'eliran',
    icon: Phone,
    label: `${contact.eliran.label}: ${contact.eliran.number}`,
    href: `tel:${contact.eliran.tel}`,
  },
  {
    key: 'shimrit',
    icon: Phone,
    label: `${contact.shimrit.label}: ${contact.shimrit.number}`,
    href: `tel:${contact.shimrit.tel}`,
  },
  {
    key: 'email',
    icon: Mail,
    label: contact.email,
    href: `mailto:${contact.email}`,
  },
] as const;

export default function Footer() {
  const buildYear = new Date().getFullYear();

  return (
    <footer className="bg-kitchen-charcoal text-white/85">
      <div className="mx-auto max-w-7xl px-4 pt-16 pb-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Image
              src="/logo-main.png"
              alt="מטבחי דניאל - לוגו"
              width={957}
              height={356}
              sizes="220px"
              /* The artwork is solid black on transparent, so it needs inverting to read
                 against the charcoal footer. */
              className="h-14 w-auto brightness-0 invert"
            />
            <p className="mt-5 text-sm leading-relaxed text-white/70">{site.footerBlurb}</p>

            <div className="mt-6 flex items-center gap-3">
              <a
                href={contact.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={ui.facebook}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/20 text-white/80 transition-colors duration-300 hover:border-kitchen hover:text-kitchen"
              >
                <FacebookGlyph />
              </a>
              <a
                href={contact.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={ui.instagram}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/20 text-white/80 transition-colors duration-300 hover:border-kitchen hover:text-kitchen"
              >
                <InstagramGlyph />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <nav aria-label={ui.quickLinks}>
            <h2 className="font-display text-lg text-white">{ui.quickLinks}</h2>
            <ul className="mt-5 space-y-3 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-white/75 underline-offset-4 transition-colors duration-300 hover:text-kitchen hover:underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact — every row is actionable */}
          <div>
            <h2 className="font-display text-lg text-white">{ui.contactUs}</h2>
            <ul className="mt-5 space-y-3 text-sm">
              {contactRows.map(({ key, icon: Icon, label, href }) => (
                <li key={key}>
                  {href ? (
                    <a
                      href={href}
                      className="flex items-center gap-3 text-white/75 transition-colors duration-300 hover:text-kitchen"
                    >
                      <Icon className="h-4 w-4 shrink-0 text-kitchen" aria-hidden="true" />
                      <span className="text-start break-all">{label}</span>
                    </a>
                  ) : (
                    <span className="flex items-center gap-3 text-white/75">
                      <Icon className="h-4 w-4 shrink-0 text-kitchen" aria-hidden="true" />
                      <span className="text-start break-all">{label}</span>
                    </span>
                  )}
                </li>
              ))}
              <li>
                <a
                  href={contact.wazeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={ui.waze}
                  className="flex items-center gap-3 text-white/75 transition-colors duration-300 hover:text-kitchen"
                >
                  <MapPin className="h-4 w-4 shrink-0 text-kitchen" aria-hidden="true" />
                  <span>{contact.address}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Hours + CTA */}
          <div>
            <h2 className="font-display text-lg text-white">{ui.hours}</h2>
            <ul className="mt-5 space-y-3 text-sm">
              {contact.hours.map((entry) => (
                <li key={entry.days} className="flex items-center gap-3 text-white/75">
                  <Clock className="h-4 w-4 shrink-0 text-kitchen" aria-hidden="true" />
                  <span>
                    {entry.days}: {entry.time}
                  </span>
                </li>
              ))}
            </ul>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-kitchen px-5 py-3 text-sm font-semibold text-kitchen-ink transition-colors duration-300 hover:bg-kitchen-deep sm:w-auto"
            >
              {hero.primaryCta}
            </a>
          </div>
        </div>

        {/* Legal documents */}
        <div className="mt-12 grid grid-cols-2 gap-3 border-t border-white/15 pt-8 sm:grid-cols-3 md:grid-cols-5">
          {legalSections.map((section) => {
            const Icon = legalIcons[section.icon] ?? FileText;
            return (
              <LegalDialog
                key={section.id}
                title={section.title}
                content={section.content}
                icon={<Icon className="h-4 w-4" aria-hidden="true" />}
              />
            );
          })}
        </div>

        <div className="mt-8 border-t border-white/15 pt-6 text-center text-sm text-white/60">
          © <CurrentYear buildYear={buildYear} /> {site.name}. {ui.rights}
        </div>
      </div>
    </footer>
  );
}
