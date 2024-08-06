import { BadgeLink } from "@/components/ui/badge";
import type { Code } from "@/sanity.types";
import { urlForImage } from "@/sanity/lib/image";
import {
  PortableText,
  type PortableTextBlock,
  type PortableTextComponents,
} from "next-sanity";
import Image from "next/image";
import CodeBlock from "./code-block";
import { CodeBlockWrapper } from "./code-block-wrapper";

export function CustomPortableText({
  value,
}: {
  paragraphClasses?: string;
  value: PortableTextBlock[];
}) {
  const components: PortableTextComponents = {
    block: {
      normal: ({ children }) => {
        return <p className="leading-7">{children}</p>;
      },
    },
    marks: {
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
    types: {
      code: ({ value }: { value: Code }) => (
        <CodeBlockWrapper code={value.code} filename={value.filename}>
          <CodeBlock code={value.code} language={value.language} />
        </CodeBlockWrapper>
      ),
      image: ({ value }) => (
        <div className="my-4 grid w-full place-items-center">
          <Image
            src={urlForImage(value)?.url() || ""}
            alt={value.alt}
            className="rounded"
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
