export const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://reqcon-website.vercel.app').replace(/\/$/, '');

export const toAbsoluteUrl = (pathname: string) => `${SITE_URL}${pathname.startsWith('/') ? pathname : `/${pathname}`}`;
