import BlogPage from "@/components/pages/blogpage";
import type { Locale } from "@/i18n.config";
import { loadBlogPage } from "@/sanity/lib/store";

// const BlogPagePreview = dynamic(
//   () => import("@/sanity/preview/blogpage-preview"),
// );

export default async function Blog({
  params: { lang },
}: { params: { lang: Locale } }) {
  const initial = await loadBlogPage(lang);

  // if (draftMode().isEnabled) {
  //   return <BlogPagePreview initial={initial} lang={lang} />;
  // }

  return <BlogPage posts={initial.data} />;
}
