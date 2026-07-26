import React from 'react';
import { ArrowRight, Mail, MapPin, Phone } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Section from '../components/Section';
import Card from '../components/Card';
import Button from '../components/Button';
import { teamMembers } from '../content/team';

const Team: React.FC = () => {
  const { t, i18n } = useTranslation();
  const contactPath = `/${i18n.language === 'en' ? 'en' : 'sv'}/contact`;

  return (
    <div className="flex flex-col w-full">
      <SEO title={t('team.page_title')} description={t('team.page_description')} />
      <section className="relative py-24 md:py-36 px-6 border-b border-border-custom overflow-hidden text-center flex items-center justify-center min-h-[42vh] bg-slate-950">
        <div className="absolute inset-0 pointer-events-none">
          <img src="/images/about_office.jpg" alt="" className="w-full h-full object-cover opacity-25 brightness-75" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/80" />
        </div>
        <div className="max-w-3xl mx-auto flex flex-col items-center gap-6 relative z-10 text-white">
          <span className="section-eyebrow !mb-0 px-3 py-1 rounded-full bg-brand-secondary/10 border border-brand-secondary/15">{t('team.badge')}</span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight uppercase">{t('team.title')}</h1>
          <p className="text-base md:text-lg text-zinc-300 leading-relaxed max-w-2xl font-medium">{t('team.subtitle')}</p>
        </div>
      </section>

      <Section background="default" title={t('team.contact_title')} subtitle={t('team.contact_subtitle')}>
        <div className="grid w-[67.8125%] grid-cols-1 lg:grid-cols-2 gap-6 max-w-[38rem] mx-auto text-left">
          {teamMembers.map((member) => (
            <Card key={member.email} className="min-w-0 overflow-hidden flex flex-col shadow-sm">
              <img src={member.image} alt={member.name} className="w-full aspect-[9/10] object-cover object-[center_15%]" loading="lazy" />
              <div className="p-6 flex flex-col gap-5 grow">
                <div>
                  <h2 className="text-2xl font-extrabold text-text-primary">{member.name}</h2>
                  <p className="text-sm font-semibold text-brand-secondary mt-1">{t(member.titleKey)}</p>
                  <p className="text-sm text-text-secondary leading-relaxed mt-4">{t(member.bioKey)}</p>
                </div>
                <div className="flex flex-col gap-4 text-sm text-text-secondary">
                  <a href={`tel:${member.phone.replace(/\s+/g, '')}`} className="flex items-center gap-3 hover:text-brand-secondary transition-colors group">
                    <span className="p-2 bg-bg-surface border border-border-custom rounded-full group-hover:text-brand-secondary"><Phone className="w-4 h-4" /></span>
                    <span className="font-semibold">{member.phone}</span>
                  </a>
                  <a href={`mailto:${member.email}`} className="min-w-0 flex items-center gap-3 hover:text-brand-secondary transition-colors group">
                    <span className="p-2 bg-bg-surface border border-border-custom rounded-full group-hover:text-brand-secondary"><Mail className="w-4 h-4" /></span>
                    <span className="min-w-0 font-semibold [overflow-wrap:anywhere]">{member.email}</span>
                  </a>
                  <div className="flex items-start gap-3">
                    <span className="p-2 bg-bg-surface border border-border-custom rounded-full mt-0.5"><MapPin className="w-4 h-4" /></span>
                    <address className="not-italic font-semibold leading-relaxed">{member.address}</address>
                  </div>
                </div>
                <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800">
                  <a href={member.mapUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-secondary hover:text-brand-accent transition-colors">
                    {t('contact.view_maps')} <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section background="alt" title={t('team.cta_title')} subtitle={t('team.cta_subtitle')}>
        <div className="flex justify-center">
          <Link to={contactPath}>
            <Button variant="primary" size="lg" className="rounded-full" rightIcon={<ArrowRight className="h-5 w-5" />}>
              {t('team.cta_action')}
            </Button>
          </Link>
        </div>
      </Section>
    </div>
  );
};

export default Team;
