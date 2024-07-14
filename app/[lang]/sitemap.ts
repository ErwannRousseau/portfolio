import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://erwannrousseau.dev",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: {
          en: "https://erwannrousseau.dev/en",
          fr: "https://erwannrousseau.dev/fr",
        },
      },
    },
    {
      url: "https://erwannrousseau.dev/blog",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
      alternates: {
        languages: {
          en: "https://erwannrousseau.dev/en/blog",
          fr: "https://erwannrousseau.dev/fr/blog",
        },
      },
    },
  ];
}
