import { groq } from "next-sanity";

export const HOME_QUERY = groq`*[_type == "home"][0]{
    _id,
    title,
    "subtitle" : coalesce(
      subtitle[$lang], 
      subtitle[$defaultLocale]
    ),
    "overview" : coalesce(
      overview["fr"], 
      overview["en"]
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
