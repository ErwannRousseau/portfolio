import type { Metadata } from "next";
import Image from "next/image";
import type { PortableTextBlock } from "next-sanity";
import { Suspense } from "react";
import { LikeButton } from "@/components/ui/like-button";
import { Section } from "@/components/ui/section";
import { Skeleton } from "@/components/ui/skeleton";
import { Spacing } from "@/components/ui/spacing";
import { Comments } from "@/components/utils/comments";
import { CustomPortableText } from "@/components/utils/custom-portable-text";
import { DateFormat } from "@/components/utils/date-format";
import type { Locale } from "@/i18n.config";
import { getClientIp } from "@/lib/client-ip";
import { urlForImage, urlForOpenGraphImage } from "@/sanity/lib/image";
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
      <Suspense fallback={<PostFallback />}>
        <PostContent params={params} />
      </Suspense>
    </main>
  );
}

async function PostContent({
  params,
}: Readonly<{
  params: Promise<{ slug: string; lang: Locale }>;
}>) {
  const { slug, lang } = await params;
  const { data } = await loadPostPage(slug, lang);

  const image = urlForImage(data?.mainImage);
  const mainImageUrl = image?.width(1200).height(675).fit("crop").url();
  const blurDataURL = image?.width(24).height(14).fit("crop").quality(20).url();

  return (
    <Section className="flex-col">
      <article className="prose max-w-none">
        {mainImageUrl && (
          <Image
            alt={data?.mainImage?.alt ?? data?.title ?? ""}
            src={mainImageUrl}
            className="mb-2 h-auto w-full rounded-md"
            width={1200}
            height={675}
            sizes="(max-width: 768px) 100vw, 1200px"
            placeholder="blur"
            blurDataURL={blurDataURL}
          />
        )}
        <div className="flex justify-between">
          <DateFormat date={data?.publishedAt} />
          <Suspense
            fallback={
              <LikeButton
                className="mr-2"
                likes={data?.likeCount ?? 0}
                liked={false}
                postId={data?._id}
              />
            }
          >
            <PostLikeButton
              likedBy={data?.likedBy}
              likes={data?.likeCount ?? 0}
              postId={data?._id}
            />
          </Suspense>
        </div>
        <h1 className="pt-4 text-center">{data?.title}</h1>
        <CustomPortableText value={data?.body as PortableTextBlock[]} />
      </article>
      <Spacing size="xs" />
      <Comments lang={lang} />
    </Section>
  );
}

async function PostLikeButton({
  likedBy,
  likes,
  postId,
}: {
  likedBy?: string[] | null;
  likes: number;
  postId?: string;
}) {
  const clientIp = await getClientIp();

  return (
    <LikeButton
      className="mr-2"
      likes={likes}
      liked={likedBy?.includes(clientIp) ?? false}
      postId={postId}
    />
  );
}

function PostFallback() {
  return (
    <Section className="flex-col gap-4">
      <Skeleton className="aspect-video w-full" />
      <Skeleton className="h-5 w-32" />
      <Skeleton className="mx-auto h-10 w-3/4" />
      <Skeleton className="h-40 w-full" />
    </Section>
  );
}
