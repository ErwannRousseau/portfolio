import { Section } from "@/components/ui";
import { CustomPortableText } from "@/components/utils/custom-portable-text";
import { DateFormat } from "@/components/utils/date-format";
import type { Locale } from "@/i18n.config";
import { urlForImage, urlForOpenGraphImage } from "@/sanity/lib/image";
import { loadPostPage } from "@/sanity/lib/store";
import type { Metadata } from "next";
import type { PortableTextBlock } from "next-sanity";
import Image from "next/image";

export async function generateMetadata({
  params: { slug, lang },
}: Readonly<{
  params: { lang: Locale; slug: string };
}>): Promise<Metadata> {
  const { data } = await loadPostPage(slug, lang);
  const ogImage = urlForOpenGraphImage(data?.mainImage);

  return {
    title: data?.title,
    description: data?.subtitle,
    openGraph: {
      title: data?.title,
      description: data?.subtitle,
      url: `https://erwannrousseau.com/${lang}/blog/${slug}`,
      images: ogImage,
      type: "article",
    },
  };
}

export default async function Post(props: {
  params: { slug: string; lang: Locale };
}) {
  const { params } = props;
  const { slug, lang } = params;
  const { data } = await loadPostPage(slug, lang);

  const imageUrl = (quality: number) =>
    `${urlForImage(data?.mainImage)?.url()}&q=${quality}`;

  return (
    <main>
      <Section className="flex-col">
        <article>
          <Image
            alt={`post image ${data?.title}`}
            src={imageUrl(100) || ""}
            className="mb-2 aspect-video rounded-md object-cover"
            width={896}
            height={304}
            placeholder="blur"
            blurDataURL={imageUrl(50)}
          />
          <DateFormat date={data?.publishedAt} />
          <h1 className="mb-2 py-4 text-center">{data?.title}</h1>
          <CustomPortableText value={data?.body as PortableTextBlock[]} />
        </article>
      </Section>
    </main>
  );
}
