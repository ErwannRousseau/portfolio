import { ThemeProvider } from "@/components/provider/theme-provider";
import { TailwindIndicator } from "@/components/utils/tailwind-indicator";
import { type Locale, i18n } from "@/i18n.config";
import { cn } from "@/lib/utils";
import { SubjectivitySerif } from "@/public/font/serif/subjectivity";
import { urlForOpenGraphImage } from "@/sanity/lib/image";
import { loadHomePage } from "@/sanity/lib/store";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import { toPlainText } from "next-sanity";
import dynamic from "next/dynamic";
import { draftMode } from "next/headers";
import "./globals.css";

const LiveVisualEditing = dynamic(
  () => import("@/sanity/preview/live-visual-editing"),
);

export async function generateMetadata({
  params,
}: Readonly<{
  params: { lang: Locale };
}>): Promise<Metadata> {
  const { data } = await loadHomePage(params.lang);
  const ogImage = urlForOpenGraphImage(data?.profilePicture);

  return {
    title: `${data?.title} | ${data?.subtitle} in Nantes`,
    description: data?.overview && toPlainText(data.overview),
    icons: {
      icon: [
        { url: "https://erwannrousseau.com/favicon.ico", type: "image/x-icon" },
        new URL("/apple-touch-icon.png", "https://erwannrousseau.com"),
      ],
      shortcut: "/favicon.ico",
      apple: [
        { url: "/apple-touch-icon.png" },
        { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      ],
    },
    openGraph: {
      title: `${data?.title} | ${data?.subtitle} in Nantes`,
      description: data?.overview ? toPlainText(data.overview) : undefined,
      url: "https://erwannrousseau.com",
      siteName: `${data?.title} | ${data?.subtitle}`,
      images: ogImage,
      type: "website",
    },
  };
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
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
          "min-h-dvh bg-background font-sans text-foreground antialiased",
          GeistSans.variable,
          SubjectivitySerif.variable,
          GeistMono.variable,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          {draftMode().isEnabled && <LiveVisualEditing />}
        </ThemeProvider>
        <TailwindIndicator />
        <SpeedInsights />
      </body>
    </html>
  );
}
