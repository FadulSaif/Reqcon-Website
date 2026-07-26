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
import { SITE_URL, toAbsoluteUrl } from '../config/site';
import { teamMembers } from '../content/team';
import { articles } from '../content/articles';
import vattenfallLogo from '../assets/logos/vattenfall-confirmed.png';
import trafikverketLogo from '../assets/logos/trafikverket-confirmed.png';
import skatteverketLogo from '../assets/logos/skatteverket-confirmed.webp';

const customerLogos = [
  { name: 'Trafikverket', src: trafikverketLogo, imageClassName: 'h-13 w-13 object-contain' },
  { name: 'Vattenfall', src: vattenfallLogo, imageClassName: 'h-13 w-13 object-contain' },
  { name: 'Skatteverket', src: skatteverketLogo, imageClassName: 'h-14 w-14 object-contain' },
];

const homeSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "ConsultingService", "LocalBusiness"],
      "@id": `${SITE_URL}/#organization`,
      "name": "REQCON AB",
      "alternateName": ["REQCON", "REQCON Consulting"],
      "legalName": "REQCON AB",
      "url": SITE_URL,
      "logo": toAbsoluteUrl('/images/logo.png'),
      "image": toAbsoluteUrl('/images/hero-company-image.jpg'),
      "email": "info@reqcon.se",
      "description": "REQCON är ett svenskt IT-konsultbolag grundat 2020 i Stockholm. Vi erbjuder seniora konsulter inom kravanalys, testledning, agil projektledning, kvalitetssäkring, informationshantering och UX-design i Stockholm, Göteborg och hela Sverige.",
      "foundingDate": "2020",
      "founder": {
        "@type": "Person",
        "name": "Fadi Rabah"
      },
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
      ],
      "areaServed": [
        { "@type": "Country", "name": "Sverige" },
        { "@type": "City", "name": "Stockholm" },
        { "@type": "City", "name": "Göteborg" }
      ],
      "knowsAbout": [
        "Kravanalys",
        "Kravhantering",
        "Business Analysis",
        "Testledning",
        "Kvalitetssäkring",
        "QA-tjänster",
        "Agil projektledning",
        "Scrum Master",
        "Informationshantering",
        "SharePoint-konsultation",
        "UX & Tjänstedesign",
        "Verksamhetsanalys",
        "Digital transformation"
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "REQCON Specialisttjänster",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Kravanalys & Verksamhetsanalys",
              "description": "Strukturering, insamling och visualisering av funktionella och icke-funktionella krav för IT-system."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Testledning & Kvalitetssäkring (QA)",
              "description": "Strukturerad testplanering, manuella och automatiserade tester samt acceptanstester (UAT)."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Agil Projektledning & Scrum Leading",
              "description": "Agilt ledarskap och metodiskt projektstöd för leveranser i tid och enligt budget."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Informationshantering & SharePoint",
              "description": "Strukturering av dokumenthantering, intranät och informationsarkitektur."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "UX & Tjänstedesign",
              "description": "Användarcentrerad design, prototyper och användbarhetstester."
            }
          }
        ]
      }
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Vad gör REQCON?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "REQCON är ett svenskt IT-konsultbolag som hjälper företag och myndigheter att omvandla komplexa behov till välfungerande IT-system genom expertis inom kravanalys, testledning, agil projektledning, informationshantering och UX-design."
          }
        },
        {
          "@type": "Question",
          "name": "Var har REQCON sina kontor?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "REQCON grundades 2020 i Stockholm (kontor på Tullgårdsgatan 10) och har expanderat till Göteborg (kontor på Gustaf Dalénsgatan 30), samt levererar konsulttjänster i hela Sverige."
          }
        },
        {
          "@type": "Question",
          "name": "Vilka branscher arbetar REQCON med?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "REQCON samarbetar med ledande organisationer i Sverige inom bland annat energisektorn, transport, myndigheter, finans, försvar och offentlig upphandling."
          }
        }
      ]
    }
  ]
};

