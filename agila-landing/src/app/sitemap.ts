import type { MetadataRoute } from "next";
import { SERVICES_CONFIG } from "@/lib/services-data";
import { ARTICLES } from "@/lib/articles-data";
import { absoluteUrl } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Static, top-level pages.
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: absoluteUrl("/services"), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/about"), lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: absoluteUrl("/contact"), lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    { url: absoluteUrl("/articles"), lastModified: now, changeFrequency: "weekly", priority: 0.7 },
  ];

  // One entry per service category.
  const serviceRoutes: MetadataRoute.Sitemap = Object.keys(SERVICES_CONFIG).map((slug) => ({
    url: absoluteUrl(`/services/${slug}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // One entry per article (dated).
  const articleRoutes: MetadataRoute.Sitemap = ARTICLES.map((a) => ({
    url: absoluteUrl(`/articles/${a.slug}`),
    lastModified: new Date(a.dateISO),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...serviceRoutes, ...articleRoutes];
}
