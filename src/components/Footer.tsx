import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Mail, MapPin, Phone } from 'lucide-react';
import { footerOffices } from '../content/offices';

export const Footer: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const routeLanguage: 'sv' | 'en' = location.pathname.startsWith('/en') ? 'en' : 'sv';
  const currentYear = new Date().getFullYear();

  const navigation = [
    { name: t('nav.home', { lng: routeLanguage }), path: `/${routeLanguage}` },
    { name: t('nav.services', { lng: routeLanguage }), path: `/${routeLanguage}/services` },
    { name: t('nav.about', { lng: routeLanguage }), path: `/${routeLanguage}/about` },
    { name: t('nav.careers', { lng: routeLanguage }), path: `/${routeLanguage}/careers` },
    { name: t('nav.team', { lng: routeLanguage }), path: `/${routeLanguage}/team` },
    { name: t('nav.contact', { lng: routeLanguage }), path: `/${routeLanguage}/contact` }
  ];

  const isCurrentPage = (path: string) => {
    const normalizedPath = location.pathname.replace(/\/+$/, '');
    const normalizedTarget = path.replace(/\/+$/, '');
    return normalizedPath === normalizedTarget || (
      normalizedTarget !== `/${routeLanguage}` &&
      normalizedPath.startsWith(`${normalizedTarget}/`)
    );
  };

  return (
    <footer id="site-footer" className="relative bg-gradient-to-b from-[#001724] to-[#000a10] text-zinc-100 border-t border-white/5 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 grid grid-cols-1 md:grid-cols-[1.25fr_0.85fr_0.7fr_1.55fr] gap-y-12 md:gap-x-8 lg:gap-x-10">
        
        {/* Brand Column */}
        <div className="flex flex-col items-start justify-center gap-6 md:col-span-1">
          <Link to={`/${routeLanguage}`} className="block w-full max-w-[20.96rem] select-none md:max-w-none md:-translate-x-8">
            <img
              src="/images/REQCON.svg"
              alt="REQCON – Från vision till produkt"
              className="h-auto w-full object-contain"
            />
          </Link>
        </div>

        {/* Navigation Column */}
        <div className="flex flex-col gap-5 text-left">
          <span className="font-heading text-lg font-semibold text-white">
            {t('footer.navigation', { lng: routeLanguage })}
          </span>
          <ul className="flex flex-col border-t border-white/10">
            {navigation.map((item) => {
              const isActive = isCurrentPage(item.path);
              return (
              <li key={item.path} className="border-b border-white/10">
                <Link
                  to={item.path}
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative flex items-center justify-between gap-3 py-3 text-sm transition-colors ${
                    isActive
                      ? 'font-semibold text-white after:absolute after:-bottom-px after:left-0 after:h-0.5 after:w-12 after:bg-brand-secondary'
                      : 'text-zinc-400 hover:text-brand-secondary'
                  }`}
                >
                  {item.name}
                  {isActive && <ArrowRight className="h-4 w-4 text-brand-secondary" aria-hidden="true" />}
                </Link>
              </li>
              );
            })}
          </ul>
        </div>

        {/* Follow Us Column */}
        <div className="flex flex-col gap-5 text-left">
          <span className="font-heading text-lg font-semibold text-white">
            {t('footer.follow_us', { lng: routeLanguage })}
          </span>
          <div className="flex flex-col gap-4">
            <a
              href="https://www.linkedin.com/company/reqcon/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-sm text-zinc-400 hover:text-brand-secondary transition-colors"
            >
              <span className="p-2 rounded-full border border-white/10 text-zinc-300">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                </svg>
              </span>
              <span>LinkedIn</span>
            </a>
          </div>
        </div>

        {/* Offices Information Column */}
        <div className="flex flex-col gap-5 text-left">
          <span className="font-heading font-semibold text-sm uppercase tracking-wider text-zinc-200">
            {t('footer.offices', { lng: routeLanguage })}
          </span>
          <ul className="flex flex-col gap-5 text-sm text-zinc-400">
            {footerOffices.map((office, index) => (
              <li
                key={office.id}
                className={`grid min-w-0 grid-cols-1 items-start gap-y-3 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-x-6 ${
                  index > 0 ? 'border-t border-white/10 pt-5' : ''
                }`}
              >
                <div className="flex min-w-0 self-start items-start gap-2.5">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-secondary" aria-hidden="true" />
                  <address className="min-w-0 not-italic">
                    <span className="block font-semibold leading-5 text-white">{office.name}</span>
                    {office.addressLines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                </div>

                <div className="flex min-w-0 self-start flex-col gap-1.5 pl-[1.625rem] lg:pl-0">
                  <span className="font-heading text-sm font-semibold leading-5 text-white">
                    {t('footer.contact', { lng: routeLanguage })}
                  </span>
                  <a
                    href={`mailto:${office.email}`}
                    aria-label={`${t('footer.email', { lng: routeLanguage })}: ${office.email}`}
                    className="inline-flex min-w-0 items-start gap-2 transition-colors hover:text-brand-secondary"
                  >
                    <Mail className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-secondary" aria-hidden="true" />
                    <span className="min-w-0 break-words [overflow-wrap:anywhere]">
                      {office.email}
                    </span>
                  </a>
                  <a
                    href={office.phoneHref}
                    aria-label={`${t('footer.phone', { lng: routeLanguage })}: ${office.phone}`}
                    className="inline-flex min-w-0 items-center gap-2 transition-colors hover:text-brand-secondary"
                  >
                    <Phone className="h-3.5 w-3.5 shrink-0 text-brand-secondary" aria-hidden="true" />
                    <span>{office.phone}</span>
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Bottom Bar */}
      <div id="footer-bottom-bar" className="border-t border-white/5 bg-black/20">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div className="text-center md:text-left">
            &copy; {currentYear} REQCON AB. Org.nr: 559269-9374. {t('footer.rights', { lng: routeLanguage })}
          </div>
          <div className="flex gap-6">
            <Link to={`/${routeLanguage}/personalpolicy`} className="hover:text-white transition-colors">{t('footer.policy_staff', { lng: routeLanguage })}</Link>
            <Link id="privacy-policy-link" to={`/${routeLanguage}/privacy`} className="hover:text-white transition-colors">{t('footer.policy_privacy', { lng: routeLanguage })}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
