import HomePage from "@/components/pages/homepage";
import type { Locale } from "@/i18n.config";

import { loadHomePage } from "@/sanity/lib/store";
import dynamic from "next/dynamic";
import { draftMode } from "next/headers";
import { getDictionary } from "./dictionaries";

const HomePagePreview = dynamic(
  () => import("@/sanity/preview/homepage-preview"),
);

export default async function Home({
  params: { lang },
}: { params: { lang: Locale } }) {
  const initial = await loadHomePage(lang);
  const dict = await getDictionary(lang);

  if (draftMode().isEnabled) {
    return <HomePagePreview initial={initial} lang={lang} dict={dict} />;
  }

  return <HomePage data={initial.data} dict={dict} />;
}
