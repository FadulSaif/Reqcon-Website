/* eslint-disable react-refresh/only-export-components */
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SITE_URL, toAbsoluteUrl } from '../config/site';
import { getArticle } from '../content/articles';

export interface PageMetadata {
  title: string;
  description: string;
  canonical: string;
  alternates: Record<'sv' | 'en' | 'x-default', string>;
  schema: object;
  noindex?: boolean;
}

interface SEOProps {
  title: string;
  description: string;
  schema?: object;
  noindex?: boolean;
}

const serviceNames: Record<string, Record<'sv' | 'en', string>> = {
  'requirements-analysis': { sv: 'Kravanalys & verksamhetsanalys', en: 'Requirements analysis & business analysis' },
  'testing-qa': { sv: 'Testning & kvalitetssäkring', en: 'Testing & quality assurance' },
  'project-management': { sv: 'Projektledning', en: 'Project management' },
  'information-management': { sv: 'Informationshantering', en: 'Information management' },
  'ux-design': { sv: 'UX-design', en: 'UX design' },
  'agile-methods': { sv: 'Agila metoder', en: 'Agile methods' },
};

const organizationSchema = {
  '@type': ['Organization', 'ConsultingService', 'LocalBusiness'],
  '@id': `${SITE_URL}/#organization`,
  name: 'REQCON AB',
  url: SITE_URL,
  logo: toAbsoluteUrl('/images/logo.png'),
  email: 'info@reqcon.se',
  address: [
    { '@type': 'PostalAddress', streetAddress: 'Tullgårdsgatan 10', addressLocality: 'Stockholm', postalCode: '116 68', addressCountry: 'SE' },
    { '@type': 'PostalAddress', streetAddress: 'Gustaf Dalénsgatan 30', addressLocality: 'Göteborg', postalCode: '417 24', addressCountry: 'SE' },
  ],
};

const copy = {
  sv: {
    homeTitle: 'REQCON AB | IT-konsulter inom kravanalys, testledning & agil projektledning',
    homeDescription: 'REQCON är ett svenskt IT-konsultbolag med senior kompetens inom kravanalys, testledning, UX-design och agil projektledning.',
    services: 'Våra specialisttjänster | REQCON AB',
    servicesDescription: 'Utforska REQCONs tjänster inom kravanalys, testledning, UX, projektledning, informationshantering och agila metoder.',
    about: 'Om REQCON AB | IT-konsultbolag',
    team: 'Vårt team | REQCON AB',
    careers: 'Arbeta hos oss | Karriär hos REQCON AB',
    contact: 'Kontakta oss | REQCON AB',
    personalPolicy: 'Personuppgiftspolicy | REQCON AB',
    privacy: 'Integritetspolicy | REQCON AB',
    articles: 'Insikter om kravhantering | REQCON AB',
    articlesDescription: 'Praktiska insikter om kravhantering, anbudsgranskning och spårbarhet i byggprojekt.',
  },
  en: {
    homeTitle: 'REQCON AB | IT consultants in requirements analysis & project management',
    homeDescription: 'REQCON is a Swedish IT consulting firm offering senior expertise in requirements analysis, testing, UX, and agile project management.',
    services: 'Our specialist services | REQCON AB',
    servicesDescription: 'Explore REQCON services in requirements analysis, testing, UX, project management, information management, and agile methods.',
    about: 'About REQCON AB | IT consulting',
    team: 'Our team | REQCON AB',
    careers: 'Careers at REQCON AB',
    contact: 'Contact us | REQCON AB',
    personalPolicy: 'Personal data policy | REQCON AB',
    privacy: 'Privacy policy | REQCON AB',
    articles: 'Insights on requirements management | REQCON AB',
    articlesDescription: 'Practical insights on requirements management, tender review, and traceability in construction projects.',
  },
} as const;

