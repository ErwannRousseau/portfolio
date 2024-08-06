import { loadPostSlugs } from "@/sanity/lib/store";
import type { MetadataRoute } from "next";

const BASE_URL = "https://erwannrousseau.dev";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { data } = await loadPostSlugs();

  const dynamicSitemap = data.map((slug) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: new Date(),
    priority: 0.8,
    alternates: {
      languages: {
        en: `${BASE_URL}/en/blog/${slug}`,
        fr: `${BASE_URL}/fr/blog/${slug}`,
      },
    },
  }));

  const staticSitemap = [
    {
      url: `${BASE_URL}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: {
          en: `${BASE_URL}/en`,
          fr: `${BASE_URL}/fr`,
        },
      },
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
      alternates: {
        languages: {
          en: `${BASE_URL}/en/blog`,
          fr: `${BASE_URL}/fr/blog`,
        },
      },
    },
  ];

  return [...staticSitemap, ...dynamicSitemap];
}
