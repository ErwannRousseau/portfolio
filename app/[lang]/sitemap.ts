import type { MetadataRoute } from "next";
import { connection } from "next/server";
import { loadPostSlugs } from "@/sanity/lib/store";

const BASE_URL = "https://erwannrousseau.dev";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // TODO: Cache Components adoption. Added to unblock the build: remove this connection() to re-trigger the error and review the fix options.
  await connection();
  const { data } = await loadPostSlugs();

  const dynamicSitemap = data
    .filter((slug): slug is string => Boolean(slug))
    .map((slug) => ({
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
