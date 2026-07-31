/**
 * Single source of truth for all article metadata.
 *
 * Two field groups per article:
 *  - Card fields (titleKey/excerptKey/categoryKey) render on the homepage
 *    section and the /articles listing via the t() translation helper. The card
 *    title is intentionally a shorter teaser than the full article-page title.
 *  - Article-page fields (page.*) are plain, server-safe strings used by the
 *    article page itself: the visible H1 + byline (ArticleClientPage.tsx) and the
 *    SEO <title>/description + Article/Breadcrumb JSON-LD (app/articles/[slug]/page.tsx).
 *    Keeping them here means a title/date/author edit happens in ONE place.
 *
 * The full article body (prose/JSX) stays in ArticleClientPage.tsx, keyed by slug.
 */

export interface ArticlePageMeta {
  titleSv: string;
  titleEn: string;
  metaDescSv: string;
  metaDescEn: string;
  categorySv: string;
  categoryEn: string;
  author: string;
  authorRoleSv: string;
  authorRoleEn: string;
}

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
  page: ArticlePageMeta;
}

export const ARTICLES: ArticleMeta[] = [
  {
    slug: "future-flexible-it-staffing",
    image: "/assets/it_staffing_hero.png",
    // Card fields (homepage + /articles list) — resolved via t()
    titleKey: "articles.a1.title",
    excerptKey: "articles.a1.desc",
    categoryKey: "articles.cat.tech",
    dateSv: "15 juni 2026",
    dateEn: "June 15, 2026",
    dateISO: "2026-06-15",
    // Article-page fields (H1, byline, SEO metadata + JSON-LD) — plain strings,
    // server-safe. Card titles are intentionally shorter, hence a separate set.
    page: {
      titleSv: "Framtiden för flexibel IT-bemanning i Sverige 2026",
      titleEn: "The Future of Flexible IT Staffing in Sweden 2026",
      metaDescSv: "I takt med att den digitala transformationen accelererar rör sig svenska företag bort från stela anställningsmodeller. Läs om hur flexibel IT-bemanning förändrar den svenska arbetsmarknaden.",
      metaDescEn: "As digital transformation accelerates, Swedish companies are moving away from rigid hiring models. Read about how flexible IT staffing is reshaping the Swedish labour market.",
      categorySv: "Teknik",
      categoryEn: "Technology",
      author: "Anel Pasic",
      authorRoleSv: "IT-chef, Agil Arbetskraft",
      authorRoleEn: "IT Manager, Agil Arbetskraft",
    },
  },
  {
    slug: "optimizing-warehouse-operations",
    image: "/assets/warehouse_agile_hero.png",
    // Card fields (homepage + /articles list) — resolved via t()
    titleKey: "articles.a2.title",
    excerptKey: "articles.a2.desc",
    categoryKey: "articles.cat.logistics",
    dateSv: "28 maj 2026",
    dateEn: "May 28, 2026",
    dateISO: "2026-05-28",
    // Article-page fields (H1, byline, SEO metadata + JSON-LD) — plain strings,
    // server-safe. Card titles are intentionally shorter, hence a separate set.
    page: {
      titleSv: "Optimera lagerdriften med agil personalhantering",
      titleEn: "Optimizing Warehouse Operations with Agile Talent",
      metaDescSv: "Högsäsonger testar personalstyrkan till det yttersta. Så hjälper agil personalhantering svenska logistikföretag att möta efterfrågetoppar utan att riskera driftsstörningar.",
      metaDescEn: "Peak seasons push workforce capacity to its limits. How agile talent deployment helps Swedish logistics companies meet demand surges without operational disruption.",
      categorySv: "Logistik",
      categoryEn: "Logistics",
      author: "Fadi Rabah",
      authorRoleSv: "VD, Agil Arbetskraft",
      authorRoleEn: "CEO, Agil Arbetskraft",
    },
  },
  {
    slug: "skills-shortage-construction-sweden",
    image: "/assets/industry-construction.jpg",
    // Card fields (homepage + /articles list) — resolved via t()
    titleKey: "articles.a3.title",
    excerptKey: "articles.a3.desc",
    categoryKey: "articles.cat.construction",
    dateSv: "12 april 2026",
    dateEn: "April 12, 2026",
    dateISO: "2026-04-12",
    // Article-page fields (H1, byline, SEO metadata + JSON-LD) — plain strings,
    // server-safe. Card titles are intentionally shorter, hence a separate set.
    page: {
      titleSv: "Kompetensbristen inom byggsektorn i Sverige och hur du löser den",
      titleEn: "The Skills Shortage in Sweden's Construction Sector and How to Solve It",
      metaDescSv: "Den svenska byggsektorn upplever en strukturell kompetensbrist. Agil Arbetskraft förklarar varför det händer, vilka roller som drabbas hårdast och hur bemanning kan vara lösningen.",
      metaDescEn: "Sweden's construction sector faces a structural skills shortage. Agil Arbetskraft explains why it's happening, which roles are hardest hit, and how staffing can be the solution.",
      categorySv: "Bygg & Anläggning",
      categoryEn: "Construction",
      author: "Markus Nyberg",
      authorRoleSv: "Konsultchef, Agil Arbetskraft",
      authorRoleEn: "Consultant Manager, Agil Arbetskraft",
    },
  },
  {
    slug: "recruiting-cleaning-staff-sweden",
    image: "/assets/industry-cleaning.jpg",
    // Card fields (homepage + /articles list) — resolved via t()
    titleKey: "articles.a4.title",
    excerptKey: "articles.a4.desc",
    categoryKey: "articles.cat.facilities",
    dateSv: "5 mars 2026",
    dateEn: "March 5, 2026",
    dateISO: "2026-03-05",
    // Article-page fields (H1, byline, SEO metadata + JSON-LD) — plain strings,
    // server-safe. Card titles are intentionally shorter, hence a separate set.
    page: {
      titleSv: "Att rekrytera städpersonal i Sverige: krav, utmaningar och smarta lösningar",
      titleEn: "Recruiting Cleaning Staff in Sweden: Demands, Challenges, and Smart Solutions",
      metaDescSv: "Hög personalomsättning och ökade kompetensskrav gör rekrytering av städpersonal svårare än det ser ut. Agil Arbetskraft hjälper dig hitta pålitliga kandidater snabbt.",
      metaDescEn: "High turnover and increasing competency demands make recruiting cleaning staff harder than it looks. Agil Arbetskraft helps you find reliable candidates quickly.",
      categorySv: "Städ & Fastighet",
      categoryEn: "Cleaning & Facilities",
      author: "Anton af Bjur",
      authorRoleSv: "Verksamhetskoordinator, Agil Arbetskraft",
      authorRoleEn: "Operations Coordinator, Agil Arbetskraft",
    },
  },
];

export const ARTICLE_SLUGS = ARTICLES.map((a) => a.slug);
