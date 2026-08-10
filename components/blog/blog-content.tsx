import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/ui/section";
import { DateFormat } from "@/components/utils/date-format";
import type { Locale } from "@/i18n.config";
import { urlForImage } from "@/sanity/lib/image";
import { loadBlogPage } from "@/sanity/lib/store";

export async function BlogContent({
  params,
}: Readonly<{
  params: Promise<{ lang: Locale }>;
}>) {
  const { lang } = await params;
  const { data } = await loadBlogPage(lang);

  return (
    <Section className="flex-col gap-0 px-0">
      {data ? (
        data.map(({ title, subtitle, publishedAt, slug, mainImage }) => {
          const thumbnailUrl = urlForImage(mainImage)
            ?.width(214)
            .height(120)
            .fit("crop")
            .url();

          return (
            <Link
              href={`/${lang}/blog/${slug.current}`}
              className="flex justify-between rounded-md p-4 transition-colors hover:bg-accent/50"
              key={title}
              prefetch={true}
            >
              <div className="flex gap-3">
                {thumbnailUrl && (
                  <Image
                    src={thumbnailUrl}
                    alt={mainImage?.alt ?? title ?? ""}
                    width={107}
                    height={60}
                    sizes="107px"
                    className="my-auto h-[60px] w-[107px] shrink-0 rounded-md object-cover max-md:hidden"
                  />
                )}
                <div>
                  <DateFormat date={publishedAt} />
                  <p className="mb-2 font-semibold text-lg/5">{title}</p>
                  <p className="text-muted-foreground leading-4">{subtitle}</p>
                </div>
              </div>
              <ArrowUpRight className="ml-2 shrink-0 self-center" />
            </Link>
          );
        })
      ) : (
        <p>No posts found</p>
      )}
    </Section>
  );
}
