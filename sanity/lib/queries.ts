import { groq } from "next-sanity";

export const HOME_QUERY = groq`*[_type == "home"][0]{
    _id,
    title,
    "subtitle" : coalesce(
      subtitle[$lang], 
      subtitle[$defaultLocale]
    ),
    "overview" : coalesce(
      overview[$lang], 
      overview[$defaultLocale]
    ),
    profilePicture,
    projects[]{
      ..., 
      "description" : coalesce(
        description[$lang], 
        description[$defaultLocale]
      ),
    },
    works[]{
      ...,
      "tags": tags[]->{
        "name" : coalesce(
          name[$lang], 
          name[$defaultLocale]
        ),
        "color" : color.rgb
      },
      "job" : coalesce(
        job[$lang], 
        job[$defaultLocale]
      ),
    },
    skills
  }`;

export const BLOG_QUERY = groq`*[_type == "post" && defined(slug)]{
  "title" : coalesce(
    title[$lang], 
    title[$defaultLocale]
  ),
  "subtitle": coalesce(
    subtitle[$lang],
    subtitle[$defaultLocale]
  ),
  mainImage,
  slug,
}`;
