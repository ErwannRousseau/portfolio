import { languages } from "@/i18n.config";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "localizedString",
  title: "Localized String",
  type: "object",
  fieldsets: [
    {
      title: "Translations",
      name: "translations",
      options: { collapsible: true, collapsed: false },
    },
  ],
  fields: languages.locales.map((lang) =>
    defineField({
      name: lang.id,
      title: lang.title,
      type: "string",
      fieldset: lang.isDefault ? undefined : "translations",
    }),
  ),
});