export const getPageMetadata = (pathname: string): PageMetadata => {
  const normalizedPath = pathname.replace(/\/$/, '') || '/';
  const language: 'sv' | 'en' = normalizedPath.startsWith('/en') ? 'en' : 'sv';
  const suffix = normalizedPath.replace(new RegExp(`^/${language}`), '') || '/';
  const localized = (locale: 'sv' | 'en') => toAbsoluteUrl(`/${locale}${suffix === '/' ? '' : suffix}`);
  const base = {
    canonical: toAbsoluteUrl(normalizedPath),
    alternates: { sv: localized('sv'), en: localized('en'), 'x-default': toAbsoluteUrl(`/sv${suffix === '/' ? '' : suffix}`) },
  };
  const localizedCopy = copy[language];
  let title: string = localizedCopy.homeTitle;
  let description: string = localizedCopy.homeDescription;
  let pageType = 'WebPage';
  let noindex = false;

  if (suffix === '/services') {
    title = localizedCopy.services;
    description = localizedCopy.servicesDescription;
    pageType = 'CollectionPage';
  } else if (suffix.startsWith('/services/')) {
    const slug = suffix.split('/')[2];
    const serviceName = serviceNames[slug]?.[language] ?? localizedCopy.services;
    title = `${serviceName} | REQCON AB`;
    description = language === 'sv'
      ? `${serviceName} från REQCON AB.`
      : `${serviceName} from REQCON AB.`;
    pageType = 'Service';
  } else if (suffix === '/about') {
    title = localizedCopy.about;
    description = localizedCopy.homeDescription;
    pageType = 'AboutPage';
  } else if (suffix === '/team') {
    title = localizedCopy.team;
    description = language === 'sv' ? 'Möt REQCON AB:s konsultchefer i Stockholm och Göteborg.' : 'Meet REQCON AB’s consultant managers in Stockholm and Gothenburg.';
    pageType = 'AboutPage';
  } else if (suffix === '/careers') {
    title = localizedCopy.careers;
    description = language === 'sv' ? 'Karriärmöjligheter hos REQCON AB.' : 'Career opportunities at REQCON AB.';
  } else if (suffix === '/contact') {
    title = localizedCopy.contact;
    description = language === 'sv' ? 'Kontakta REQCON AB i Stockholm eller Göteborg.' : 'Contact REQCON AB in Stockholm or Gothenburg.';
    pageType = 'ContactPage';
  } else if (suffix === '/personalpolicy') {
    title = localizedCopy.personalPolicy;
    description = language === 'sv' ? 'REQCON AB:s policy för personuppgifter.' : 'REQCON AB personal data policy.';
  } else if (suffix === '/privacy') {
    title = localizedCopy.privacy;
    description = language === 'sv' ? 'REQCON AB:s integritetspolicy.' : 'REQCON AB privacy policy.';
    noindex = true;
  } else if (suffix === '/articles') {
    title = localizedCopy.articles;
    description = localizedCopy.articlesDescription;
    pageType = 'CollectionPage';
  } else if (suffix.startsWith('/articles/')) {
    const article = getArticle(suffix.split('/')[2]);
    if (article) {
      const articleCopy = article[language];
      title = `${articleCopy.title} | REQCON AB`;
      description = articleCopy.description;
      pageType = 'Article';
    }
  }

  const breadcrumbItems = suffix === '/' ? [] : suffix.split('/').filter(Boolean).map((segment, index, segments) => ({
    '@type': 'ListItem',
    position: index + 2,
    name: segment.replace(/-/g, ' '),
    item: toAbsoluteUrl(`/${language}/${segments.slice(0, index + 1).join('/')}`),
  }));

  const graph: object[] = [
    {
      '@type': pageType,
      '@id': `${base.canonical}#webpage`,
      name: title,
      description,
      url: base.canonical,
      inLanguage: language,
      isPartOf: { '@id': `${SITE_URL}/#website` },
    },
  ];

  if (suffix === '/') {
    graph.push(
      organizationSchema,
      { '@type': 'WebSite', '@id': `${SITE_URL}/#website`, name: 'REQCON AB', url: SITE_URL, publisher: { '@id': `${SITE_URL}/#organization` } },
      {
        '@type': 'FAQPage',
        mainEntity: [{ '@type': 'Question', name: language === 'sv' ? 'Vad gör REQCON?' : 'What does REQCON do?', acceptedAnswer: { '@type': 'Answer', text: description } }],
      },
    );
  }
  if (suffix.startsWith('/services/')) {
    graph.push({ '@type': 'Service', name: title.replace(' | REQCON AB', ''), provider: { '@id': `${SITE_URL}/#organization` }, url: base.canonical });
  }
  if (suffix.startsWith('/articles/')) {
    const article = getArticle(suffix.split('/')[2]);
    if (article) {
      const articleCopy = article[language];
      graph.push({
        '@type': 'Article',
        headline: articleCopy.title,
        description: articleCopy.description,
        inLanguage: language,
        mainEntityOfPage: { '@id': `${base.canonical}#webpage` },
        author: { '@type': 'Organization', name: 'REQCON AB' },
        publisher: { '@id': `${SITE_URL}/#organization` },
        url: base.canonical,
      });
    }
  }
  if (breadcrumbItems.length) {
    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: [{ '@type': 'ListItem', position: 1, name: 'REQCON', item: localized(language) }, ...breadcrumbItems],
    });
  }

  return { title, description, ...base, schema: { '@context': 'https://schema.org', '@graph': graph }, noindex };
};

export const SEO: React.FC<SEOProps> = ({ title, description, schema, noindex = false }) => {
  const location = useLocation();

  // Prerendered documents get their head from getPageMetadata(). This effect
  // only keeps metadata correct after an in-app client-side navigation.
  useEffect(() => {
    const documentTitle = title.includes('REQCON') ? title : `${title} | REQCON AB`;
    document.title = documentTitle;

    const setMeta = (selector: string, attribute: string, value: string) => {
      let element = document.querySelector(selector) as HTMLMetaElement | null;
      if (!element) {
        element = document.createElement('meta');
        const [name, attributeValue] = selector.match(/\[([^=]+)="([^"]+)"\]/)?.slice(1) ?? [];
        if (name && attributeValue) element.setAttribute(name, attributeValue);
        document.head.appendChild(element);
      }
      element.setAttribute(attribute, value);
    };

    setMeta('meta[name="description"]', 'content', description);
    setMeta('meta[property="og:title"]', 'content', documentTitle);
    setMeta('meta[property="og:description"]', 'content', description);

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = toAbsoluteUrl(location.pathname);

    const resolved = getPageMetadata(location.pathname);
    document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((element) => element.remove());
    Object.entries(resolved.alternates).forEach(([language, href]) => {
      const alternate = document.createElement('link');
      alternate.rel = 'alternate';
      alternate.hreflang = language;
      alternate.href = href;
      document.head.appendChild(alternate);
    });

    let robots = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null;
    if (noindex) {
      if (!robots) {
        robots = document.createElement('meta');
        robots.name = 'robots';
        document.head.appendChild(robots);
      }
      robots.content = 'noindex,follow';
    } else {
      robots?.remove();
    }

    const jsonLd = schema ?? resolved.schema;
    let script = document.getElementById('page-json-ld') as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = 'page-json-ld';
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(jsonLd);
  }, [description, location.pathname, noindex, schema, title]);

  return null;
};

export default SEO;
