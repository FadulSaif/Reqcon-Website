import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/theme-provider";
import { LanguageProvider } from "../contexts/LanguageContext";
import StyledJsxRegistry from "../components/StyledJsxRegistry";
import { SITE_CONFIG, absoluteUrl } from "../lib/site-config";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// Interim stand-in for Konnect, which is licensed and not yet supplied by the
// client. Geometric sans, closest free match. Konnect precedes it in the
// --font-brand/--font-body stacks, so it takes over once the files land.
const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: {
    default: "Agil Arbetskraft – Bemanningsföretag i Sverige",
    template: "%s – Agil Arbetskraft",
  },
  description:
    "Agil Arbetskraft är ett bemannings- och rekryteringsföretag i Sverige. Vi hjälper företag inom IT, bygg, lager och logistik, transport samt flytt och montage att hitta rätt personal, snabbt och tillförlitligt.",
  keywords: [
    "bemanningsföretag", "bemanningsföretag Sverige", "rekrytering", "bemanning",
    "IT-bemanning", "IT-rekrytering", "bemanningsföretag Stockholm",
    "bemanningsföretag Göteborg", "lager bemanning", "bygg bemanning",
    "transport rekrytering", "Agil Arbetskraft",
  ],
  authors: [{ name: SITE_CONFIG.companyName }],
  creator: SITE_CONFIG.companyName,
  publisher: SITE_CONFIG.companyName,
  metadataBase: new URL(SITE_CONFIG.domain),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    siteName: SITE_CONFIG.companyName,
    title: "Agil Arbetskraft – Bemanningsföretag i Sverige",
    description:
      "Vi hjälper svenska företag att hitta rätt personal inom IT, bygg, lager och logistik, transport samt flytt och montage.",
    type: "website",
    locale: "sv_SE",
    url: SITE_CONFIG.domain,
    images: [{ url: SITE_CONFIG.ogImagePath, width: 1200, height: 630, alt: "Agil Arbetskraft" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Agil Arbetskraft – Bemanningsföretag i Sverige",
    description: "Bemannings- och rekryteringsföretag. IT, bygg, logistik och transport i hela Sverige.",
    images: [SITE_CONFIG.ogImagePath],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

/* ─── Safe JSON-LD serializer (escapes < > & to prevent script-tag injection) ─── */
function safeJsonLd(data: object): string {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
}

/* ─── Organization + LocalBusiness schema (site-wide) ─── */
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness"],
  "name": SITE_CONFIG.companyName,
  "alternateName": "Agila",
  "url": SITE_CONFIG.domain,
  "logo": absoluteUrl(SITE_CONFIG.logoPath),
  "image": absoluteUrl(SITE_CONFIG.ogImagePath),
  "description": "Agil Arbetskraft är ett bemannings- och rekryteringsföretag med verksamhet i hela Sverige. Vi specialiserar oss på IT, bygg, lager och logistik, transport samt flytt och montage.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": SITE_CONFIG.address.street,
    "addressLocality": SITE_CONFIG.address.city,
    "postalCode": SITE_CONFIG.address.postalCode,
    "addressCountry": SITE_CONFIG.address.countryCode
  },
  "telephone": SITE_CONFIG.phone,
  "email": SITE_CONFIG.email,
  "areaServed": {
    "@type": "Country",
    "name": "Sverige"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [...SITE_CONFIG.openingHours.days],
      "opens": SITE_CONFIG.openingHours.opens,
      "closes": SITE_CONFIG.openingHours.closes
    }
  ],
  "knowsAbout": [
    "IT-bemanning", "IT-rekrytering", "Byggbemanning", "Logistikbemanning",
    "Transportbemanning", "Flytt och montage", "Direktrekrytering",
    "Hyrköp av personal", "Bemanningslösningar Sverige"
  ],
  "sameAs": [
    SITE_CONFIG.socials.linkedin,
    SITE_CONFIG.socials.facebook
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Bemannings- och rekryteringstjänster",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "IT-bemanning och rekrytering" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Byggbemanning och rekrytering" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Lager- och logistikbemanning" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Transportbemanning och rekrytering" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Flytt- och montagebemanning" } }
    ]
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sv" suppressHydrationWarning>
      <head>
        {/* Swedish-only site (English is a client-side translation toggle, not a
            separately indexed URL), so no hreflang — just the canonical in metadata. */}

        {/* Organization + LocalBusiness schema — content is hardcoded, safeJsonLd escapes <>/& */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonLd(organizationSchema) }}
        />

        {/* TODO: Client must supply licensed Konnect woff2 files (400/500/600/700).
            Drop them in, add a next/font/local block exposing --font-konnect, and
            Outfit stops being used — no other change needed. */}
      </head>
      <body className={`${inter.variable} ${outfit.variable} antialiased`}>
        <StyledJsxRegistry>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <LanguageProvider>
              {children}
            </LanguageProvider>
          </ThemeProvider>
        </StyledJsxRegistry>
      </body>
    </html>
  );
}
