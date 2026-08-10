import type { Metadata } from "next";
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

export default function Post({
  params,
}: Readonly<{
  params: Promise<{ slug: string; lang: Locale }>;
}>) {
  return (
    <main>
      <Section className="flex-col">
        <Skeleton kind="blog-post">
          <PostContent params={params} />
        </Skeleton>
      </Section>
    </main>
  );
}
