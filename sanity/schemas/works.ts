import { BriefcaseBusiness } from "lucide-react";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "works",
  title: "Works",
  type: "object",
  icon: BriefcaseBusiness,
  fields: [
    defineField({
      name: "icon",
      title: "Icon (.svg)",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "job",
      title: "Job",
      type: "localizedString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "duration",
      title: "Duration",
      type: "duration",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "link",
      title: "Link",
      type: "url",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "reference", to: [{ type: "tags" }] }],
      validation: (rule) => rule.required(),
    }),
  ],
});
