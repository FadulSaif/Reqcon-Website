import routeManifest from './site-routes.json';

export const SUPPORTED_LOCALES = routeManifest.locales;
export const LOCALIZED_PATHS = routeManifest.paths;

export const STATIC_ROUTES = [
  ...SUPPORTED_LOCALES.flatMap((locale) =>
    LOCALIZED_PATHS.map((path) => `/${locale}${path ? `/${path}` : ''}`),
  ),
];

export const getLocaleFromPathname = (pathname: string) =>
  pathname.split('/')[1] === 'en' ? 'en' : 'sv';
