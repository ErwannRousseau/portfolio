import * as queryStore from "@sanity/react-loader";

import type { Locale } from "@/i18n.config";
import { i18n } from "@/i18n.config";
import type {
  BLOG_QUERYResult,
  HOME_QUERYResult,
  POST_QUERYResult,
} from "@/sanity.types";
import { client } from "@/sanity/lib/client";
import { token } from "@/sanity/lib/token";
import { BLOG_QUERY, HOME_QUERY, POST_QUERY, SLUGS_QUERY } from "./queries";

queryStore.setServerClient(client.withConfig({ token }));

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

export function loadPostSlugs() {
  return loadQuery<string[]>(SLUGS_QUERY);
}
