import BlogPage from "@/components/pages/blogpage";
import type { Locale } from "@/i18n.config";
import { loadBlogPage } from "@/sanity/lib/store";
import dynamic from "next/dynamic";
import { draftMode } from "next/headers";
import { getDictionary } from "../dictionaries";

const BlogPagePreview = dynamic(
  () => import("@/sanity/preview/blogpage-preview"),
);

export default async function Blog({
  params: { lang },
}: { params: { lang: Locale } }) {
  const initial = await loadBlogPage(lang);
  const dict = await getDictionary(lang);

  if (draftMode().isEnabled) {
    return <BlogPagePreview initial={initial} lang={lang} dict={dict.Blog} />;
  }

  return <BlogPage posts={initial.data} title={dict.Blog} />;
}
