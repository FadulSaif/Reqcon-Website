/**
 * Single source of truth for company-wide data.
 *
 * Every component, the SEO metadata, and the JSON-LD schema should import from
 * here instead of hardcoding contact details. This keeps the LocalBusiness data
 * that Google and AI engines read consistent across the whole site.
 */

export const SITE_CONFIG = {
  companyName: "Agil Arbetskraft",
  /** Swedish company registration number (organisationsnummer). */
  orgNumber: "559481-8485",
  /** Production domain — used for canonical URLs, sitemap, schema, OG tags. */
  domain: "https://agilarbetskraft.se",

  email: "info@agilarbetskraft.se",

  phone: "+46 70 554 81 47",
  /** E.164 for the tel: link — national 0 dropped, +46 prefixed. */
  phoneHref: "tel:+46705548147",

  address: {
    street: "Tullgårdsgatan 10A",
    postalCode: "116 68",
    city: "Stockholm",
    country: "Sverige",
    countryCode: "SE",
    /** Single-line form for display. */
    full: "Tullgårdsgatan 10A, 116 68 Stockholm, Sverige",
  },

  /**
   * Keyless Google Maps embed. Uses the address-query form so Google does the
   * geocoding — a hand-written `?pb=` string would bake in coordinates and a
   * place ID we cannot verify.
   */
  mapsEmbedUrl:
    "https://www.google.com/maps?q=Tullg%C3%A5rdsgatan+10A,+116+68+Stockholm,+Sverige&output=embed&hl=sv&z=16",

  openingHours: {
    weekdays: "08:00 - 17:00",
    /** Machine-readable for schema.org OpeningHoursSpecification. */
    opens: "08:00",
    closes: "17:00",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"] as const,
  },

  socials: {
    linkedin: "https://www.linkedin.com/company/agilarbetskraft-sverige-gf-ab/",
    facebook: "https://www.facebook.com/profile.php?id=61586557422822",
  },

  /** Static logo file for schema.org `logo`, OG/Twitter images, etc. */
  logoPath: "/assets/agil-logo.svg",
  /** Default Open Graph share image (existing asset). */
  ogImagePath: "/assets/it_staffing_hero.png",
} as const;

/** Absolute URL helper for schema / sitemap / OG. */
export function absoluteUrl(path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_CONFIG.domain}${clean}`;
}

/**
 * Open Graph / social-share image array for a page's `openGraph.images`.
 * Next.js does NOT inherit the layout's OG image once a page defines its own
 * `openGraph`, so every page must set this explicitly. Pass a page-specific
 * image (e.g. a service or article hero) or omit for the site default.
 */
export function ogImages(path: string = SITE_CONFIG.ogImagePath) {
  return [{ url: absoluteUrl(path), width: 1200, height: 630, alt: SITE_CONFIG.companyName }];
}
