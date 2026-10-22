import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostContent } from "@/components/blog/post-content";
import { Skeleton } from "@/components/blog/skeleton";
import { Section } from "@/components/ui/section";
import type { Locale } from "@/i18n.config";
import { urlForOpenGraphImage } from "@/sanity/lib/image";
import { loadPostPage } from "@/sanity/lib/store";

export async function generateMetadata({
  params,
}: Readonly<{
  params: Promise<{ slug: string; lang: Locale }>;
}>): Promise<Metadata> {
  const { slug, lang } = await params;

  const { data } = await loadPostPage(slug, lang);
  const ogImage = urlForOpenGraphImage(data?.mainImage);

  return {
    title: data?.title,
    description: data?.subtitle,
    openGraph: {
      title: data?.title ?? undefined,
      description: data?.subtitle ?? undefined,
      url: `https://erwannrousseau.dev/${lang}/blog/${slug}`,
      images: ogImage,
      type: "article",
    },
  };
}

export default async function Post({
  params,
}: Readonly<{
  params: Promise<{ slug: string; lang: Locale }>;
}>) {
  const { slug, lang } = await params;
  const { data } = await loadPostPage(slug, lang);

  if (!data) {
    notFound();
  }

  return (
    <main>
      <Section className="flex-col">
        <Skeleton kind="blog-post">
          <PostContent data={data} lang={lang} />
        </Skeleton>
      </Section>
    </main>
  );
}
