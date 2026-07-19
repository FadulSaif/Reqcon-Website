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
    document.title = `${title} | REQCON`;

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
    if (ogTitle) ogTitle.setAttribute('content', `${title} | REQCON`);

    // Update OpenGraph Description
    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', description);

    // Dynamic alternate links for bilingual indexation (hreflang)
    const currentPath = location.pathname;
    const pathParts = currentPath.split('/');
    const subPath = pathParts.slice(2).join('/'); // Path after language prefix (e.g. 'about')

    const baseDomain = 'https://reqcon.se';
    const alternateUrls = {
      sv: `${baseDomain}/sv/${subPath}`,
      en: `${baseDomain}/en/${subPath}`,
      'x-default': `${baseDomain}/sv/${subPath}`
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
