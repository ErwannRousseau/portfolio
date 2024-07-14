export const i18n = {
  locales: ["en", "fr"],
  defaultLocale: "en",
} as const;

export type Locale = (typeof i18n)["locales"][number];

// Usefull for Sanity Studio
export const languages = {
  locales: [
    { id: "en", title: "English", isDefault: true },
    { id: "fr", title: "French" },
  ],
  defaultLocale: "en",
};
