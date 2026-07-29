import React from 'react';
import { useTranslation } from 'react-i18next';
import { Award, Compass, Heart, Users } from 'lucide-react';
import Section from '../components/Section';
import Card from '../components/Card';
import Button from '../components/Button';
import Eyebrow from '../components/Eyebrow';
import SEO from '../components/SEO';
import { toAbsoluteUrl } from '../config/site';
import { teamMembers } from '../content/team';

const About: React.FC = () => {
  const { t } = useTranslation();

  const stats = [
    { value: t('about.stats.0.value'), label: t('about.stats.0.label') },
    { value: t('about.stats.1.value'), label: t('about.stats.1.label') },
    { value: t('about.stats.2.value'), label: t('about.stats.2.label') },
    { value: t('about.stats.3.value'), label: t('about.stats.3.label') }
  ];

  const values = [
    {
      icon: <Award className="w-6 h-6 text-brand-secondary" />,
      title: t('why.items.0.title'),
      description: t('why.items.0.desc')
    },
    {
      icon: <Compass className="w-6 h-6 text-brand-secondary" />,
      title: t('careers.benefits.1.title'),
      description: t('careers.benefits.1.desc')
    },
    {
      icon: <Heart className="w-6 h-6 text-brand-secondary" />,
      title: t('why.items.1.title'),
      description: t('why.items.1.desc')
    },
    {
      icon: <Users className="w-6 h-6 text-brand-secondary" />,
      title: t('careers.benefits.2.title'),
      description: t('careers.benefits.2.desc')
    }
  ];

  const timeline = [
    {
      year: t('about.milestones.items.0.year'),
      title: t('about.milestones.items.0.title'),
      description: t('about.milestones.items.0.desc')
    },
    {
      year: t('about.milestones.items.1.year'),
      title: t('about.milestones.items.1.title'),
      description: t('about.milestones.items.1.desc')
    },
    {
      year: t('about.milestones.items.2.year'),
      title: t('about.milestones.items.2.title'),
      description: t('about.milestones.items.2.desc')
    },
    {
      year: t('about.milestones.items.3.year'),
      title: t('about.milestones.items.3.title'),
      description: t('about.milestones.items.3.desc')
    }
  ];

  return (
    <div className="flex flex-col w-full">
      <SEO
        title={t('about.title') + " | Svenskt IT-konsultbolag i Stockholm & Göteborg | REQCON AB"}
        description={t('about.story_p1')}
        schema={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "name": "Om REQCON AB",
          "description": "Läs om REQCON AB - grundat 2020 i Stockholm. Vi är ett svenskt specialistbolag inom kravanalys, testledning, kvalitetssäkring och agil projektledning.",
          "url": toAbsoluteUrl('/sv/about'),
          "publisher": {
            "@type": "Organization",
            "name": "REQCON AB"
          }
        }}
      />
      {/* Page Header */}
      <section className="relative py-24 md:py-36 px-6 border-b border-border-custom overflow-hidden text-center flex items-center justify-center min-h-[50vh] bg-slate-950">
        {/* Background Image */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          <img 
            src="/images/about_office.jpg" 
            alt="REQCON Kontorsmiljö i Stockholm" 
            className="w-full h-full object-cover opacity-35 filter brightness-90 contrast-105"
          />
          {/* Dark gradient mask */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/80 dark:from-black dark:via-black/75 dark:to-black/85" />
        </div>
        
        {/* Content Container */}
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-6 relative z-10 text-white">
          <Eyebrow>
            {t('about.badge')}
          </Eyebrow>
          
          <h1 className="heading-display text-white uppercase text-center">
            {t('about.title')}
          </h1>
          
          <p className="text-base md:text-lg text-zinc-300 leading-relaxed max-w-2xl font-medium text-center">
            {t('about.subtitle')}
          </p>

          <Button
            type="button"
            variant="primary"
            size="lg"
            className="rounded-full"
            onClick={() => document.getElementById('about-story')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
          >
            {t('about.hero_cta')}
          </Button>
        </div>
      </section>

      {/* 1. OUR STORY BLOCK */}
      <Section id="about-story" background="default" animate={true} className="scroll-mt-[var(--navbar-height)] py-10 md:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 text-left flex flex-col gap-6">
            <h2 className="heading-xl text-text-primary">{t('about.story_title')}</h2>
            <p className="text-base text-text-secondary leading-relaxed">
              {t('about.story_p1')}
            </p>
            <p className="text-base text-text-secondary leading-relaxed">
              {t('about.story_p2')}
            </p>

            {/* Special Highlighted Motto Card */}
            <div className="mt-2 p-5 rounded-2xl bg-gradient-to-r from-brand-secondary/15 via-brand-secondary/5 to-transparent border-l-4 border-brand-secondary shadow-sm">
              <p className="text-base md:text-lg font-black text-text-primary tracking-tight">
                "{t('about.tagline')}"
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            {stats.map((s, idx) => (
              <Card key={idx} hoverable={false} className="p-6 text-center flex flex-col justify-center items-center gap-2">
                <span className="text-3xl md:text-4xl font-extrabold text-brand-secondary">{s.value}</span>
                <span className="text-xs font-semibold text-text-secondary">{s.label}</span>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* 2. VALUES SECTION */}
      <Section
        title={t('why.title')}
        subtitle={t('why.subtitle')}
        badge={t('why.badge')}
        background="alt"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((v, idx) => (
            <Card key={idx} className="p-6 flex flex-col gap-4 text-left shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-brand-secondary/10 flex items-center justify-center text-brand-secondary">
                {v.icon}
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-bold text-text-primary">{v.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{v.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* 3. TIMELINE SECTION */}
      <Section
        title={t('about.milestones.title')}
        subtitle={t('about.milestones.subtitle')}
        badge={t('about.milestones.badge')}
        background="default"
      >
        <div className="relative max-w-4xl mx-auto flex flex-col gap-12 mt-8">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-2 bottom-2 w-0.5 bg-border-custom -translate-x-1/2 z-0" />

          {timeline.map((item, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div key={idx} className={`relative flex flex-col md:flex-row items-stretch md:items-center justify-between w-full z-10 pl-12 md:pl-0 ${
                isEven ? '' : 'md:flex-row-reverse'
              }`}>
                {/* Content box */}
                <Card className="w-full md:w-[45%] text-left p-6 shadow-sm border border-border-custom hover:-translate-y-0.5 hover:shadow-md hover:border-accent-primary transition-[transform,box-shadow,border-color] duration-200 flex flex-col justify-center">
                  <span className="text-xs font-bold text-brand-secondary uppercase tracking-widest md:hidden">{item.year}</span>
                  <h3 className="text-lg font-bold text-text-primary mt-1">{item.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed mt-2">{item.description}</p>
                </Card>

                {/* Center dot */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-4 border-bg-page bg-brand-secondary z-20 shadow-md" />

                {/* Year Label (Desktop) */}
                <div className={`hidden md:block w-[45%] text-2xl font-black text-brand-secondary ${
                  isEven ? 'text-left pl-8' : 'text-right pr-8'
                }`}>
                  {item.year}
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* 4. TEAM SECTION */}
      <Section
        title={t('team.title')}
        subtitle={t('team.subtitle')}
        badge={t('team.badge')}
        background="alt"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
          <Card className="p-6 flex flex-col items-center text-center gap-4 shadow-sm">
            <img
              src={teamMembers[0].image}
              alt={teamMembers[0].name}
              className="w-32 h-32 rounded-full object-cover border-2 border-brand-secondary/20 shadow-md"
              loading="lazy"
            />
            <div className="flex flex-col">
              <h3 className="text-xl font-bold text-text-primary">{teamMembers[0].name}</h3>
              <span className="text-sm font-semibold text-brand-secondary">{t('team.fadi_title')}</span>
            </div>
            <p className="text-xs text-text-secondary max-w-xs leading-relaxed">
              {t(teamMembers[0].bioKey)}
            </p>
          </Card>

          <Card className="p-6 flex flex-col items-center text-center gap-4 shadow-sm">
            <img
              src={teamMembers[1].image}
              alt={teamMembers[1].name}
              className="w-32 h-32 rounded-full object-cover border-2 border-brand-secondary/20 shadow-md"
              loading="lazy"
            />
            <div className="flex flex-col">
              <h3 className="text-xl font-bold text-text-primary">{teamMembers[1].name}</h3>
              <span className="text-sm font-semibold text-brand-secondary">{t('team.anel_title')}</span>
            </div>
            <p className="text-xs text-text-secondary max-w-xs leading-relaxed">
              {t(teamMembers[1].bioKey)}
            </p>
          </Card>
        </div>
      </Section>
    </div>
  );
};

export default About;
