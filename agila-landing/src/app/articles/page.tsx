import type { Metadata } from "next";
import ArticlesListPage from "@/components/ArticlesListPage";
import { ARTICLES } from "@/lib/articles-data";
import { SITE_CONFIG, absoluteUrl, ogImages } from "@/lib/site-config";

/* ─── Safe JSON-LD serializer ─── */
function safeJsonLd(data: object): string {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
}

export const metadata: Metadata = {
  title: "Artiklar & branschinsikter – bemanning och rekrytering i Sverige",
  description:
    "Läs artiklar och branschinsikter från Agil Arbetskraft om bemanning och rekrytering inom IT, bygg, logistik, transport och städ i Sverige.",
  alternates: {
    canonical: "/articles",
  },
  openGraph: {
    title: "Artiklar & branschinsikter – Agil Arbetskraft",
    description:
      "Insikter om bemanning och rekrytering inom IT, bygg, logistik, transport och städ i Sverige.",
    type: "website",
    locale: "sv_SE",
    url: absoluteUrl("/articles"),
    images: ogImages(),
  },
};

export default function ArticlesIndex() {
  /* CollectionPage + ItemList schema listing all articles. */
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Artiklar & branschinsikter",
    "url": absoluteUrl("/articles"),
    "isPartOf": { "@type": "WebSite", "name": SITE_CONFIG.companyName, "url": SITE_CONFIG.domain },
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": ARTICLES.map((a, i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "url": absoluteUrl(`/articles/${a.slug}`),
      })),
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Hem", "item": absoluteUrl("/") },
      { "@type": "ListItem", "position": 2, "name": "Artiklar", "item": absoluteUrl("/articles") },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumbSchema) }}
      />
      <ArticlesListPage />
    </>
  );
}
