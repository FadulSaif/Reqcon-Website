import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Search, ShieldCheck, Layers, FileText, Compass, Zap, CheckCircle2, ArrowRight } from 'lucide-react';
import Section from '../components/Section';
import Card from '../components/Card';
import Button from '../components/Button';
import SEO from '../components/SEO';
import { SITE_URL } from '../config/site';

const servicesSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "IT Consulting",
  "provider": {
    "@type": "Organization",
    "name": "REQCON AB",
    "url": SITE_URL
  },
  "areaServed": {
    "@type": "Country",
    "name": "Sverige"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "REQCON IT Services",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Kravanalys" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Testning & QA" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Projektledning" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Informationshantering" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "UX-design" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Agila metoder" } }
    ]
  }
};

const Services: React.FC = () => {
  const { t, i18n } = useTranslation();

  const servicesList = [
    {
      slug: 'requirements-analysis',
      icon: <Search className="w-8 h-8 text-current" />,
      title: t('services.items.krav.title'),
      intro: t('services.items.krav.intro'),
      description: t('services.items.krav.desc'),
      bullets: [
        t('services.items.krav.bullets.0'),
        t('services.items.krav.bullets.1'),
        t('services.items.krav.bullets.2'),
        t('services.items.krav.bullets.3')
      ],
      image: '/images/services/kravanalys.jpg',
      buttonText: t('services.items.krav.button_text')
    },
    {
      slug: 'testing-qa',
      icon: <ShieldCheck className="w-8 h-8 text-current" />,
      title: t('services.items.test.title'),
      intro: t('services.items.test.intro'),
      description: t('services.items.test.desc'),
      bullets: [
        t('services.items.test.bullets.0'),
        t('services.items.test.bullets.1'),
        t('services.items.test.bullets.2'),
        t('services.items.test.bullets.3')
      ],
      image: '/images/services/testning.jpg',
      buttonText: t('services.items.test.button_text')
    },
    {
      slug: 'project-management',
      icon: <Layers className="w-8 h-8 text-current" />,
      title: t('services.items.pm.title'),
      intro: t('services.items.pm.intro'),
      description: t('services.items.pm.desc'),
      bullets: [
        t('services.items.pm.bullets.0'),
        t('services.items.pm.bullets.1'),
        t('services.items.pm.bullets.2'),
        t('services.items.pm.bullets.3')
      ],
      image: '/images/services/projektledning.jpg',
      buttonText: t('services.items.pm.button_text')
    },
    {
      slug: 'information-management',
      icon: <FileText className="w-8 h-8 text-current" />,
      title: t('services.items.info.title'),
      intro: t('services.items.info.intro'),
      description: t('services.items.info.desc'),
      bullets: [
        t('services.items.info.bullets.0'),
        t('services.items.info.bullets.1'),
        t('services.items.info.bullets.2'),
        t('services.items.info.bullets.3')
      ],
      image: '/images/services/informationshantering.jpg',
      buttonText: t('services.items.info.button_text')
    },
    {
      slug: 'ux-design',
      icon: <Compass className="w-8 h-8 text-current" />,
      title: t('services.items.ux.title'),
      intro: t('services.items.ux.intro'),
      description: t('services.items.ux.desc'),
      bullets: [
        t('services.items.ux.bullets.0'),
        t('services.items.ux.bullets.1'),
        t('services.items.ux.bullets.2'),
        t('services.items.ux.bullets.3')
      ],
      image: '/images/services/uxdesign.jpg',
      buttonText: t('services.items.ux.button_text')
    },
    {
      slug: 'agile-methods',
      icon: <Zap className="w-8 h-8 text-current" />,
      title: t('services.items.agile.title'),
      intro: t('services.items.agile.intro'),
      description: t('services.items.agile.desc'),
      bullets: [
        t('services.items.agile.bullets.0'),
        t('services.items.agile.bullets.1'),
        t('services.items.agile.bullets.2'),
        t('services.items.agile.bullets.3')
      ],
      image: '/images/services/agilametoder.jpg',
      buttonText: t('services.items.agile.button_text')
    }
  ];

  const contactPath = `/${i18n.language}/contact`;

  return (
    <div className="flex flex-col w-full">
      <SEO
        title="Våra specialisttjänster | Kravanalys, Testledning & Agil Projektledning | REQCON AB"
        description="Utforska REQCONs tjänster inom kravanalys, testledning, UX, projektledning, informationshantering och agila metoder för organisationer i Stockholm, Göteborg och hela Sverige."
        schema={servicesSchema}
      />
      {/* Page Header */}
      <section className="relative py-24 md:py-36 px-6 border-b border-border-custom overflow-hidden text-center flex items-center justify-center min-h-[50vh] bg-slate-950">
        {/* Background Image */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          <img 
            src="/images/hero-company-image.jpg" 
            alt="REQCON specialisttjänster inom IT-konsultation och systemutveckling" 
            className="w-full h-full object-cover opacity-25 filter brightness-[0.75] contrast-105"
          />
          {/* Dark gradient mask */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/80 dark:from-black dark:via-black/75 dark:to-black/85" />
        </div>
        
        {/* Content Container */}
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-6 relative z-10 text-white">
          <span className="text-[10px] font-bold uppercase tracking-widest text-brand-secondary/90 px-3 py-1 rounded-full bg-brand-secondary/10 border border-brand-secondary/15 select-none w-fit">
            {t('services.badge')}
          </span>
          
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-tight uppercase text-center">
            {t('services.title')}
          </h1>
          
          <p className="text-base md:text-lg text-zinc-300 leading-relaxed max-w-2xl text-center font-medium">
            {t('services.subtitle')}
          </p>
        </div>
      </section>

      {/* Services List Section */}
      <Section background="default" animate={true} className="py-10 md:py-14">
        <div className="flex flex-col gap-16 md:gap-24 max-w-5xl mx-auto">
          {servicesList.map((service, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <Card 
                key={idx} 
                hoverable={true} 
                className={`p-6 md:p-8 flex flex-col md:flex-row gap-8 md:gap-12 items-stretch text-left shadow-sm rounded-3xl ${
                  !isEven ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Image block */}
                <div className="w-full md:w-[45%] aspect-video md:aspect-auto rounded-2xl overflow-hidden relative shadow-sm shrink-0">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 w-12 h-12 rounded-xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm flex items-center justify-center shadow-md text-brand-secondary transition-all duration-300 group-hover:rotate-6 group-hover:bg-accent-primary group-hover:text-white">
                    {service.icon}
                  </div>
                </div>

                {/* Content block */}
                <div className="flex-grow flex flex-col gap-5 justify-between">
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-brand-secondary">
                        {t('services.badge')}
                      </span>
                      <h2 className="text-3xl md:text-4xl font-extrabold text-text-primary tracking-tight leading-tight">
                        {service.title}
                      </h2>
                    </div>

                    <div className="flex flex-col gap-3">
                      <p className="text-sm md:text-base font-semibold text-brand-secondary leading-relaxed">
                        {service.intro}
                      </p>
                      <p className="text-sm md:text-base text-text-secondary leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    {/* Deliverables / Bullets Checklist */}
                    <div className="mt-2 flex flex-col gap-3">
                      <span className="text-xs md:text-sm font-bold uppercase tracking-wider text-text-primary">
                        {t('services.deliverables_label')}
                      </span>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm md:text-base text-text-secondary">
                        {service.bullets.map((b, bIdx) => (
                          <li key={bIdx} className="flex gap-2.5 items-start">
                            <CheckCircle2 className="w-4 h-4 text-brand-secondary shrink-0 mt-1" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Buttons Action Group */}
                  <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/60 flex items-center">
                    <Link to={`/${i18n.language}/services/${service.slug}`} onClick={() => window.scrollTo(0, 0)} className="w-full sm:w-auto">
                      <Button variant="primary" size="md" className="font-bold" rightIcon={<ArrowRight className="w-4 h-4" />}>
                        {service.buttonText}
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </Section>

      {/* Bottom conversion block */}
      <Section background="dark" className="py-16 md:py-20 text-center bg-zinc-950 dark:bg-bg-surface text-white rounded-3xl mx-6 my-12 border border-zinc-800/80">
        <div className="max-w-2xl mx-auto flex flex-col items-center gap-6">
          <h2 className="text-3xl font-extrabold tracking-tight text-white">{t('services.cta_cta_title')}</h2>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed">
            {t('services.cta_cta_desc')}
          </p>
          <div className="mt-4">
            <Link to={contactPath}>
              <Button variant="primary" size="lg">
                {t('services.cta_cta_btn')}
              </Button>
            </Link>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default Services;
