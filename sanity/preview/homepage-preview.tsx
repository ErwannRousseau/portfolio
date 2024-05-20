"use client";

import type { getDictionary } from "@/app/[lang]/dictionaries";
import HomePage from "@/components/pages/homepage";
import { type Locale, i18n } from "@/i18n.config";
import type { HOME_QUERYResult } from "@/sanity.types";
import { HOME_QUERY } from "@/sanity/lib/queries";
import { type QueryResponseInitial, useQuery } from "@sanity/react-loader";

type HomePagePreviewProps = {
  initial: QueryResponseInitial<HOME_QUERYResult>;
  lang: Locale;
  dict: Awaited<ReturnType<typeof getDictionary>>;
};

export default function HomePagePreview({
  initial,
  lang,
  dict,
}: HomePagePreviewProps) {
  const { data, encodeDataAttribute } = useQuery(
    HOME_QUERY,
    { lang, defaultLocale: i18n.defaultLocale },
    { initial },
  );

  return (
    <HomePage
      data={data}
      encodeDataAttribute={encodeDataAttribute}
      dict={dict}
    />
  );
}
