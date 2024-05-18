export const i18n = {
  defaultLocale: "en",
  locales: ["en", "fr"],
} as const;

export const languages = {
  locales: [
    { id: "en", title: "English", isDefault: true },
    { id: "fr", title: "French" },
  ],
  defaultLocale: "en",
};

export type Locale = (typeof i18n)["locales"][number];
