import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  ArrowRight,
  ShieldCheck,
  Search,
  Layers,
  Compass,
  CheckCircle2,
  Users,
  Award,
  Zap,
  MessageSquare
} from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import Section from '../components/Section';
import { slideUp, staggerContainer } from '../utils/animations';
import SEO from '../components/SEO';

const homeSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "REQCON AB",
  "url": "https://reqcon.se/",
  "logo": "https://reqcon.se/assets/logo.png",
  "email": "info@reqcon.se",
  "founder": {
    "@type": "Person",
    "name": "Fadi Rabah"
  },
  "foundingDate": "2020",
  "address": [
    {
      "@type": "PostalAddress",
      "streetAddress": "Tullgårdsgatan 10",
      "addressLocality": "Stockholm",
      "postalCode": "116 68",
      "addressCountry": "SE"
    },
    {
      "@type": "PostalAddress",
      "streetAddress": "Gustaf Dalénsgatan 30",
      "addressLocality": "Göteborg",
      "postalCode": "417 24",
      "addressCountry": "SE"
    }
  ]
};

const Home: React.FC = () => {
  const { t, i18n } = useTranslation();

  // Dynamic services preview with icons and translated text
  const servicesPreview = [
    {
      icon: <Search className="w-6 h-6 text-brand-secondary" />,
      title: t('services.items.krav.title'),
      description: t('services.items.krav.intro'),
      key: 'krav'
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-brand-secondary" />,
      title: t('services.items.test.title'),
      description: t('services.items.test.intro'),
      key: 'test'
    },
    {
      icon: <Layers className="w-6 h-6 text-brand-secondary" />,
      title: t('services.items.pm.title'),
      description: t('services.items.pm.intro'),
      key: 'pm'
    },
    {
      icon: <Compass className="w-6 h-6 text-brand-secondary" />,
      title: t('services.items.ux.title'),
      description: t('services.items.ux.intro'),
      key: 'ux'
    }
  ];

  // Helper arrays for custom structured sections
  const pillars = [
    {
      icon: <Award className="w-5 h-5 text-current" />,
      title: t('why.items.0.title'),
      description: t('why.items.0.desc')
    },
    {
      icon: <CheckCircle2 className="w-5 h-5 text-current" />,
      title: t('why.items.1.title'),
      description: t('why.items.1.desc')
    },
    {
      icon: <Users className="w-5 h-5 text-current" />,
      title: t('why.items.2.title'),
      description: t('why.items.2.desc')
    },
    {
      icon: <Zap className="w-5 h-5 text-current" />,
      title: t('why.items.3.title'),
      description: t('why.items.3.desc')
    }
  ];

  const processSteps = [
    {
      num: t('process.steps.0.num'),
      title: t('process.steps.0.title'),
      description: t('process.steps.0.desc')
    },
    {
      num: t('process.steps.1.num'),
      title: t('process.steps.1.title'),
      description: t('process.steps.1.desc')
    },
    {
      num: t('process.steps.2.num'),
      title: t('process.steps.2.title'),
      description: t('process.steps.2.desc')
    },
    {
      num: t('process.steps.3.num'),
      title: t('process.steps.3.title'),
      description: t('process.steps.3.desc')
    }
  ];

  const testimonials = [
    {
      quote: t('testimonials.items.0.quote'),
      name: t('testimonials.items.0.name'),
      position: t('testimonials.items.0.position')
    },
    {
      quote: t('testimonials.items.1.quote'),
      name: t('testimonials.items.1.name'),
      position: t('testimonials.items.1.position')
    }
  ];

  const servicesPath = `/${i18n.language}/services`;
  const contactPath = `/${i18n.language}/contact`;
  const aboutPath = `/${i18n.language}/about`;

  const getSlugFromKey = (key: string) => {
    switch (key) {
      case 'krav': return 'requirements-analysis';
      case 'test': return 'testing-qa';
      case 'pm': return 'project-management';
      case 'ux': return 'ux-design';
      default: return '';
    }
  };

  return (
    <div className="flex flex-col w-full">
      <SEO
        title={t('hero.title') + " | REQCON AB"}
        description={t('hero.subtitle')}
        schema={homeSchema}
      />
      
      {/* 1. HERO SECTION (Redesigned Floating Card Hero) */}
      <section className="relative px-4 md:px-6 pt-24 md:pt-28 pb-6 bg-bg-page overflow-hidden">
        <div className="max-w-7xl mx-auto w-full">
          {/* Floating Card Container */}
          <div className="relative w-full rounded-3xl md:rounded-[32px] overflow-hidden min-h-[75vh] md:min-h-[80vh] flex items-center justify-center py-20 px-6 select-none bg-slate-950 border border-slate-900/10 shadow-lg z-0">
            
            {/* Background image container with subtle zoom animation */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              <motion.img
                src="/images/hero-company-image.jpg"
                alt="REQCON Teamwork & Consulting"
                className="w-full h-full object-cover"
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.55 }}
                transition={{ duration: 1.6, ease: 'easeOut' }}
              />
              {/* Dark gradient overlay for extreme readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/80" />
            </div>

            <div className="max-w-4xl mx-auto w-full z-10 relative text-center flex flex-col items-center">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerContainer(0.12)}
                className="flex flex-col items-center text-center gap-6 max-w-3xl"
              >
                <motion.h1
                  variants={slideUp()}
                  className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15] text-center"
                >
                  {t('hero.title')}
                </motion.h1>
                
                <motion.p
                  variants={slideUp()}
                  className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl text-center"
                >
                  {t('hero.subtitle')}
                </motion.p>
                
                <motion.div
                  variants={slideUp()}
                  className="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto justify-center"
                >
                  <Link to={contactPath} className="w-full sm:w-auto">
                    <Button
                      variant="primary"
                      size="lg"
                      className="w-full sm:w-auto font-bold rounded-full"
                      rightIcon={<ArrowRight className="w-5 h-5" />}
                    >
                      {t('hero.cta_primary')}
                    </Button>
                  </Link>
                  <Link to={servicesPath} className="w-full sm:w-auto">
                    <Button
                      variant="secondary"
                      size="lg"
                      className="w-full sm:w-auto font-bold rounded-full !bg-transparent border-white/30 !text-white hover:!bg-white/10 hover:!border-white/60 transition-all duration-200"
                    >
                      {t('hero.cta_secondary')}
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      {/* 2. CUSTOMER SHOWCASE SECTION (Dual-row Infinite Marquee Scroll) */}
      <Section
        background="alt"
        className="py-12 md:py-16 text-center border-b border-border-custom overflow-hidden"
      >
        {/* Custom uppercase header label and line dividers with a center dot indicator */}
        <div className="flex items-center justify-center gap-4 mb-8 px-6 max-w-5xl mx-auto select-none">
          <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-slate-200 dark:to-zinc-800" />
          <div className="w-1.5 h-1.5 rounded-full bg-brand-secondary" />
          <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-text-secondary select-none whitespace-nowrap">
            {t('clients.title')}
          </span>
          <div className="w-1.5 h-1.5 rounded-full bg-brand-secondary" />
          <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-slate-200 dark:to-zinc-800" />
        </div>

        <div className="w-full select-none">
          {/* Row 1: Left Scroll */}
          <div className="marquee-container py-2">
            <div className="animate-marquee gap-8 flex items-center pr-8">
              {(() => {
                const clients = [
                  {
                    name: 'Trafikverket',
                    svg: (
                      <svg viewBox="0 0 240 60" className="h-10 w-auto select-none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="40" height="40" x="2" y="10" rx="8" fill="#E30613" />
                        <path d="M22,16 v22 M11,27 h22" stroke="#FFF" strokeWidth="4" strokeLinecap="square" />
                        <circle cx="22" cy="27" r="8" stroke="#FFF" strokeWidth="3.5" fill="none" />
                        <circle cx="22" cy="27" r="3" fill="#E30613" />
                        <text x="52" y="36" fontFamily="'Outfit', 'Inter', sans-serif" fontWeight="900" fontSize="18" letterSpacing="1.5" className="fill-slate-800 dark:fill-white">TRAFIKVERKET</text>
                      </svg>
                    )
                  },
                  {
                    name: 'Vattenfall',
                    svg: (
                      <svg viewBox="0 0 240 60" className="h-10 w-auto select-none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="22" cy="30" r="18" fill="#005B94" />
                        <path d="M9,30 C14,17 30,17 35,30 C30,43 14,43 9,30 Z" fill="#FFD100" />
                        <circle cx="22" cy="30" r="8" fill="#005B94" />
                        <text x="52" y="36" fontFamily="'Outfit', 'Inter', sans-serif" fontWeight="900" fontSize="19" letterSpacing="1.5" className="fill-slate-800 dark:fill-white">VATTENFALL</text>
                      </svg>
                    )
                  },
                  {
                    name: 'Trafikförvaltningen',
                    svg: (
                      <svg viewBox="0 0 260 60" className="h-10 w-auto select-none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="22" cy="30" r="18" fill="#00A5E3" />
                        <text x="22" y="37" fontFamily="'Outfit', 'Inter', sans-serif" fontWeight="900" fontSize="20" fill="#FFF" textAnchor="middle">SL</text>
                        <text x="52" y="36" fontFamily="'Outfit', 'Inter', sans-serif" fontWeight="900" fontSize="15" letterSpacing="1" className="fill-slate-800 dark:fill-white">TRAFIKFÖRVALTNINGEN</text>
                      </svg>
                    )
                  },
                  {
                    name: 'Skatteverket',
                    svg: (
                      <svg viewBox="0 0 240 60" className="h-10 w-auto select-none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5,30 C5,15 20,15 25,30 C20,45 5,45 5,30 Z" fill="#005B94" />
                        <path d="M10,30 C10,18 30,18 30,30 C20,42 10,42 10,30 Z" fill="#FFD100" />
                        <text x="45" y="36" fontFamily="'Outfit', 'Inter', sans-serif" fontWeight="900" fontSize="19" className="fill-slate-800 dark:fill-white">Skatteverket</text>
                      </svg>
                    )
                  }
                ];

                const scrollClients = [...clients, ...clients, ...clients, ...clients, ...clients];

                return scrollClients.map((client, idx) => (
                  <div
                    key={idx}
                    className="bg-bg-page border border-border-custom rounded-2xl px-8 py-5 h-20 w-64 shadow-sm flex items-center justify-center shrink-0 hover:border-brand-secondary dark:hover:border-brand-secondary hover:-translate-y-1 hover:shadow-md transition-all duration-300 cursor-default"
                  >
                    {client.svg}
                  </div>
                ));
              })()}
            </div>
          </div>
        </div>
      </Section>
      {/* 3. SERVICES PREVIEW SECTION */}
      <Section
        title={t('services.title')}
        subtitle={t('services.subtitle')}
        badge={t('services.badge')}
        background="default"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center max-w-6xl mx-auto">
          {/* Left Column: Visual Showcase */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative aspect-square w-full max-w-md rounded-3xl overflow-hidden shadow-lg border border-border-custom bg-slate-950/20 group select-none">
              <img
                src="/images/about_office.jpg"
                alt="REQCON Delivering Quality"
                className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                loading="lazy"
              />
              {/* Dark overlay at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-8 text-left">
                <h4 className="text-white font-bold text-lg mb-2">
                  {i18n.language === 'sv' ? 'Leverans med precision' : 'Delivery with Precision'}
                </h4>
                <p className="text-zinc-300 text-sm leading-relaxed">
                  {i18n.language === 'sv'
                    ? 'Vi matchar er med Sveriges främsta specialister inom kravanalys, testning och agil projektledning.'
                    : 'We match you with Sweden\'s leading specialists in requirements analysis, testing, and agile project management.'}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Services List */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-left">
            <div className="flex flex-col gap-4">
              {servicesPreview.map((service, idx) => (
                <Card 
                  key={idx} 
                  hoverable={true} 
                  className="p-5 flex gap-4 shadow-sm items-start hover:border-brand-secondary/40 hover:shadow-md transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-brand-secondary/10 flex items-center justify-center shrink-0 mt-0.5 transition-all duration-300 text-brand-secondary">
                    {service.icon}
                  </div>
                  <div className="flex flex-col gap-1.5 flex-1">
                    <Link 
                      to={`${servicesPath}/${getSlugFromKey(service.key)}`} 
                      onClick={() => window.scrollTo(0,0)}
                      className="text-lg font-bold text-text-primary hover:text-brand-secondary transition-colors cursor-pointer w-fit"
                    >
                      {service.title}
                    </Link>
                    <p className="text-sm text-text-secondary leading-relaxed">{service.description}</p>
                  </div>
                </Card>
              ))}
            </div>
            <div className="mt-2">
              <Link to={servicesPath} onClick={() => window.scrollTo(0,0)}>
                <Button variant="secondary" size="md" className="rounded-full">
                  {i18n.language === 'sv' ? 'Se alla våra tjänster' : 'More about our services'}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Section>

      {/* 4. WHY CHOOSE US SECTION */}
      <Section
        background="alt"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto items-start">
          {/* Left Column: Sticky Title & Description */}
          <div className="lg:col-span-5 text-left flex flex-col gap-6 lg:sticky lg:top-28 h-fit">
            <div className="flex flex-col gap-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-secondary/90 px-3 py-1 rounded-full bg-brand-secondary/10 border border-brand-secondary/15 select-none w-fit">
                {t('why.badge')}
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-text-primary leading-tight">
                {t('why.title')}
              </h2>
              <p className="text-base text-text-secondary leading-relaxed max-w-md">
                {t('why.subtitle')}
              </p>
            </div>
            <div className="mt-2">
              <Link to={contactPath}>
                <Button variant="primary" size="md" className="rounded-full">
                  {i18n.language === 'sv' ? 'Kontakta oss' : 'Contact us'}
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column: Scrolling feature cards */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {pillars.map((pillar, idx) => (
              <Card 
                key={idx} 
                hoverable={true} 
                className="p-6 flex gap-5 text-left shadow-sm border border-border-custom hover:border-brand-secondary/40 hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="p-3 rounded-xl bg-bg-surface border border-border-custom text-brand-secondary shrink-0 h-12 w-12 flex items-center justify-center transition-all duration-300 group-hover:bg-brand-secondary group-hover:text-white group-hover:border-brand-secondary">
                  {pillar.icon}
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-lg font-bold text-text-primary group-hover:text-brand-secondary transition-colors">{pillar.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{pillar.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* 5. PROCESS SECTION */}
      <Section
        title={t('process.title')}
        subtitle={t('process.subtitle')}
        badge={t('process.badge')}
        background="default"
      >
        <div className="relative max-w-4xl mx-auto flex flex-col gap-12 md:gap-4 mt-8">
          {/* Vertical Center Line for desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-border-custom -translate-x-1/2 z-0" />

          {processSteps.map((step, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div key={idx} className="relative flex flex-col md:flex-row items-center w-full md:py-6 z-10">
                {/* Timeline node */}
                <div className="absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full border-4 border-bg-page bg-brand-secondary text-white font-bold flex items-center justify-center shadow-lg hidden md:flex text-sm z-20 select-none">
                  {step.num}
                </div>

                {/* Content block */}
                <div className={`w-full md:w-1/2 flex flex-col gap-2 ${
                  isEven
                    ? 'md:pr-16 md:text-right md:items-end'
                    : 'md:pl-16 md:text-left md:items-start md:ml-auto'
                }`}>
                  <span className="text-sm font-bold text-brand-secondary md:hidden">{step.num}. {step.title}</span>
                  <h3 className="text-xl font-extrabold text-text-primary hidden md:block">{step.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed max-w-md">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* 6. TEAM SECTION (With Optimized Image Paths) */}
      <Section
        title={t('team.title')}
        subtitle={t('team.subtitle')}
        badge={t('team.badge')}
        background="default"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
          <Card className="p-6 flex flex-col items-center text-center gap-4 shadow-sm">
            <img
              src="/images/team/fadi_rabah.jpg"
              alt="Fadi Rabah"
              className="w-32 h-32 rounded-full object-cover border-2 border-brand-secondary/20 shadow-md"
              loading="lazy"
            />
            <div className="flex flex-col">
              <h3 className="text-xl font-bold text-text-primary">Fadi Rabah</h3>
              <span className="text-sm font-semibold text-brand-secondary">Konsultchef - Stockholm</span>
            </div>
            <p className="text-xs text-text-secondary max-w-xs leading-relaxed">
              {t('team.fadi_desc')}
            </p>
          </Card>

          <Card className="p-6 flex flex-col items-center text-center gap-4 shadow-sm">
            <img
              src="/images/team/anel_pasic.jpg"
              alt="Anel Pasic"
              className="w-32 h-32 rounded-full object-cover border-2 border-brand-secondary/20 shadow-md"
              loading="lazy"
            />
            <div className="flex flex-col">
              <h3 className="text-xl font-bold text-text-primary">Anel Pasic</h3>
              <span className="text-sm font-semibold text-brand-secondary">Konsultchef - Göteborg</span>
            </div>
            <p className="text-xs text-text-secondary max-w-xs leading-relaxed">
              {t('team.anel_desc')}
            </p>
          </Card>
        </div>
      </Section>

      {/* 7. TESTIMONIALS SECTION */}
      <Section
        title={t('testimonials.title')}
        subtitle={t('testimonials.subtitle')}
        badge={t('testimonials.badge')}
        background="alt"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {testimonials.map((test, idx) => (
            <Card key={idx} className="p-8 flex flex-col justify-between text-left shadow-sm h-full relative">
              <div className="absolute top-6 right-8 text-6xl font-serif text-slate-200 dark:text-slate-800 pointer-events-none select-none">
                ”
              </div>
              <div className="flex flex-col gap-6">
                <div className="p-2 bg-brand-secondary/10 text-brand-secondary rounded-full w-10 h-10 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <p className="text-base text-text-primary italic leading-relaxed z-10">
                  ”{test.quote}”
                </p>
              </div>
              <div className="mt-8 border-t border-border-custom pt-6 flex flex-col">
                <span className="font-bold text-text-primary text-sm">{test.name}</span>
                <span className="text-xs text-text-secondary">{test.position}</span>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* 8. BOTTOM CTA SECTION */}
      <Section background="dark" animate={true} className="py-16 md:py-20 text-center bg-slate-950 text-white rounded-3xl mx-6 my-12 border border-slate-800">
        <div className="max-w-2xl mx-auto flex flex-col items-center gap-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">{t('services.cta_cta_title')}</h2>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed">
            {t('services.cta_cta_desc')}
          </p>
          <div className="mt-4 flex flex-wrap gap-4 justify-center">
            <Link to={contactPath}>
              <Button variant="primary" size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                {t('services.cta_cta_btn')}
              </Button>
            </Link>
            <Link to={aboutPath}>
              <Button variant="secondary" size="lg" className="!bg-transparent border-white/30 !text-white hover:!bg-white/10 hover:!border-white/60 transition-all duration-200">
                {t('nav.about')}
              </Button>
            </Link>
          </div>
        </div>
      </Section>

    </div>
  );
};

export default Home;
