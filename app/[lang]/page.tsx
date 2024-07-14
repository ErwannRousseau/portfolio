import HomePage from "@/components/pages/homepage";
import type { Locale } from "@/i18n.config";
import { loadHomePage } from "@/sanity/lib/store";
import { setStaticParamsLocale } from "next-international/server";
import dynamic from "next/dynamic";
import { draftMode } from "next/headers";

const HomePagePreview = dynamic(
  () => import("@/sanity/preview/homepage-preview"),
);

export default async function Home({
  params: { lang },
}: { params: { lang: Locale } }) {
  setStaticParamsLocale(lang);
  const initial = await loadHomePage(lang);
  if (draftMode().isEnabled) {
    return <HomePagePreview initial={initial} lang={lang} />;
  }

  return <HomePage data={initial.data} />;
}
