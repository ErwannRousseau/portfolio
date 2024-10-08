import { Section } from "@/components/ui";
import { CustomPortableText } from "@/components/utils/custom-portable-text";
import { DateFormat } from "@/components/utils/date-format";
import type { Locale } from "@/i18n.config";
import { urlForImage } from "@/sanity/lib/image";
import { loadPostPage } from "@/sanity/lib/store";
import type { PortableTextBlock } from "next-sanity";
import Image from "next/image";

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
            className="mb-2 aspect-video rounded object-cover"
            width={896}
            height={304}
            placeholder="blur"
            blurDataURL={imageUrl(50)}
          />
          <DateFormat date={data?.publishedAt} />
          <h1 className="pb-4 text-center">{data?.title}</h1>
          <CustomPortableText value={data?.body as PortableTextBlock[]} />
        </article>
      </Section>
    </main>
  );
}
