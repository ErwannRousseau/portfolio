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
  return (
    <main>
      <Section className="flex-col">
        <article>
          <div className="relative mb-2 aspect-video">
            <Image
              alt={`post image ${post?.title}`}
              src={urlForImage(post?.mainImage)?.url() || ""}
              className="rounded"
              fill
            />
          </div>
          <DateFormat date={post?.publishedAt} />
          <h2 className="pb-4 text-center">{post?.title}</h2>
          <CustomPortableText value={post?.body as PortableTextBlock[]} />
        </article>
      </Section>
    </main>
  );
}
