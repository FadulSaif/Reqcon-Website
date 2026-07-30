import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  ArrowRight,
  ShieldCheck,
  Search,
  Layers,
  Compass
} from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import Section from '../components/Section';
import Eyebrow from '../components/Eyebrow';
import { slideUp, staggerContainer } from '../utils/animations';
import SEO from '../components/SEO';
import { SITE_URL, toAbsoluteUrl } from '../config/site';
import { articles } from '../content/articles';

interface CustomerLogo {
  name: string;
  src: string;
  scaleClassName: string;
}

const customerLogoRows: readonly (readonly CustomerLogo[])[] = [
  [
    { name: 'H&M', src: '/images/clients/round5/hm.png', scaleClassName: 'scale-[1.15]' },
    { name: 'Kronofogden', src: '/images/clients/round5/kronofogden.png', scaleClassName: 'scale-[1.05]' },
    { name: 'Saab', src: '/images/clients/round5/saab.png', scaleClassName: 'scale-100' },
    { name: 'SJ', src: '/images/clients/round5/sj.png', scaleClassName: 'scale-[1.05]' },
    { name: 'Skatteverket', src: '/images/clients/round5/skatteverket.png', scaleClassName: 'scale-[1.05]' },
  ],
  [
    { name: 'SL', src: '/images/clients/round5/sl.png', scaleClassName: 'scale-[1.1]' },
    { name: 'Swedavia', src: '/images/clients/round5/swedavia.png', scaleClassName: 'scale-[1.5]' },
    { name: 'Trafikförvaltningen', src: '/images/clients/round5/trafikforvaltningen.png', scaleClassName: 'scale-[1.25]' },
    { name: 'Trafikverket', src: '/images/clients/round5/trafikverket-horizontal.png', scaleClassName: 'scale-[1.05]' },
    { name: 'Vattenfall', src: '/images/clients/round5/vattenfall.png', scaleClassName: 'scale-[1.35]' },
  ],
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
  const navigate = useNavigate();

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

  const servicesPath = `/${i18n.language}/services`;
  const contactPath = `/${i18n.language}/contact`;
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
      
      {/* 1. HERO SECTION */}
      <section
        className="home-hero relative flex w-full select-none items-center justify-center overflow-hidden bg-slate-950 bg-cover bg-center px-6"
        style={{ backgroundImage: "url('/images/hero-company-image.jpg')" }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(2,6,23,0.92)_0%,rgba(2,6,23,0.76)_58%,rgba(2,6,23,0.86)_100%)]" />

        <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer(0.12)}
            className="flex max-w-4xl flex-col items-center gap-[clamp(1.125rem,2.5vw,2rem)] text-center"
          >
            <motion.h1
              variants={slideUp()}
              className="home-hero-heading text-balance text-center font-extrabold leading-[1.15] tracking-tight text-white"
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
              className="flex w-full flex-col justify-center gap-4 sm:w-auto sm:flex-row"
            >
              <Link to={contactPath} className="w-full sm:w-auto">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full rounded-full font-bold sm:w-auto"
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                >
                  {t('hero.cta_primary')}
                </Button>
              </Link>
              <Link to={servicesPath} className="w-full sm:w-auto">
                <Button
                  variant="secondary"
                  size="lg"
                  className="w-full rounded-full border-white/30 !bg-transparent font-bold !text-white transition-all duration-200 hover:!border-white/60 hover:!bg-white/10 sm:w-auto"
                >
                  {t('hero.cta_secondary')}
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. CUSTOMER SHOWCASE SECTION (Dual-row Infinite Marquee Scroll) */}
      <Section
        background="alt"
        animate={false}
        containerClassName="max-w-[86rem]"
        className="!pb-6 !pt-12 text-center border-b border-border-custom overflow-hidden md:!pb-8 md:!pt-16"
      >
        {/* Custom uppercase header label and line dividers with a center dot indicator */}
        <div className="flex w-full items-center justify-center gap-2 sm:gap-4 mb-5 px-0 sm:px-6 max-w-5xl mx-auto select-none">
          <div className="flex-1 h-[1px] bg-border-custom" />
          <div className="w-1.5 h-1.5 rounded-full bg-brand-secondary" />
          <Eyebrow margin="none" nowrap>
            {t('clients.title')}
          </Eyebrow>
          <div className="w-1.5 h-1.5 rounded-full bg-brand-secondary" />
          <div className="flex-1 h-[1px] bg-border-custom" />
        </div>

        <div className="w-full select-none space-y-3">
          {customerLogoRows.map((row, rowIndex) => {
            const extendedRow = [...row, ...row];
            const scrollClients = [...extendedRow, ...extendedRow];

            return (
              <div className="marquee-container py-2" key={rowIndex}>
                <div
                  className={`${rowIndex === 0 ? 'animate-marquee' : 'animate-marquee-reverse'} flex items-center gap-6 pr-6`}
                >
                  {scrollClients.map((client, idx) => {
                    const isAccessibleInstance = idx < row.length;

                    return (
                      <div
                        key={`${client.name}-${idx}`}
                        role="img"
                        aria-label={isAccessibleInstance ? `${client.name} logo` : undefined}
                        aria-hidden={isAccessibleInstance ? undefined : true}
                        tabIndex={isAccessibleInstance ? 0 : -1}
                        title={client.name}
                        className="group relative flex h-24 w-56 shrink-0 cursor-default items-center justify-center overflow-hidden rounded-2xl border border-border-custom bg-bg-page px-5 py-3 shadow-sm transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-0.5 hover:border-accent-primary hover:shadow-md focus-visible:border-accent-primary dark:border-white/15 dark:bg-white"
                      >
                        <img
                          src={client.src}
                          alt=""
                          loading="lazy"
                          decoding="async"
                          className={`max-h-14 max-w-44 object-contain transition-[opacity,transform] duration-200 group-hover:opacity-15 group-focus-visible:opacity-15 ${client.scaleClassName}`}
                        />
                        <span
                          aria-hidden="true"
                          className="absolute inset-0 flex items-center justify-center bg-bg-page/95 px-4 text-center font-heading text-sm font-bold tracking-tight text-text-primary opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 dark:bg-white/95 dark:text-slate-900"
                        >
                          {client.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
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
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col gap-6 text-left">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {servicesPreview.map((service, idx) => (
                <Button
                  key={idx}
                  type="button"
                  variant="secondary"
                  size="md"
                  onClick={() => {
                    navigate(`${servicesPath}/${getSlugFromKey(service.key)}`);
                  }}
                  className="group h-full w-full !justify-start rounded-2xl p-5 text-left shadow-sm [&>span]:w-full"
                >
                  <span className="flex w-full items-start gap-4">
                    <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-secondary/10 text-brand-secondary transition-all duration-300 group-hover:rotate-6 group-hover:bg-accent-primary group-hover:text-white">
                      {service.icon}
                    </span>
                    <span className="flex flex-1 flex-col gap-1.5">
                      <span className="w-fit text-lg font-bold normal-case tracking-normal text-text-primary transition-colors group-hover:text-brand-secondary">
                        {service.title}
                      </span>
                      <span className="text-sm font-normal leading-relaxed normal-case tracking-normal text-text-secondary">{service.description}</span>
                    </span>
                  </span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* 4. ARTICLES PREVIEW SECTION */}
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

    </div>
  );
};

export default Home;
