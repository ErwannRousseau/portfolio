import * as queryStore from "@sanity/react-loader";
import type { Locale } from "@/i18n.config";
import { client } from "@/sanity/lib/client";
import type {
  BLOG_QUERY_RESULT,
  HOME_QUERY_RESULT,
  POST_BY_ID_QUERY_RESULT,
  POST_QUERY_RESULT,
  SLUGS_QUERY_RESULT,
} from "@/sanity.types";
import {
  BLOG_QUERY,
  HOME_QUERY,
  POST_BY_ID_QUERY,
  POST_QUERY,
  SLUGS_QUERY,
} from "./queries";

queryStore.setServerClient(client);

export const { loadQuery } = queryStore;

export function loadHomePage(lang: Locale) {
  return loadQuery<HOME_QUERY_RESULT>(HOME_QUERY, { lang });
}

export function loadBlogPage(lang: Locale) {
  return loadQuery<BLOG_QUERY_RESULT>(BLOG_QUERY, { lang });
}

export function loadPostPage(slug: string, lang: Locale) {
  return loadQuery<POST_QUERY_RESULT>(
    POST_QUERY,
    { slug, lang },
    { tag: `post-${slug}` },
  );
}

export function loadPostLikes(id: string) {
  return loadQuery<POST_BY_ID_QUERY_RESULT>(POST_BY_ID_QUERY, { id });
}

export function loadPostSlugs() {
  return loadQuery<SLUGS_QUERY_RESULT>(SLUGS_QUERY);
}
