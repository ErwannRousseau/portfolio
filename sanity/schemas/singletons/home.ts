import { Home } from "lucide-react";
import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "home",
  title: "Home",
  type: "document",
  icon: Home,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "localizedString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "profilePicture",
      title: "Profile Picture",
      type: "image",
      validation: (rule) => rule.required(),
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "overview",
      description:
        "Used for <meta> description tag, and the portfolio overview.",
      title: "Overview",
      type: "localizedBlockContent",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "projects",
      title: "Projects",
      type: "array",
      of: [defineArrayMember({ type: "projects" })],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "works",
      title: "Works",
      type: "array",
      of: [defineArrayMember({ type: "works" })],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "skills",
      title: "Skills",
      type: "array",
      of: [defineArrayMember({ type: "skills" })],
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        subtitle: "Home",
        title,
      };
    },
  },
});
