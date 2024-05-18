import { Tags } from "lucide-react";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "tags",
  title: "Tags",
  type: "document",
  icon: Tags,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "localizedString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "color",
      title: "Color",
      type: "color",
      options: {
        disableAlpha: true,
      },
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "name.en",
    },
    prepare(select) {
      const { title } = select;
      return {
        title,
      };
    },
  },
});
