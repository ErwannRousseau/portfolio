import { Section } from "@/components/ui";
import type { POST_QUERYResult } from "@/sanity.types";
import { urlForImage } from "@/sanity/lib/image";
import type { EncodeDataAttributeCallback } from "@sanity/react-loader";
import type { PortableTextBlock } from "next-sanity";
import Image from "next/image";
import { CustomPortableText } from "../utils/custom-portable-text";
import { DateFormat } from "../utils/date-format";

export type PostPageProps = {
  post: POST_QUERYResult;
  encodeDataAttribute?: EncodeDataAttributeCallback;
};

export default function PostPage({ post }: PostPageProps) {
  const imageUrl = (quality: number) =>
    `${urlForImage(post?.mainImage)?.url()}&q=${quality}`;
  return (
    <main>
      <Section className="flex-col">
        <article>
          <Image
            alt={`post image ${post?.title}`}
            src={imageUrl(100) || ""}
            className="mb-2 aspect-video rounded object-cover"
            width={896}
            height={304}
            placeholder="blur"
            blurDataURL={imageUrl(50)}
          />
          <DateFormat date={post?.publishedAt} />
          <h1 className="pb-4 text-center">{post?.title}</h1>
          <CustomPortableText value={post?.body as PortableTextBlock[]} />
        </article>
      </Section>
    </main>
  );
}
