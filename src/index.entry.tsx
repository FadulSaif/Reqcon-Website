/* eslint-disable react-refresh/only-export-components */
import { BrowserRouter, StaticRouter } from 'react-router-dom';
import { createAppConfig } from '@wroud/vite-plugin-ssg/app';
import type { IndexComponentProps } from '@wroud/vite-plugin-ssg';
import { Body, Head, Html, Script } from '@wroud/vite-plugin-ssg/react/components';
import App from './App';
import { ThemeProvider } from './context/ThemeContext';
import { STATIC_ROUTES } from './config/site-routes';
import { getPageMetadata } from './components/SEO';
import i18n from './i18n';
import './index.css';

const themeBootstrap = `(function(){try{var saved=localStorage.getItem('reqcon_theme');var theme=(saved==='light'||saved==='dark')?saved:(window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.classList.toggle('dark',theme==='dark')}catch(e){}}());`;

const Application = ({ href }: { href: string }) => {
  if (import.meta.env.SSR) {
    return (
      <StaticRouter location={href}>
        <ThemeProvider><App /></ThemeProvider>
      </StaticRouter>
    );
  }

  return (
    <BrowserRouter>
      <ThemeProvider><App /></ThemeProvider>
    </BrowserRouter>
  );
};

const Document = ({ context }: IndexComponentProps) => {
  const url = new URL(context.href ?? '/', 'https://reqcon.local');
  const pathname = url.pathname;
  const routeLanguage = pathname.startsWith('/en') ? 'en' : 'sv';
  if (i18n.language !== routeLanguage) {
    void i18n.changeLanguage(routeLanguage);
  }
  const metadata = getPageMetadata(pathname);
  const href = `${pathname}${url.search}`;

  return (
    <Html lang={routeLanguage} suppressHydrationWarning>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {import.meta.env.DEV && <link rel="stylesheet" href="/src/index.css" />}
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png?v=2" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png?v=2" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=2" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="canonical" href={metadata.canonical} />
        <link rel="alternate" hrefLang="sv" href={metadata.alternates.sv} />
        <link rel="alternate" hrefLang="en" href={metadata.alternates.en} />
        <link rel="alternate" hrefLang="x-default" href={metadata.alternates['x-default']} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content={routeLanguage === 'en' ? 'en_US' : 'sv_SE'} />
        <meta property="og:site_name" content="REQCON AB" />
        <meta property="og:url" content={metadata.canonical} />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        {metadata.noindex && <meta name="robots" content="noindex,follow" />}
        <Script forceNonce dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
        <script id="page-json-ld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(metadata.schema) }} />
      </Head>
      <Body>
        <Application href={href} />
      </Body>
    </Html>
  );
};

export default createAppConfig(Document, {
  onRoutesPrerender: () => STATIC_ROUTES,
});
