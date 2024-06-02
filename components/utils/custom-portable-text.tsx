import { BadgeLink } from "@/components/ui/badge";
import { urlForImage } from "@/sanity/lib/image";
import {
  PortableText,
  type PortableTextBlock,
  type PortableTextComponents,
} from "next-sanity";
import CodeBlockWrapper from "./code-block-wrapper";
// import { Highlighter } from "./highlighter";

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
                className="underline transition hover:opacity-50"
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
      code: ({ value }) => (
        <CodeBlockWrapper code={value.code} language={value.language} />
      ),
    },
  };

  return <PortableText components={components} value={value} />;
}
