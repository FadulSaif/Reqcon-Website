/**
 * Single source of truth for article metadata (cards, listing page, sitemap).
 *
 * The full article body lives in `ArticleClientPage.tsx`; SEO metadata + Article
 * schema live in `app/articles/[slug]/page.tsx`. This file holds the shared
 * card-level data so the homepage section, the /articles listing, and the
 * sitemap never drift out of sync.
 *
 * Titles/excerpts are translation keys (resolved via the `t()` helper) so both
 * Swedish and English render correctly. Dates are pre-formatted per language.
 */

export interface ArticleMeta {
  slug: string;
  image: string;
  titleKey: string;
  excerptKey: string;
  categoryKey: string;
  dateSv: string;
  dateEn: string;
  /** Machine-readable date for sitemap lastModified + schema. */
  dateISO: string;
}

export const ARTICLES: ArticleMeta[] = [
  {
    slug: "future-flexible-it-staffing",
    image: "/assets/it_staffing_hero.png",
    titleKey: "articles.a1.title",
    excerptKey: "articles.a1.desc",
    categoryKey: "articles.cat.tech",
    dateSv: "15 juni 2026",
    dateEn: "June 15, 2026",
    dateISO: "2026-06-15",
  },
  {
    slug: "optimizing-warehouse-operations",
    image: "/assets/warehouse_agile_hero.png",
    titleKey: "articles.a2.title",
    excerptKey: "articles.a2.desc",
    categoryKey: "articles.cat.logistics",
    dateSv: "28 maj 2026",
    dateEn: "May 28, 2026",
    dateISO: "2026-05-28",
  },
  {
    slug: "skills-shortage-construction-sweden",
    image: "/assets/industry-construction.jpg",
    titleKey: "articles.a3.title",
    excerptKey: "articles.a3.desc",
    categoryKey: "articles.cat.construction",
    dateSv: "12 april 2026",
    dateEn: "April 12, 2026",
    dateISO: "2026-04-12",
  },
  {
    slug: "recruiting-cleaning-staff-sweden",
    image: "/assets/industry-cleaning.jpg",
    titleKey: "articles.a4.title",
    excerptKey: "articles.a4.desc",
    categoryKey: "articles.cat.facilities",
    dateSv: "5 mars 2026",
    dateEn: "March 5, 2026",
    dateISO: "2026-03-05",
  },
];

export const ARTICLE_SLUGS = ARTICLES.map((a) => a.slug);
