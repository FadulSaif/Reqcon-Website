import { BrowserRouter, StaticRouter } from 'react-router-dom';
import { createAppConfig } from '@wroud/vite-plugin-ssg/app';
import type { IndexComponentProps } from '@wroud/vite-plugin-ssg';
import { Body, Head, Html, Script } from '@wroud/vite-plugin-ssg/react/components';
import App from './App';
import { ThemeProvider } from './context/ThemeContext';
import { STATIC_ROUTES } from './config/site-routes';
import { getPageMetadata } from './components/SEO';
import './i18n';
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
  const metadata = getPageMetadata(pathname);
  const href = `${pathname}${url.search}`;

  return (
    <Html lang={pathname.startsWith('/en') ? 'en' : 'sv'} suppressHydrationWarning>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/png" href="/favicon.png?v=4" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="canonical" href={metadata.canonical} />
        <link rel="alternate" hrefLang="sv" href={metadata.alternates.sv} />
        <link rel="alternate" hrefLang="en" href={metadata.alternates.en} />
        <link rel="alternate" hrefLang="x-default" href={metadata.alternates['x-default']} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content={pathname.startsWith('/en') ? 'en_US' : 'sv_SE'} />
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
