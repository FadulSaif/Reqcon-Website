import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const [router, services, footer, sitemap, vercel, routeManifest] = await Promise.all([
  readFile('src/router/AppRoutes.tsx', 'utf8'),
  readFile('src/pages/Services.tsx', 'utf8'),
  readFile('src/components/Footer.tsx', 'utf8'),
  readFile('public/sitemap.xml', 'utf8'),
  readFile('vercel.json', 'utf8'),
  readFile('src/config/site-routes.json', 'utf8')
]);

const { locales, paths } = JSON.parse(routeManifest);

const slugs = [
  'requirements-analysis',
  'testing-qa',
  'project-management',
  'information-management',
  'ux-design',
  'agile-methods'
];

for (const route of ['services', 'about', 'careers', 'contact', 'personalpolicy', 'privacy']) {
  assert.match(router, new RegExp(`path="${route}"`), `Missing route: ${route}`);
}

for (const slug of slugs) {
  assert.match(services, new RegExp(`slug: '${slug}'`), `Missing service card: ${slug}`);
}

for (const locale of locales) {
  for (const path of paths) {
    const urlPath = `/${locale}${path ? `/${path}` : ''}`;
    assert.match(sitemap, new RegExp(`${urlPath}</loc>`), `Missing sitemap URL: ${urlPath}`);
  }
}

assert.doesNotMatch(router, /HashRouter/, 'Routes must use clean browser paths');
assert.doesNotMatch(footer, /href="#"/, 'Footer must not contain placeholder links');
assert.match(vercel, /"cleanUrls": true/, 'Vercel must serve SSG routes as clean static URLs');
assert.match(vercel, /"redirects"/, 'Vercel must redirect legacy unprefixed URLs');
assert.doesNotMatch(vercel, /"rewrites"/, 'A SPA rewrite would override prerendered documents');

console.log(`Verified ${locales.length * paths.length} sitemap URLs and static route configuration.`);
