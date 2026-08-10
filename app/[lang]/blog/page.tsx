import type { Metadata } from "next";
import { BlogContent } from "@/components/blog/blog-content";
import { BlogHeading } from "@/components/blog/blog-heading";
import { Skeleton } from "@/components/blog/skeleton";
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
      <BlogHeading />
      <Skeleton kind="blog-list">
        <BlogContent params={params} />
      </Skeleton>
    </main>
  );
}
