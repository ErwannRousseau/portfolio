"use client";

import PostPage from "@/components/pages/postpage";
import { type Locale, i18n } from "@/i18n.config";
import type { POST_QUERYResult } from "@/sanity.types";
import { POST_QUERY } from "@/sanity/lib/queries";
import { type QueryResponseInitial, useQuery } from "@sanity/react-loader";

type BlogPagePreviewProps = {
  initial: QueryResponseInitial<POST_QUERYResult>;
  params: { slug: string; lang: Locale };
};

export default function PostPagePreview({
  initial,
  params: { lang, slug },
}: BlogPagePreviewProps) {
  const { data, encodeDataAttribute } = useQuery(
    POST_QUERY,
    { lang, slug, defaultLocale: i18n.defaultLocale },
    { initial },
  );

  return <PostPage post={data} encodeDataAttribute={encodeDataAttribute} />;
}
