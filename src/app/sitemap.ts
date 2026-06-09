import type { MetadataRoute } from "next";
import { COLORING_PAGES } from "@/lib/data/coloring-pages";
import { absoluteUrl, getSiteUrl } from "@/lib/seo/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: getSiteUrl(),
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/gallery"),
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/my-art"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  const colorRoutes: MetadataRoute.Sitemap = COLORING_PAGES.map((page) => ({
    url: absoluteUrl(`/color/${page.id}`),
    lastModified,
    changeFrequency: "monthly" as const,
    priority: page.popular ? 0.85 : 0.75,
  }));

  return [...staticRoutes, ...colorRoutes];
}
