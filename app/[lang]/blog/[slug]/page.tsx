import PostPage from "@/components/pages/postpage";
import type { Locale } from "@/i18n.config";
import { loadPostPage } from "@/sanity/lib/store";
import dynamic from "next/dynamic";
import { draftMode } from "next/headers";

const PostPagePreview = dynamic(
  () => import("@/sanity/preview/postpage-preview"),
);

export default async function Post(props: {
  params: { slug: string; lang: Locale };
}) {
  const { params } = props;
  const { slug, lang } = params;
  const initial = await loadPostPage(slug, lang);

  if (draftMode().isEnabled) {
    return <PostPagePreview initial={initial} params={params} />;
  }

  return <PostPage post={initial.data} />;
}