const Home: React.FC = () => {
  const { t, i18n } = useTranslation();

  // Dynamic services preview with icons and translated text
  const servicesPreview = [
    {
      icon: <Search className="w-6 h-6 text-current" />,
      title: t('services.items.krav.title'),
      description: t('services.items.krav.intro'),
      key: 'krav'
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-current" />,
      title: t('services.items.test.title'),
      description: t('services.items.test.intro'),
      key: 'test'
    },
    {
      icon: <Layers className="w-6 h-6 text-current" />,
      title: t('services.items.pm.title'),
      description: t('services.items.pm.intro'),
      key: 'pm'
    },
    {
      icon: <Compass className="w-6 h-6 text-current" />,
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
  const articlesPath = `/${i18n.language}/articles`;
  const articleLocale = i18n.language === 'sv' ? 'sv' : 'en';
  const featuredArticles = articles.slice(0, 3);
  const articlePreviewCopy = articleLocale === 'sv'
    ? {
        badge: 'REQCON Insikter',
        title: 'Insikter för tydligare krav och säkrare beslut',
        subtitle: 'Praktiska artiklar om kravhantering, anbudsgranskning och spårbarhet.',
        readMore: 'Läs mer',
        viewAll: 'Se alla artiklar',
      }
    : {
        badge: 'REQCON Insights',
        title: 'Insights for clearer requirements and safer decisions',
        subtitle: 'Practical articles on requirements management, tender review, and traceability.',
        readMore: 'Read more',
        viewAll: 'View all articles',
      };

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
        title={i18n.language === 'sv' ? 'REQCON AB | IT-konsulter inom kravanalys, testledning & agil projektledning' : 'REQCON AB | IT Consultants in Requirements Analysis & Project Management'}
        description={i18n.language === 'sv' ? 'REQCON är ett svenskt IT-konsultbolag. Vi levererar seniora konsulter inom kravanalys, testledning, UX-design och agil projektledning i Stockholm, Göteborg och hela Sverige.' : 'REQCON is a Swedish IT consulting firm offering senior consultants in requirements analysis, testing, UX, and agile project management in Sweden.'}
        schema={homeSchema}
      />
      
      {/* 1. HERO SECTION (Redesigned Floating Card Hero) */}
      <section className="relative px-4 md:px-6 pt-0 pb-0 bg-bg-page dark:bg-[#06131b] overflow-hidden">
        <div className="max-w-[86rem] mx-auto w-full">
          {/* Floating Card Container */}
          <div className="relative w-full rounded-3xl md:rounded-[32px] overflow-hidden min-h-[59svh] md:min-h-[61.36svh] flex items-center justify-center py-2 px-6 select-none bg-slate-950 border border-slate-900/10 shadow-lg z-0">
            
            {/* Background image container with subtle zoom animation */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              <motion.img
                src="/images/hero-company-image.jpg"
                alt="REQCON IT-konsulter i samarbete kring kravanalys och agil utveckling"
                className="w-full h-full object-cover"
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.55 }}
                transition={{ duration: 1.6, ease: 'easeOut' }}
              />
              {/* A central scrim protects text from the busy window and plant areas. */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(2,6,23,0.92)_0%,rgba(2,6,23,0.76)_58%,rgba(2,6,23,0.86)_100%)]" />
            </div>

            <div className="max-w-5xl mx-auto w-full z-10 relative text-center flex flex-col items-center">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerContainer(0.12)}
                className="flex flex-col items-center text-center gap-6 max-w-4xl"
              >
                <motion.h1
                  variants={slideUp()}
                  className="home-hero-heading font-extrabold tracking-tight text-white text-center text-balance leading-[1.15]"
                >
                  {t('hero.title')}
                </motion.h1>
                
                <motion.p
                  variants={slideUp()}
                  className="home-hero-subheading body-xl max-w-3xl text-center"
                  style={{
                    color: '#f1f5f9',
                    textShadow: '0 2px 12px rgba(0, 0, 0, 0.85)',
                  }}
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
        animate={false}
        containerClassName="max-w-[86rem]"
        className="!pt-3 !pb-6 md:!pt-4 md:!pb-8 text-center border-b border-border-custom overflow-hidden"
      >
        {/* Custom uppercase header label and line dividers with a center dot indicator */}
        <div className="flex items-center justify-center gap-4 mb-5 px-6 max-w-5xl mx-auto select-none">
          <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-slate-200 dark:to-zinc-800" />
          <div className="w-1.5 h-1.5 rounded-full bg-brand-secondary" />
          <span className="section-eyebrow select-none whitespace-nowrap !mb-0">
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
                const scrollClients = [...customerLogos, ...customerLogos, ...customerLogos, ...customerLogos, ...customerLogos];

                return scrollClients.map((client, idx) => (
                  <div
                    key={idx}
                    className="bg-bg-page border border-border-custom rounded-2xl px-7 py-3 h-[5.5rem] w-64 shadow-sm flex items-center gap-4 shrink-0 hover:-translate-y-0.5 hover:shadow-md hover:border-accent-primary transition-[transform,box-shadow,border-color] duration-200 cursor-default"
                  >
                    <div className="h-14 w-16 shrink-0 overflow-hidden flex items-center justify-center">
                      <img
                        src={client.src}
                        alt={`${client.name} logo`}
                        className={client.imageClassName}
                      />
                    </div>
                    <span className="font-heading text-base font-bold tracking-tight text-text-primary whitespace-nowrap">
                      {client.name}
                    </span>
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
        containerClassName="max-w-[86rem]"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center max-w-[80rem] mx-auto">
          {/* Left Column: Visual Showcase */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative aspect-square w-full max-w-md rounded-3xl overflow-hidden shadow-lg border border-border-custom bg-slate-950/20 group select-none">
              <img
                src="/images/about_office.jpg"
                alt="REQCON kvalitetssäkring, testledning och konsulttjänster i Sverige"
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
                  className="p-5 flex gap-4 shadow-sm items-start group"
                >
                  <div className="w-10 h-10 rounded-xl bg-brand-secondary/10 flex items-center justify-center shrink-0 mt-0.5 transition-all duration-300 text-brand-secondary group-hover:rotate-6 group-hover:bg-accent-primary group-hover:text-white">
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
                <Button variant="primary" size="md" className="rounded-full">
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
        containerClassName="max-w-[86rem]"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-[80rem] mx-auto items-start">
          {/* Left Column: Sticky Title & Description */}
          <div className="lg:col-span-5 text-left flex flex-col gap-6 lg:sticky lg:top-28 h-fit">
            <div className="flex flex-col gap-4">
              <span className="section-eyebrow select-none w-fit px-3 py-1 rounded-full bg-brand-secondary/10 border border-brand-secondary/15">
                {t('why.badge')}
              </span>
              <h2 className="heading-xl text-text-primary">
                {t('why.title')}
              </h2>
              <p className="body-lg text-text-secondary max-w-md">
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
                className="p-6 flex gap-5 text-left shadow-sm border border-border-custom group"
              >
                <div className="p-3 rounded-xl bg-bg-surface border border-border-custom text-brand-secondary shrink-0 h-12 w-12 flex items-center justify-center transition-all duration-300 group-hover:rotate-6 group-hover:bg-accent-primary group-hover:text-white group-hover:border-accent-primary">
                  {pillar.icon}
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-lg font-bold text-text-primary transition-colors">{pillar.title}</h3>
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
        containerClassName="max-w-[86rem]"
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
        background="alt"
        containerClassName="max-w-[86rem]"
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

      {/* 7. ARTICLES PREVIEW SECTION */}
      <Section
        title={articlePreviewCopy.title}
        subtitle={articlePreviewCopy.subtitle}
        badge={articlePreviewCopy.badge}
        background="default"
        containerClassName="max-w-[86rem]"
        className="!pt-10 !pb-8 md:!pt-12 md:!pb-10"
      >
        <div className="grid grid-cols-1 auto-rows-fr gap-6 md:grid-cols-3 max-w-[80rem] mx-auto">
          {featuredArticles.map((article) => {
            const articleCopy = article[articleLocale];
            return (
              <Card key={article.slug} hoverable className="flex h-full flex-col p-6 text-left shadow-sm">
                <h3 className="font-heading text-xl font-bold leading-tight text-text-primary">
                  <Link to={`${articlesPath}/${article.slug}`} className="transition-colors hover:text-brand-secondary">
                    {articleCopy.title}
                  </Link>
                </h3>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-text-secondary">{articleCopy.description}</p>
                <Link
                  to={`${articlesPath}/${article.slug}`}
                  className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-bold text-brand-secondary transition-colors hover:text-accent-hover"
                >
                  {articlePreviewCopy.readMore}<ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Card>
            );
          })}
        </div>
        <div className="mt-8 text-center">
          <Link to={articlesPath}>
            <Button variant="primary" size="md" className="rounded-full">
              {articlePreviewCopy.viewAll}
            </Button>
          </Link>
        </div>
      </Section>

      {/* 8. TESTIMONIALS SECTION */}
      <Section
        title={t('testimonials.title')}
        subtitle={t('testimonials.subtitle')}
        badge={t('testimonials.badge')}
        background="alt"
        containerClassName="max-w-[86rem]"
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

      {/* 9. BOTTOM CTA SECTION */}
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
