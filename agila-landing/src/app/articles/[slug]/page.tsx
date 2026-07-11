import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArticleClientPage from "@/components/ArticleClientPage";
import { ARTICLES } from "@/lib/articles-data";
import { SITE_CONFIG, absoluteUrl, ogImages } from "@/lib/site-config";

/* ─── Safe JSON-LD serializer ─── */
function safeJsonLd(data: object): string {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const article = ARTICLES.find((a) => a.slug === slug);
  if (!article) return { title: "Artikel hittades inte" };

  return {
    title: article.page.titleSv,
    description: article.page.metaDescSv,
    alternates: {
      canonical: `/articles/${slug}`,
    },
    openGraph: {
      title: article.page.titleSv,
      description: article.page.metaDescSv,
      type: "article",
      locale: "sv_SE",
      url: `${SITE_CONFIG.domain}/articles/${slug}`,
      images: ogImages(article.image),
      publishedTime: article.dateISO,
      authors: [article.page.author],
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = ARTICLES.find((a) => a.slug === slug);
  if (!article) notFound();

  const heroImage = absoluteUrl(article.image);

  /* ─── Article schema ─── */
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.page.titleSv,
    "description": article.page.metaDescSv,
    "image": heroImage,
    "datePublished": article.dateISO,
    "author": {
      "@type": "Person",
      "name": article.page.author,
      "worksFor": { "@type": "Organization", "name": SITE_CONFIG.companyName }
    },
    "publisher": {
      "@type": "Organization",
      "name": SITE_CONFIG.companyName,
      "url": SITE_CONFIG.domain,
      "logo": { "@type": "ImageObject", "url": absoluteUrl(SITE_CONFIG.logoPath) }
    },
    "mainEntityOfPage": { "@type": "WebPage", "@id": `${SITE_CONFIG.domain}/articles/${slug}` },
    "inLanguage": "sv-SE"
  };

  /* ─── BreadcrumbList schema ─── */
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Hem", "item": `${SITE_CONFIG.domain}/` },
      { "@type": "ListItem", "position": 2, "name": "Artiklar", "item": `${SITE_CONFIG.domain}/articles` },
      { "@type": "ListItem", "position": 3, "name": article.page.titleSv, "item": `${SITE_CONFIG.domain}/articles/${slug}` }
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
