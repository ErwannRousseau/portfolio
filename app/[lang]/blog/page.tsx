import type { Metadata } from "next";
import { Suspense } from "react";
import { BlogContent } from "@/components/blog/blog-content";
import { BlogFallback } from "@/components/blog/blog-fallback";
import type { Locale } from "@/i18n.config";

export async function generateMetadata({
  params,
}: Readonly<{
  params: Promise<{ lang: Locale }>;
}>): Promise<Metadata> {
  const { lang } = await params;

  return {
    title: "Blog | Erwann Rousseau",
    description: "",
    openGraph: {
      url: `https://erwannrousseau.dev/${lang}/blog`,
      images: "https://erwannrousseau.dev/blog-opengraph-image.png",
      type: "website",
    },
  };
}

export default function Blog({
  params,
}: Readonly<{
  params: Promise<{ lang: Locale }>;
}>) {
  return (
    <main>
      <Suspense fallback={<BlogFallback />}>
        <BlogContent params={params} />
      </Suspense>
    </main>
  );
}
