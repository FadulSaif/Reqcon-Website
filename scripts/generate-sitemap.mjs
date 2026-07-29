import { readFile, writeFile } from 'node:fs/promises';
const manifest = JSON.parse(await readFile(new URL('../src/config/site-routes.json', import.meta.url), 'utf8'));
const siteUrl = (process.env.VITE_SITE_URL || 'https://reqcon-website.vercel.app').replace(/\/$/, '');

const urls = manifest.locales.flatMap((locale) =>
  manifest.paths.map((path) => `${siteUrl}/${locale}${path ? `/${path}` : ''}`),
);

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...urls.map((url) => `  <url><loc>${url}</loc></url>`),
  '</urlset>',
  '',
].join('\n');

await writeFile(new URL('../public/sitemap.xml', import.meta.url), xml, 'utf8');
console.log(`Generated sitemap with ${urls.length} localized URLs.`);
