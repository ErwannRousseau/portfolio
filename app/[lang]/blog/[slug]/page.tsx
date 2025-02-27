import { Section, Spacing } from "@/components/ui";
import { LikeButton } from "@/components/ui/like-button";
import { Comments } from "@/components/utils/comments";
import { CustomPortableText } from "@/components/utils/custom-portable-text";
import { DateFormat } from "@/components/utils/date-format";
import type { Locale } from "@/i18n.config";
import { getClientIp } from "@/lib/client-ip";
import { urlForImage, urlForOpenGraphImage } from "@/sanity/lib/image";
import { loadPostPage } from "@/sanity/lib/store";
import type { Metadata } from "next";
import type { PortableTextBlock } from "next-sanity";
import Image from "next/image";

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
      title: data?.title,
      description: data?.subtitle,
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

  const imageUrl = (quality: number) =>
    `${urlForImage(data?.mainImage)?.url()}&q=${quality}`;

  const isLiked = data?.likedBy?.includes(await getClientIp()) ?? false;

  return (
    <main>
      <Section className="flex-col">
        <article className="prose max-w-none">
          <Image
            alt={`post image ${data?.title}`}
            src={imageUrl(100) || ""}
            className="mb-2 aspect-video rounded-md"
            width={768}
            height={431}
            placeholder="blur"
            blurDataURL={imageUrl(50)}
          />
          <div className="flex justify-between">
            <DateFormat date={data?.publishedAt} />
            <LikeButton
              className="mr-2"
              likes={data?.likeCount ?? 0}
              liked={isLiked}
              postId={data?._id}
            />
          </div>
          <h1 className="pt-4 text-center">{data?.title}</h1>
          <CustomPortableText value={data?.body as PortableTextBlock[]} />
        </article>
        <Spacing size="xs" />
        <Comments lang={lang} />
      </Section>
    </main>
  );
}
