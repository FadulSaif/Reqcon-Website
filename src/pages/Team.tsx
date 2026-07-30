import React from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';
import Section from '../components/Section';
import Card from '../components/Card';
import SubpageHero from '../components/SubpageHero';
import { teamPageMembers } from '../content/team';

const Team: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col w-full">
      <SEO title={t('team.page_title')} description={t('team.page_description')} />
      <SubpageHero
        backgroundImage="/images/about_office.jpg"
        imageClassName="opacity-25 brightness-75"
      >
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight uppercase">{t('team.page_title')}</h1>
          <p className="text-base md:text-lg text-zinc-300 leading-relaxed max-w-2xl font-medium">{t('team.page_description')}</p>
      </SubpageHero>

      <Section id="team-profiles" background="default" title={t('team.contact_title')} subtitle={t('team.contact_subtitle')} className="scroll-mt-[var(--navbar-height)]">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto text-left">
          {teamPageMembers.map((member) => (
            <Card
              key={member.id}
              role="article"
              aria-labelledby={`team-member-${member.id}`}
              className="min-w-0 h-full overflow-hidden flex flex-col shadow-sm"
            >
              <div className="w-full aspect-[9/10] overflow-hidden">
                {member.image.kind === 'photo' ? (
                  <img
                    src={member.image.src}
                    alt={member.image.alt}
                    className="w-full h-full object-cover object-[center_15%]"
                    loading="lazy"
                  />
                ) : (
                  <div
                    role="img"
                    aria-label={t(member.image.altKey)}
                    className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-100 via-slate-50 to-slate-200 text-slate-500 dark:from-slate-900 dark:via-slate-950 dark:to-slate-800 dark:text-slate-300"
                  >
                    <span className="flex h-32 w-32 items-center justify-center rounded-full border border-brand-secondary/25 bg-bg-surface text-4xl font-black tracking-[0.08em] text-brand-secondary shadow-md">
                      {member.image.initials}
                    </span>
                  </div>
                )}
              </div>
              <div className="p-6 flex flex-col gap-5 grow">
                <div>
                  <h3 id={`team-member-${member.id}`} className="text-2xl font-extrabold text-text-primary">{member.name}</h3>
                  <p className="text-sm font-semibold text-brand-secondary mt-1">{t(member.titleKey)}</p>
                  <p className="text-sm text-text-secondary leading-relaxed mt-4">{t(member.bioKey)}</p>
                </div>
                <div className="mt-auto flex flex-col gap-5 pt-2">
                  <div className="flex flex-col gap-4 text-sm text-text-secondary">
                    <a
                      href={member.phoneHref}
                      aria-label={`${t('footer.phone')}: ${member.phone}`}
                      className="flex items-center gap-3 rounded-sm hover:text-brand-secondary transition-colors group"
                    >
                      <span aria-hidden="true" className="p-2 bg-bg-surface border border-border-custom rounded-full group-hover:text-brand-secondary"><Phone className="w-4 h-4" /></span>
                      <span className="font-semibold">{member.phone}</span>
                    </a>
                    <a
                      href={`mailto:${member.email}`}
                      aria-label={`${t('footer.email')}: ${member.email}`}
                      className="min-w-0 flex items-center gap-3 rounded-sm hover:text-brand-secondary transition-colors group"
                    >
                      <span aria-hidden="true" className="p-2 bg-bg-surface border border-border-custom rounded-full group-hover:text-brand-secondary"><Mail className="w-4 h-4" /></span>
                      <span className="min-w-0 font-semibold [overflow-wrap:anywhere]">{member.email}</span>
                    </a>
                    <div className="flex items-start gap-3">
                      <span aria-hidden="true" className="p-2 bg-bg-surface border border-border-custom rounded-full mt-0.5"><MapPin className="w-4 h-4" /></span>
                      <address className="min-w-0 not-italic font-semibold leading-relaxed break-words">{member.address}</address>
                    </div>
                  </div>
                  <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
                    <a href={member.mapUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-sm text-sm font-semibold text-brand-secondary hover:text-brand-accent transition-colors">
                      {t('contact.view_maps')} <span aria-hidden="true">→</span>
                    </a>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>
    </div>
  );
};

export default Team;
