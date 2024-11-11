import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { ThemeProvider } from "@/components/provider/theme-provider";
import { TailwindIndicator } from "@/components/utils/tailwind-indicator";
import type { Locale } from "@/i18n.config";
import { I18nProviderClient } from "@/lib/locales/client";
import { getI18n } from "@/lib/locales/server";
import { cn } from "@/lib/utils";
import { SubjectivitySerif } from "@/public/font/serif/subjectivity";
import { urlForOpenGraphImage } from "@/sanity/lib/image";
import { loadHomePage } from "@/sanity/lib/store";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import { toPlainText } from "next-sanity";
import "../globals.css";

export async function generateMetadata({
  params,
}: Readonly<{
  params: { lang: Locale };
}>): Promise<Metadata> {
  const t = await getI18n();
  const { data } = await loadHomePage(params.lang);
  const ogImage = urlForOpenGraphImage(data?.profilePicture);

  return {
    title: `${data?.title} | ${data?.subtitle} ${t("Metadata.where")}`,
    description: data?.overview && toPlainText(data.overview),
    icons: {
      icon: [
        { url: "https://erwannrousseau.dev/favicon.ico", type: "image/x-icon" },
        new URL("/apple-touch-icon.png", "https://erwannrousseau.dev"),
      ],
      shortcut: "/favicon.ico",
      apple: [
        { url: "/apple-touch-icon.png" },
        { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      ],
    },
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

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: Locale };
}>) {
  return (
    <html lang={params.lang} suppressHydrationWarning>
      <body
        className={cn(
          "m-auto min-h-dvh max-w-4xl bg-background font-sans text-foreground antialiased",
          GeistSans.variable,
          SubjectivitySerif.variable,
          GeistMono.variable,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <I18nProviderClient locale={params.lang}>
            <Header />
            {children}
            <Footer />
          </I18nProviderClient>
          <SpeedInsights />
          <Analytics />
        </ThemeProvider>
        <TailwindIndicator />
      </body>
    </html>
  );
}
