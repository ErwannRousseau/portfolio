import type { MetadataRoute } from "next";
import { cacheLife, cacheTag } from "next/cache";
import { i18n } from "@/i18n.config";
import { loadPostSlugs } from "@/sanity/lib/store";

const BASE_URL = "https://erwannrousseau.dev";

function localizedUrls(path: string) {
  const urls = Object.fromEntries(
    i18n.locales.map((lang) => [lang, `${BASE_URL}/${lang}${path}`]),
  );

  return i18n.locales.map((lang) => ({
    url: urls[lang],
    alternates: { languages: urls },
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  "use cache";
  cacheLife("days");
  cacheTag("posts");
  const { data } = await loadPostSlugs();

  const staticSitemap = [
    ...localizedUrls("").map((entry) => ({
      ...entry,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
    })),
    ...localizedUrls("/blog").map((entry) => ({
      ...entry,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    })),
  ];

  const dynamicSitemap = data
    .filter((slug): slug is string => Boolean(slug))
    .flatMap((slug) =>
      localizedUrls(`/blog/${slug}`).map((entry) => ({
        ...entry,
        lastModified: new Date(),
        priority: 0.8,
      })),
    );

  return [...staticSitemap, ...dynamicSitemap];
}
