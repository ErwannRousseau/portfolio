import type { Locale } from "@/i18n.config";
import { i18n } from "@/i18n.config";
import type {
  BLOG_QUERYResult,
  HOME_QUERYResult,
  POST_BY_ID_QUERYResult,
  POST_QUERYResult,
  SLUGS_QUERYResult,
} from "@/sanity.types";
import { client } from "@/sanity/lib/client";
import * as queryStore from "@sanity/react-loader";
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
  return loadQuery<HOME_QUERYResult>(HOME_QUERY, {
    lang,
    defaultLocale: i18n.defaultLocale,
  });
}

export function loadBlogPage(lang: Locale) {
  return loadQuery<BLOG_QUERYResult>(BLOG_QUERY, {
    lang,
    defaultLocale: i18n.defaultLocale,
  });
}

export function loadPostPage(slug: string, lang: Locale) {
  return loadQuery<POST_QUERYResult>(POST_QUERY, {
    slug,
    lang,
    defaultLocale: i18n.defaultLocale,
  });
}

export function loadPostLikes(id: string) {
  return loadQuery<POST_BY_ID_QUERYResult>(POST_BY_ID_QUERY, { id });
}

export function loadPostSlugs() {
  return loadQuery<SLUGS_QUERYResult>(SLUGS_QUERY);
}
