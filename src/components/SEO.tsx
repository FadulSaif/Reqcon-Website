import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title: string;
  description: string;
  schema?: object;
}

export const SEO: React.FC<SEOProps> = ({ title, description, schema }) => {
  const location = useLocation();

  useEffect(() => {
    // Update title
    document.title = title.includes('REQCON') ? title : `${title} | REQCON AB`;

    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);

    // Update OpenGraph Title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', document.title);

    // Update OpenGraph Description
    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', description);

    // Update OpenGraph Locale (Swedish First)
    let ogLocale = document.querySelector('meta[property="og:locale"]');
    if (!ogLocale) {
      ogLocale = document.createElement('meta');
      ogLocale.setAttribute('property', 'og:locale');
      document.head.appendChild(ogLocale);
    }
    const currentLang = location.pathname.startsWith('/en') ? 'en_US' : 'sv_SE';
    ogLocale.setAttribute('content', currentLang);

    // Update OpenGraph Site Name
    let ogSiteName = document.querySelector('meta[property="og:site_name"]');
    if (!ogSiteName) {
      ogSiteName = document.createElement('meta');
      ogSiteName.setAttribute('property', 'og:site_name');
      document.head.appendChild(ogSiteName);
    }
    ogSiteName.setAttribute('content', 'REQCON AB');

    // Update Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', `https://reqcon.se${location.pathname}`);

    // Dynamic alternate links for bilingual indexation (hreflang)
    const currentPath = location.pathname;
    const pathParts = currentPath.split('/');
    const subPath = pathParts.slice(2).join('/'); // Path after language prefix (e.g. 'about')

    const baseDomain = 'https://reqcon.se';
    const alternateUrls = {
      sv: `${baseDomain}/sv${subPath ? '/' + subPath : ''}`,
      en: `${baseDomain}/en${subPath ? '/' + subPath : ''}`,
      'x-default': `${baseDomain}/sv${subPath ? '/' + subPath : ''}`
    };

    // Remove existing alternate links
    const existingAlternates = document.querySelectorAll('link[rel="alternate"][hreflang]');
    existingAlternates.forEach(el => el.remove());

    // Inject alternates
    Object.entries(alternateUrls).forEach(([lang, url]) => {
      const linkEl = document.createElement('link');
      linkEl.setAttribute('rel', 'alternate');
      linkEl.setAttribute('hreflang', lang);
      linkEl.setAttribute('href', url);
      document.head.appendChild(linkEl);
    });

    // Inject JSON-LD Schema.org script
    const existingScript = document.getElementById('json-ld-schema');
    if (existingScript) {
      existingScript.remove();
    }

    if (schema) {
      const script = document.createElement('script');
      script.id = 'json-ld-schema';
      script.type = 'application/ld+json';
      script.innerHTML = JSON.stringify(schema);
      document.head.appendChild(script);
    }

    return () => {
      document.getElementById('json-ld-schema')?.remove();
      document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(el => el.remove());
    };
  }, [title, description, schema, location]);

  return null;
};

export default SEO;
