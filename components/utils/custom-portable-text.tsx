import { BadgeLink, Snippet } from "@/components/ui";
import type { Code } from "@/sanity.types";
import { urlForImage } from "@/sanity/lib/image";
import {
  PortableText,
  type PortableTextBlock,
  type PortableTextComponents,
} from "next-sanity";
import Image from "next/image";
import { Suspense } from "react";
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
    block: {
      normal: ({ children }) => {
        if (
          !children ||
          (Array.isArray(children) && children.join("").trim() === "")
        ) {
          return <br />;
        }
        return <p className="leading-7">{children}</p>;
      },
      blockquote: ({ children }) => {
        return (
          <blockquote className="border-muted border-l-4 pl-4 text-muted-foreground italic">
            {children}
          </blockquote>
        );
      },
    },
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
              <a
                className="cursor-pointer text-pink-400 underline transition hover:opacity-70"
                href={value?.href}
                rel="noreferrer noopener"
                target="_blank"
              >
                {children}
              </a>
            )}
          </>
        );
      },
    },
    list: {
      bullet: ({ children }) => (
        <ul className="list-inside list-disc space-y-1">{children}</ul>
      ),
    },
    types: {
      code: ({ value }: { value: Code }) => {
        const numberOfLines = value.code.split("\n").length;

        return (
          <CodeBlockWrapper
            code={value.code}
            filename={value.filename}
            language={value.language}
            numberOfLines={numberOfLines}
          >
            <Suspense fallback={<CodeSkeleton numberOfLines={numberOfLines} />}>
              <CodeBlock code={value.code} language={value.language} />
            </Suspense>
          </CodeBlockWrapper>
        );
      },
      image: ({ value }) => (
        <div className="my-4 grid w-full place-items-center">
          <Image
            src={urlForImage(value)?.url() || ""}
            alt={value.alt}
            className="rounded-md"
            width={500}
            height={500}
            loading="lazy"
          />
        </div>
      ),
    },
  };

  return <PortableText components={components} value={value} />;
}
