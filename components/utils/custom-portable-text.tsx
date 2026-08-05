import Image from "next/image";
import Link from "next/link";
import {
  PortableText,
  type PortableTextBlock,
  type PortableTextComponents,
} from "next-sanity";
import { Suspense } from "react";
import { BadgeLink } from "@/components/ui/badge";
import { Snippet } from "@/components/ui/snippet";
import { getSanityImageDimensions, urlForImage } from "@/sanity/lib/image";
import type { Code } from "@/sanity.types";
import CodeBlock from "./code-block";
import { CodeBlockWrapper } from "./code-block-wrapper";
import { CodeSkeleton } from "./code-skeleton";

export function CustomPortableText({
  value,
}: {
  paragraphClasses?: string;
  value: PortableTextBlock[];
}) {
  const components: PortableTextComponents = {
    marks: {
      code: ({ children }) => {
        return <Snippet>{children}</Snippet>;
      },
      link: ({ children, value }) => {
        const imageUrl = urlForImage(value.icon)?.url();
        return (
          <>
            {imageUrl ? (
              <BadgeLink
                href={value.href}
                alt={`icon of ${value.href}`}
                src={imageUrl}
              >
                {children}
              </BadgeLink>
            ) : (
              <Link
                className="cursor-pointer text-pink-400 underline transition hover:opacity-70"
                href={value?.href}
                rel="noreferrer noopener"
                target="_blank"
              >
                {children}
              </Link>
            )}
          </>
        );
      },
    },
    types: {
      code: ({ value }: { value: Code }) => {
        const { filename } = value;
        const code = value.code ?? "";
        const language = value.language ?? "text";
        const numberOfLines = code.split("\n").length;

        return (
          <CodeBlockWrapper
            code={code}
            filename={filename}
            language={language}
            numberOfLines={numberOfLines}
          >
            <Suspense fallback={<CodeSkeleton numberOfLines={numberOfLines} />}>
              <CodeBlock code={code} language={language} />
            </Suspense>
          </CodeBlockWrapper>
        );
      },
      image: ({ value }) => {
        const image = urlForImage(value);
        const dimensions = getSanityImageDimensions(value);

        if (!(image && dimensions)) {
          return null;
        }

        const isCompact =
          value.display === "compact" ||
          (value.display === undefined && dimensions.height > dimensions.width);

        return (
          <div className="my-4 grid w-full place-items-center">
            <Image
              src={image.width(isCompact ? 640 : 1600).url()}
              alt={value.alt ?? ""}
              className={
                isCompact
                  ? "h-auto w-full max-w-xs rounded-md"
                  : "h-auto w-full rounded-md"
              }
              width={dimensions.width}
              height={dimensions.height}
              sizes={
                isCompact
                  ? "(max-width: 768px) 100vw, 320px"
                  : "(max-width: 768px) 100vw, 1200px"
              }
              loading="lazy"
            />
          </div>
        );
      },
    },
  };

  return <PortableText components={components} value={value} />;
}
