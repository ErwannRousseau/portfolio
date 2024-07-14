import BlogPage from "@/components/pages/blogpage";
import type { Locale } from "@/i18n.config";
import { loadBlogPage } from "@/sanity/lib/store";
import { setStaticParamsLocale } from "next-international/server";
import dynamic from "next/dynamic";
import { draftMode } from "next/headers";

const BlogPagePreview = dynamic(
  () => import("@/sanity/preview/blogpage-preview"),
);

export default async function Blog({
  params: { lang },
}: { params: { lang: Locale } }) {
  setStaticParamsLocale(lang);
  const initial = await loadBlogPage(lang);

  if (draftMode().isEnabled) {
    return <BlogPagePreview initial={initial} lang={lang} />;
  }

  return <BlogPage posts={initial.data} />;
}
