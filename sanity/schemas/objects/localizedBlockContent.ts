import { languages } from "@/i18n.config";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "localizedBlockContent",
  title: "Localized String",
  type: "object",
  fieldsets: [
    {
      title: "Translations",
      name: "translations",
      options: { collapsible: true },
    },
  ],
  fields: languages.locales.map((lang) =>
    defineField({
      name: lang.id,
      title: lang.title,
      type: "blockContent",
      fieldset: lang.isDefault ? undefined : "translations",
    }),
  ),
});
