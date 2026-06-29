/**
 * Single source of truth for company-wide data.
 *
 * Every component, the SEO metadata, and the JSON-LD schema should import from
 * here instead of hardcoding contact details. This keeps the LocalBusiness data
 * that Google and AI engines read consistent across the whole site.
 *
 * NOTE FOR CLIENT: `phone` is currently a placeholder (+46 8 123 4567).
 * Replace it with the real company number before production launch.
 */

export const SITE_CONFIG = {
  companyName: "Agil Arbetskraft",
  /** Production domain — used for canonical URLs, sitemap, schema, OG tags. */
  domain: "https://agilarbetskraft.se",

  email: "info@agilarbetskraft.se",

  /** Placeholder — client to confirm the real number. */
  phone: "+46 8 123 4567",
  phoneHref: "tel:+4681234567",

  address: {
    street: "Kungsgatan 15",
    postalCode: "111 43",
    city: "Stockholm",
    country: "Sverige",
    countryCode: "SE",
    /** Single-line form for display. */
    full: "Kungsgatan 15, 111 43 Stockholm, Sverige",
  },

  /** Google Maps embed for the office (precise Kungsgatan 15 place embed). */
  mapsEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2035.0390234123515!2d18.06821817743516!3d59.33230621063688!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465f9d5c48b29f79%3A0xc3317f22312d8a0d!2sKungsgatan%2015%2C%20111%2043%20Stockholm!5e0!3m2!1sen!2sse!4v1716900000000!5m2!1sen!2sse",

  openingHours: {
    weekdays: "08:00 - 17:00",
    /** Machine-readable for schema.org OpeningHoursSpecification. */
    opens: "08:00",
    closes: "17:00",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"] as const,
  },

  socials: {
    linkedin: "https://www.linkedin.com/company/agil-arbetskraft",
    facebook: "https://www.facebook.com/agilarbetskraft",
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
