import type { Metadata } from "next";
import ServicesPage from "@/components/ServicesPage";
import { SERVICES_CONFIG } from "@/lib/services-data";
import { translations } from "@/lib/translations";
import { SITE_CONFIG, absoluteUrl, ogImages } from "@/lib/site-config";

/* ─── Safe JSON-LD serializer ─── */
function safeJsonLd(data: object): string {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
}

export const metadata: Metadata = {
  title: "Våra tjänster – bemanning & rekrytering inom IT, bygg, logistik och transport",
  description:
    "Agil Arbetskraft erbjuder bemanning och rekrytering inom fem branscher: IT, bygg och anläggning, lager och logistik, transport samt flytt och montage. Snabb leverans i hela Sverige.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Våra tjänster – Agil Arbetskraft | bemanning i Sverige",
    description:
      "Fem specialiserade tjänsteområden. En partner. Vi levererar rätt personal till ditt företag oavsett bransch.",
    type: "website",
    locale: "sv_SE",
    url: absoluteUrl("/services"),
    images: ogImages(),
  },
};

export default function Services() {
  /* ItemList of the five service categories, so Google understands this hub. */
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Våra tjänster",
    "url": absoluteUrl("/services"),
    "isPartOf": { "@type": "WebSite", "name": SITE_CONFIG.companyName, "url": SITE_CONFIG.domain },
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": Object.keys(SERVICES_CONFIG).map((slug, i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "name": translations["sv"][`services.${slug}.title`] ?? slug,
        "url": absoluteUrl(`/services/${slug}`),
      })),
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Hem", "item": absoluteUrl("/") },
      { "@type": "ListItem", "position": 2, "name": "Tjänster", "item": absoluteUrl("/services") },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumbSchema) }}
      />
      <ServicesPage />
    </>
  );
}
