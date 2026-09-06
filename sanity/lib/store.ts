import * as queryStore from "@sanity/react-loader";
import { cacheLife, cacheTag } from "next/cache";
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
  loadE2EBlogPage,
  loadE2EHomePage,
  loadE2EPostSlugs,
} from "./e2e-fixtures";
import {
  BLOG_QUERY,
  HOME_QUERY,
  POST_BY_ID_QUERY,
  POST_QUERY,
  SLUGS_QUERY,
} from "./queries";

queryStore.setServerClient(client);

export const { loadQuery } = queryStore;

const useE2EFixtures = process.env.SANITY_E2E_FIXTURES === "true";

export async function loadHomePage(lang: Locale) {
  "use cache";
  cacheLife("days");
  cacheTag("home");
  if (useE2EFixtures) {
    return loadE2EHomePage(lang);
  }
  return await loadQuery<HOME_QUERY_RESULT>(HOME_QUERY, { lang });
}

export async function loadBlogPage(lang: Locale) {
  "use cache";
  cacheLife("days");
  cacheTag("blog");
  if (useE2EFixtures) {
    return loadE2EBlogPage();
  }
  return await loadQuery<BLOG_QUERY_RESULT>(BLOG_QUERY, { lang });
}

export async function loadPostPage(slug: string, lang: Locale) {
  "use cache";
  cacheLife("days");
  cacheTag(`post-${slug}`);
  return await loadQuery<POST_QUERY_RESULT>(
    POST_QUERY,
    { slug, lang },
    { tag: `post-${slug}` },
  );
}

export function loadPostLikes(id: string) {
  return loadQuery<POST_BY_ID_QUERY_RESULT>(POST_BY_ID_QUERY, { id });
}

export async function loadPostSlugs() {
  "use cache";
  cacheLife("days");
  cacheTag("posts");
  if (useE2EFixtures) {
    return loadE2EPostSlugs();
  }
  return await loadQuery<SLUGS_QUERY_RESULT>(SLUGS_QUERY);
}
