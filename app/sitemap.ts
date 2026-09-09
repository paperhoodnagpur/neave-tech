import type { MetadataRoute } from "next";
import { services } from "@/lib/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.neave.tech";

  return [
    { url: base, lastModified: new Date(), priority: 1 },
    { url: `${base}/services`, lastModified: new Date(), priority: 0.9 },
    { url: `${base}/contact`, lastModified: new Date(), priority: 0.9 },
    { url: `${base}/privacy`, lastModified: new Date(), priority: 0.5 },
    ...services.map((s) => ({
      url: `${base}/services/${s.slug}`,
      lastModified: new Date(),
      priority: 0.8,
    })),
  ];
}