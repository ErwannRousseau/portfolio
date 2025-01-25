import { Section, Spacing } from "@/components/ui";
import { DateFormat } from "@/components/utils/date-format";
import type { Locale } from "@/i18n.config";
import { getI18n } from "@/lib/locales/server";
import { urlForImage } from "@/sanity/lib/image";
import { loadBlogPage } from "@/sanity/lib/store";
import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export async function generateMetadata({
  params,
}: Readonly<{
  params: Promise<{ lang: Locale }>;
}>): Promise<Metadata> {
  const { lang } = await params;

  return {
    title: "Blog | Erwann Rousseau",
    description: "",
    openGraph: {
      url: `https://erwannrousseau.dev/${lang}/blog`,
      type: "website",
    },
  };
}

export default async function Blog({
  params,
}: Readonly<{
  params: Promise<{ lang: Locale }>;
}>) {
  const { lang } = await params;

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
              href={`/${lang}/blog/${slug.current}`}
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
                  className="rounded-md max-md:hidden"
                />
                <div>
                  <DateFormat date={publishedAt} />
                  <p className="mb-2 font-semibold text-lg/5">{title}</p>
                  <p className="text-muted-foreground leading-[0.9rem]">
                    {subtitle}
                  </p>
                </div>
              </div>
              <ArrowUpRight className="ml-2 shrink-0 self-center" />
            </Link>
          ))
        ) : (
          <p>No posts found</p>
        )}
      </Section>
    </main>
  );
}
