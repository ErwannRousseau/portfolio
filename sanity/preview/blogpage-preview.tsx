"use client";

import type { getDictionary } from "@/app/[lang]/dictionaries";
import BlogPage from "@/components/pages/blogpage";
import { type Locale, i18n } from "@/i18n.config";
import type { BLOG_QUERYResult } from "@/sanity.types";
import { BLOG_QUERY } from "@/sanity/lib/queries";
import { type QueryResponseInitial, useQuery } from "@sanity/react-loader";

type BlogPagePreviewProps = {
  initial: QueryResponseInitial<BLOG_QUERYResult>;
  lang: Locale;
  dict: Awaited<ReturnType<typeof getDictionary>>["Blog"];
};

export default function BlogPagePreview({
  initial,
  lang,
  dict,
}: BlogPagePreviewProps) {
  const { data, encodeDataAttribute } = useQuery(
    BLOG_QUERY,
    { lang, defaultLocale: i18n.defaultLocale },
    { initial },
  );

  return (
    <BlogPage
      posts={data}
      encodeDataAttribute={encodeDataAttribute}
      title={dict}
      lang={lang}
    />
  );
}
