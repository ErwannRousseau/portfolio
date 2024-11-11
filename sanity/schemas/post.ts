import { Newspaper } from "lucide-react";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "post",
  title: "Post",
  type: "document",
  icon: Newspaper,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "localizedString",
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "localizedString",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    }),
    defineField({
      name: "mainImage",
      title: "Main image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
        },
      ],
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "localizedBlockContent",
    }),
    defineField({
      name: "likeCount",
      title: "Like Count",
      type: "number",
      initialValue: 0,
    }),
    defineField({
      name: "likedBy",
      title: "Liked By",
      type: "array",
      of: [{ type: "string" }],
      description: "List of users who liked this article",
    }),
  ],

  preview: {
    select: {
      title: "title.en",
      subtitle: "subtitle.en",
      media: "mainImage",
    },
    prepare(selection) {
      return { ...selection };
    },
  },
});
