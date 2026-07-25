import React from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, MapPin, Phone } from 'lucide-react';
import Section from '../components/Section';
import Card from '../components/Card';
import ContactForm from '../components/ContactForm';
import SEO from '../components/SEO';
import { toAbsoluteUrl } from '../config/site';
import { teamMembers } from '../content/team';

const Contact: React.FC = () => {
  const { t } = useTranslation();
  const contactSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'REQCON AB',
    image: toAbsoluteUrl('/images/logo.png'),
    telephone: '070-939 51 11',
    email: 'info@reqcon.se',
    address: [
      { '@type': 'PostalAddress', streetAddress: 'Tullgårdsgatan 10', addressLocality: 'Stockholm', postalCode: '116 68', addressCountry: 'SE' },
      { '@type': 'PostalAddress', streetAddress: 'Gustaf Dalénsgatan 30', addressLocality: 'Göteborg', postalCode: '417 24', addressCountry: 'SE' },
    ],
  };

  return (
    <div className="flex flex-col w-full">
      <SEO title="Kontakta oss | IT-konsulter i Stockholm & Göteborg | REQCON AB" description="Kontakta REQCON AB för rådgivning och bokning av seniora IT-konsulter inom kravanalys, testledning, UX och agil projektledning i Stockholm och Göteborg." schema={contactSchema} />
      <section className="relative py-24 md:py-36 px-6 border-b border-border-custom overflow-hidden text-center flex items-center justify-center min-h-[50vh] bg-slate-950">
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          <img src="/images/about_office.jpg" alt="REQCON Kontor i Stockholm och Göteborg" className="w-full h-full object-cover opacity-30 filter brightness-[0.8] contrast-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/80 dark:from-black dark:via-black/75 dark:to-black/85" />
        </div>
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-6 relative z-10 text-white">
          <span className="text-[10px] font-bold uppercase tracking-widest text-brand-secondary/90 px-3 py-1 rounded-full bg-brand-secondary/10 border border-brand-secondary/15 select-none w-fit">{t('contact.badge')}</span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-tight uppercase text-center">{t('contact.title')}</h1>
          <p className="text-base md:text-lg text-zinc-300 leading-relaxed max-w-2xl text-center font-medium">{t('contact.subtitle')}</p>
        </div>
      </section>

      <Section background="default" title={t('contact.locations_title')} subtitle={t('contact.locations_subtitle')} badge={t('contact.locations_badge')}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto text-left">
          {teamMembers.map((member) => (
            <Card key={member.email} hoverable className="p-8 flex flex-col justify-between shadow-sm">
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <img src={member.image} alt={member.name} className="w-16 h-16 rounded-full object-cover border border-border-custom shrink-0 shadow-sm" loading="lazy" />
                  <div className="flex flex-col gap-0.5">
                    <h2 className="text-xl font-extrabold text-text-primary">{member.name}</h2>
                    <span className="text-xs font-semibold text-brand-secondary">{t(member.titleKey)}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-4 text-sm text-text-secondary">
                  <a href={`tel:${member.phone.replace(/\s+/g, '')}`} className="flex items-center gap-3 hover:text-brand-secondary transition-colors group">
                    <span className="p-2 bg-bg-surface border border-border-custom rounded-full text-text-secondary group-hover:text-brand-secondary transition-colors"><Phone className="w-4 h-4" /></span>
                    <span className="font-semibold">{member.phone}</span>
                  </a>
                  <a href={`mailto:${member.email}`} className="flex items-center gap-3 hover:text-brand-secondary transition-colors group">
                    <span className="p-2 bg-bg-surface border border-border-custom rounded-full text-text-secondary group-hover:text-brand-secondary transition-colors"><Mail className="w-4 h-4" /></span>
                    <span className="font-semibold">{member.email}</span>
                  </a>
                  <div className="flex items-start gap-3">
                    <span className="p-2 bg-bg-surface border border-border-custom rounded-full text-text-secondary mt-0.5"><MapPin className="w-4 h-4" /></span>
                    <address className="not-italic text-left font-semibold leading-relaxed">{member.address}</address>
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                <a href={member.mapUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-secondary hover:text-brand-accent transition-colors">
                  {t('contact.view_maps')} <span aria-hidden="true">→</span>
                </a>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section background="alt" title={t('contact.form.title')} subtitle={t('contact.form.subtitle')} badge={t('contact.form.badge')}>
        <div className="max-w-xl mx-auto"><ContactForm /></div>
      </Section>
    </div>
  );
};

export default Contact;
