import { Home } from "lucide-react";
import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "home",
  title: "Home",
  type: "document",
  icon: Home,
  groups: [
    {
      name: "hero",
      title: "Hero",
    },
    {
      name: "projects",
      title: "Projects",
    },
    {
      name: "works",
      title: "Works",
    },
    {
      name: "skills",
      title: "Skills",
    },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
      group: "hero",
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "localizedString",
      validation: (rule) => rule.required(),
      group: "hero",
    }),
    defineField({
      name: "profilePicture",
      title: "Profile Picture",
      type: "image",
      validation: (rule) => rule.required(),
      options: {
        hotspot: true,
      },
      group: "hero",
    }),
    defineField({
      name: "overview",
      description:
        "Used for <meta> description tag, and the portfolio overview.",
      title: "Overview",
      type: "localizedBlockContent",
      validation: (rule) => rule.required(),
      group: "hero",
    }),
    defineField({
      name: "projects",
      title: "Projects",
      type: "array",
      of: [defineArrayMember({ type: "projects" })],
      validation: (rule) => rule.required(),
      group: "projects",
    }),
    defineField({
      name: "works",
      title: "Works",
      type: "array",
      of: [defineArrayMember({ type: "works" })],
      validation: (rule) => rule.required(),
      group: "works",
    }),
    defineField({
      name: "skills",
      title: "Skills",
      type: "array",
      of: [defineArrayMember({ type: "skills" })],
      validation: (rule) => rule.required(),
      group: "skills",
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
