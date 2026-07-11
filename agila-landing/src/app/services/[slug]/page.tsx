import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceDetailPage from "@/components/ServiceDetailPage";
import { SERVICES_CONFIG } from "@/lib/services-data";
import { translations } from "@/lib/translations";
import { SITE_CONFIG, ogImages } from "@/lib/site-config";

/* ─── Safe JSON-LD serializer ─── */
function safeJsonLd(data: object): string {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
}

/* ─── Per-service SEO metadata ─── */
const SERVICE_META: Record<string, { titleSv: string; titleEn: string; descSv: string; descEn: string }> = {
  it: {
    titleSv: "IT-bemanning & IT-rekrytering i Sverige",
    titleEn: "IT Staffing & IT Recruitment in Sweden",
    descSv: "Agil Arbetskraft rekryterar och bemannar IT-specialister i hela Sverige: systemutvecklare, UX-designers, Scrum Masters, projektledare och IT-arkitekter. Kontakta oss för snabb leverans.",
    descEn: "Agil Arbetskraft recruits and staffs IT specialists across Sweden: systems developers, UX designers, Scrum Masters, project managers, and IT architects. Contact us for fast delivery.",
  },
  logistics: {
    titleSv: "Lager- & logistikbemanning i Sverige",
    titleEn: "Warehouse & Logistics Staffing in Sweden",
    descSv: "Vi bemannar och rekryterar lager- och logistikpersonal för svenska företag: lagerarbetare, truckförare, terminalarbetare och logistikchefer. Snabb leverans i hela Sverige.",
    descEn: "We staff and recruit warehouse and logistics personnel for Swedish companies: warehouse workers, forklift operators, terminal workers, and logistics managers. Fast delivery across Sweden.",
  },
  construction: {
    titleSv: "Byggbemanning & rekrytering i Sverige",
    titleEn: "Construction Staffing & Recruitment in Sweden",
    descSv: "Agil Arbetskraft levererar yrkeskvalificerade byggarbetare och platschefer till svenska byggföretag: snickare, betongarbetare, maskinförare och arbetsledare.",
    descEn: "Agil Arbetskraft delivers qualified construction workers and site managers to Swedish construction companies: carpenters, concrete workers, machine operators, and supervisors.",
  },
  transport: {
    titleSv: "Transportbemanning & chaufförsrekrytering i Sverige",
    titleEn: "Transport Staffing & Driver Recruitment in Sweden",
    descSv: "Vi rekryterar och bemannar chaufförer och transportpersonal för svenska företag: B-, C- och CE-chaufförer, ADR-chaufförer, distributionschaufförer och fjärrchaufförer.",
    descEn: "We recruit and staff drivers and transport personnel for Swedish companies: B, C, and CE drivers, ADR drivers, distribution drivers, and long-distance drivers.",
  },
  moving: {
    titleSv: "Flytt- och montagebemanning i Sverige",
    titleEn: "Moving & Assembly Staffing in Sweden",
    descSv: "Vi bemannar flyttpersonal, montörer och arbetsledare för flytt- och montageuppdrag i Sverige. Pålitlig personal för både korta och längre uppdrag.",
    descEn: "We staff moving personnel, installers, and supervisors for moving and assembly assignments in Sweden. Reliable staff for both short and longer assignments.",
  },
};

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES_CONFIG[slug];
  if (!service) return { title: "Tjänst hittades inte" };

  const meta = SERVICE_META[slug];
  const svTitle = meta?.titleSv ?? (translations["sv"][`services.${slug}.title`] || slug);
  const svDesc = meta?.descSv ?? (translations["sv"][`services.${slug}.cardDesc`] || "");

  return {
    title: svTitle,
    description: svDesc,
    alternates: {
      canonical: `/services/${slug}`,
    },
    openGraph: {
      title: `${svTitle} – Agil Arbetskraft`,
      description: svDesc,
      type: "website",
      locale: "sv_SE",
      url: `${SITE_CONFIG.domain}/services/${slug}`,
      images: ogImages(service.image),
    },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = SERVICES_CONFIG[slug];
  if (!data) notFound();

  const meta = SERVICE_META[slug];
  const svTitle = meta?.titleSv ?? translations["sv"][`services.${slug}.title`] ?? slug;
  const svDesc = meta?.descSv ?? translations["sv"][`services.${slug}.cardDesc`] ?? "";

  /* ─── Service schema ─── */
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": svTitle,
    "description": svDesc,
    "provider": {
      "@type": "Organization",
      "name": "Agil Arbetskraft",
      "url": "https://agilarbetskraft.se"
    },
    "areaServed": { "@type": "Country", "name": "Sverige" },
    "availableChannel": {
      "@type": "ServiceChannel",
      "serviceUrl": `https://agilarbetskraft.se/services/${slug}`,
      "servicePhone": "+46-8-123-4567"
    }
  };

  /* ─── BreadcrumbList schema ─── */
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Hem", "item": "https://agilarbetskraft.se/" },
      { "@type": "ListItem", "position": 2, "name": "Tjänster", "item": "https://agilarbetskraft.se/services" },
      { "@type": "ListItem", "position": 3, "name": svTitle, "item": `https://agilarbetskraft.se/services/${slug}` }
    ]
  };

  /* ─── FAQPage schema (only for services that have FAQ data) ─── */
  const faqSchema = data.faq?.sv
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": data.faq.sv.map((item) => ({
          "@type": "Question",
          "name": item.q,
          "acceptedAnswer": { "@type": "Answer", "text": item.a }
        }))
      }
    : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonLd(faqSchema) }}
        />
      )}
      <ServiceDetailPage slug={slug} />
    </>
  );
}
