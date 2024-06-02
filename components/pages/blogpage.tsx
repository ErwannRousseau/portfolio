import type { getDictionary } from "@/app/[lang]/dictionaries";
import { Section, Spacing } from "@/components/ui";
import { DateFormat } from "@/components/utils/date-format";
import type { Locale } from "@/i18n.config";
import type { BLOG_QUERYResult } from "@/sanity.types";
import { urlForImage } from "@/sanity/lib/image";
import type { EncodeDataAttributeCallback } from "@sanity/react-loader";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export type BlogPageProps = {
  posts: BLOG_QUERYResult;
  encodeDataAttribute?: EncodeDataAttributeCallback;
  title: Awaited<ReturnType<typeof getDictionary>>["Blog"];
  lang: Locale;
};

export default function BlogPage({ posts, title, lang }: BlogPageProps) {
  return (
    <main>
      <Spacing />
      <h2 className="pl-4">{title}</h2>
      <Spacing size="xs" />
      <Section className="flex-col gap-0 px-0">
        {posts ? (
          posts.map(({ title, subtitle, publishedAt, slug, mainImage }) => (
            <Link
              href={{ pathname: `/${lang}/blog/${slug.current}` }}
              className="flex justify-between rounded-md p-4 transition-colors hover:bg-accent/50"
              key={title}
            >
              <div className="flex gap-3">
                <Image
                  src={urlForImage(mainImage)?.url() || ""}
                  alt={`main image for ${title}`}
                  width={100}
                  height={100}
                  className="rounded max-md:hidden"
                />
                <div>
                  <DateFormat date={publishedAt} />
                  <p className="font-semibold text-lg">{title}</p>
                  <p className="text-muted-foreground leading-3">{subtitle}</p>
                </div>
              </div>
              <ArrowUpRight className="self-center" />
            </Link>
          ))
        ) : (
          <p>No posts found</p>
        )}
      </Section>
    </main>
  );
}
