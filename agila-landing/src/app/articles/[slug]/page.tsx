import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArticleClientPage from "@/components/ArticleClientPage";

/* ─── Safe JSON-LD serializer ─── */
function safeJsonLd(data: object): string {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
}

/* ─── Static metadata per article (server-safe, no JSX) ─── */
interface ArticleStaticMeta {
  titleSv: string;
  titleEn: string;
  excerptSv: string;
  excerptEn: string;
  dateISO: string;
  author: string;
  heroImage: string;
}

const ARTICLE_STATIC: Record<string, ArticleStaticMeta> = {
  "future-flexible-it-staffing": {
    titleSv: "Framtiden för flexibel IT-bemanning i Sverige 2026",
    titleEn: "The Future of Flexible IT Staffing in Sweden 2026",
    excerptSv: "I takt med att den digitala transformationen accelererar rör sig svenska företag bort från stela anställningsmodeller. Läs om hur flexibel IT-bemanning förändrar den svenska arbetsmarknaden.",
    excerptEn: "As digital transformation accelerates, Swedish companies are moving away from rigid hiring models. Read about how flexible IT staffing is reshaping the Swedish labour market.",
    dateISO: "2026-06-15",
    author: "Johan Eriksson",
    heroImage: "https://agilarbetskraft.se/assets/it_staffing_hero.png",
  },
  "optimizing-warehouse-operations": {
    titleSv: "Optimera lagerdriften med agil personalhantering",
    titleEn: "Optimizing Warehouse Operations with Agile Talent",
    excerptSv: "Högsäsonger testar personalstyrkan till det yttersta. Så hjälper agil personalhantering svenska logistikföretag att möta efterfrågetoppar utan att riskera driftsstörningar.",
    excerptEn: "Peak seasons push workforce capacity to its limits. How agile talent deployment helps Swedish logistics companies meet demand surges without operational disruption.",
    dateISO: "2026-05-28",
    author: "Lars Bergström",
    heroImage: "https://agilarbetskraft.se/assets/warehouse_agile_hero.png",
  },
  "skills-shortage-construction-sweden": {
    titleSv: "Kompetensbristen inom byggsektorn i Sverige — och hur du löser den",
    titleEn: "The Skills Shortage in Sweden's Construction Sector — and How to Solve It",
    excerptSv: "Den svenska byggsektorn upplever en strukturell kompetensbrist. Agil Arbetskraft förklarar varför det händer, vilka roller som drabbas hårdast och hur bemanning kan vara lösningen.",
    excerptEn: "Sweden's construction sector faces a structural skills shortage. Agil Arbetskraft explains why it's happening, which roles are hardest hit, and how staffing can be the solution.",
    dateISO: "2026-04-12",
    author: "Johan Eriksson",
    heroImage: "https://agilarbetskraft.se/assets/industry-construction.jpg",
  },
  "recruiting-cleaning-staff-sweden": {
    titleSv: "Att rekrytera städpersonal i Sverige — krav, utmaningar och smarta lösningar",
    titleEn: "Recruiting Cleaning Staff in Sweden — Demands, Challenges, and Smart Solutions",
    excerptSv: "Hög personalomsättning och ökade kompetensskrav gör rekrytering av städpersonal svårare än det ser ut. Agil Arbetskraft hjälper dig hitta pålitliga kandidater snabbt.",
    excerptEn: "High turnover and increasing competency demands make recruiting cleaning staff harder than it looks. Agil Arbetskraft helps you find reliable candidates quickly.",
    dateISO: "2026-03-05",
    author: "Ebba Lindgren",
    heroImage: "https://agilarbetskraft.se/assets/industry-cleaning.jpg",
  },
};

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const meta = ARTICLE_STATIC[slug];
  if (!meta) return { title: "Artikel hittades inte" };

  return {
    title: meta.titleSv,
    description: meta.excerptSv,
    alternates: {
      canonical: `/articles/${slug}`,
      languages: { sv: `/articles/${slug}`, en: `/articles/${slug}` },
    },
    openGraph: {
      title: meta.titleSv,
      description: meta.excerptSv,
      type: "article",
      locale: "sv_SE",
      url: `https://agilarbetskraft.se/articles/${slug}`,
      images: [{ url: meta.heroImage, width: 1200, height: 630 }],
      publishedTime: meta.dateISO,
      authors: [meta.author],
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const meta = ARTICLE_STATIC[slug];
  if (!meta) notFound();

  /* ─── Article schema ─── */
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": meta.titleSv,
    "description": meta.excerptSv,
    "image": meta.heroImage,
    "datePublished": meta.dateISO,
    "author": {
      "@type": "Person",
      "name": meta.author,
      "worksFor": { "@type": "Organization", "name": "Agil Arbetskraft" }
    },
    "publisher": {
      "@type": "Organization",
      "name": "Agil Arbetskraft",
      "url": "https://agilarbetskraft.se",
      "logo": { "@type": "ImageObject", "url": "https://agilarbetskraft.se/assets/agil-logo.svg" }
    },
    "mainEntityOfPage": { "@type": "WebPage", "@id": `https://agilarbetskraft.se/articles/${slug}` },
    "inLanguage": "sv-SE"
  };

  /* ─── BreadcrumbList schema ─── */
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Hem", "item": "https://agilarbetskraft.se/" },
      { "@type": "ListItem", "position": 2, "name": "Artiklar", "item": "https://agilarbetskraft.se/articles" },
      { "@type": "ListItem", "position": 3, "name": meta.titleSv, "item": `https://agilarbetskraft.se/articles/${slug}` }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumbSchema) }}
      />
      <ArticleClientPage slug={slug} />
    </>
  );
}
