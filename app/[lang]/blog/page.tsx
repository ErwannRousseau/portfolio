import { Section, Spacing } from "@/components/ui";
import { DateFormat } from "@/components/utils/date-format";
import type { Locale } from "@/i18n.config";
import { getI18n } from "@/lib/locales/server";
import { urlForImage } from "@/sanity/lib/image";
import { loadBlogPage } from "@/sanity/lib/store";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function Blog({
  params: { lang },
}: { params: { lang: Locale } }) {
  const { data } = await loadBlogPage(lang);
  const t = await getI18n();

  return (
    <main>
      <Spacing />
      <h2 className="pl-4">{t("Blog")}</h2>
      <Spacing size="xs" />
      <Section className="flex-col gap-0 px-0">
        {data ? (
          data.map(({ title, subtitle, publishedAt, slug, mainImage }) => (
            <Link
              href={{ pathname: `/${lang}/blog/${slug.current}` }}
              className="flex justify-between rounded-md p-4 transition-colors hover:bg-accent/50"
              key={title}
              prefetch={true}
            >
              <div className="flex gap-3">
                <Image
                  src={urlForImage(mainImage)?.url() || ""}
                  alt={`main image for ${title}`}
                  width={100}
                  height={70}
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
