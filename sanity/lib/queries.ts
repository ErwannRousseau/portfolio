import { groq } from "next-sanity";

export const HOME_QUERY = groq`*[_type == "home"][0]{
    _id,
    title,
    "subtitle" : select(
      $lang == "fr" => coalesce(subtitle.fr, subtitle.en),
      subtitle.en
    ),
    "overview" : select(
      $lang == "fr" => coalesce(overview.fr, overview.en),
      overview.en
    ),
    profilePicture,
    projects[]{
      ..., 
      "description" : select(
        $lang == "fr" => coalesce(description.fr, description.en),
        description.en
      ),
    },
    works[]{
      ...,
      "tags": tags[]->{
        "name" : select(
          $lang == "fr" => coalesce(name.fr, name.en),
          name.en
        ),
        "color" : color.rgb
      },
      "job" : select(
        $lang == "fr" => coalesce(job.fr, job.en),
        job.en
      ),
    },
    skills
  }`;

export const BLOG_QUERY = groq`*[_type == "post" && defined(slug)] | order(publishedAt desc){
  "title" : select(
    $lang == "fr" => coalesce(title.fr, title.en),
    title.en
  ),
  "subtitle": select(
    $lang == "fr" => coalesce(subtitle.fr, subtitle.en),
    subtitle.en
  ),
  publishedAt,
  mainImage,
  slug,
}`;

export const POST_QUERY = groq`*[_type == "post" && slug.current == $slug][0]{
  ...,
  "title" : select(
    $lang == "fr" => coalesce(title.fr, title.en),
    title.en
  ),
  "subtitle": select(
    $lang == "fr" => coalesce(subtitle.fr, subtitle.en),
    subtitle.en
  ),
  "body" : select(
    $lang == "fr" => coalesce(body.fr, body.en),
    body.en
  ),
}`;

export const POST_BY_ID_QUERY = groq`*[_type == "post" && _id == $id][0]{
  likeCount,
  likedBy,
  slug
}`;

export const SLUGS_QUERY = groq`*[_type == "post" && defined(slug)].slug.current`;
