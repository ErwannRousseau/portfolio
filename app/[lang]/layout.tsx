import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import { toPlainText } from "next-sanity";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { AppProvider } from "@/components/provider/app-provider";
import { TailwindIndicator } from "@/components/utils/tailwind-indicator";
import { i18n } from "@/i18n.config";
import { getI18n } from "@/lib/locales/server";
import { cn } from "@/lib/utils";
import { SubjectivitySerif } from "@/public/font/serif/subjectivity";
import { urlForOpenGraphImage } from "@/sanity/lib/image";
import { loadHomePage } from "@/sanity/lib/store";
import "../globals.css";

export function generateStaticParams() {
  return i18n.locales.map((lang) => ({ lang }));
}

export async function generateMetadata(
  props: Readonly<{
    params: Promise<{ lang: string }>;
  }>,
): Promise<Metadata> {
  const { lang: rawLang } = await props.params;
  const lang =
    i18n.locales.find((locale) => locale === rawLang) ?? i18n.defaultLocale;
  const t = await getI18n();
  const { data } = await loadHomePage(lang);
  const ogImage = urlForOpenGraphImage(data?.profilePicture);

  return {
    title: `${data?.title} | ${data?.subtitle} ${t("Metadata.where")}`,
    description: data?.overview && toPlainText(data.overview),
    openGraph: {
      title: `${data?.title} | ${data?.subtitle} ${t("Metadata.where")}`,
      description: data?.overview ? toPlainText(data.overview) : undefined,
      url: "https://erwannrousseau.dev",
      siteName: `${data?.title} | ${data?.subtitle}`,
      images: ogImage,
      type: "website",
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang: rawLang } = await params;
  const lang =
    i18n.locales.find((locale) => locale === rawLang) ?? i18n.defaultLocale;

  return (
    <html lang={lang} suppressHydrationWarning>
      <body
        className={cn(
          "container bg-background font-geist-sans text-foreground antialiased",
          GeistSans.variable,
          SubjectivitySerif.variable,
          GeistMono.variable,
        )}
      >
        <AppProvider locale={lang}>
          <Header />
          {children}
          <Footer />
        </AppProvider>
        <SpeedInsights />
        <Analytics />
        <TailwindIndicator />
      </body>
    </html>
  );
}
