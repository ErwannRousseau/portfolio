import { highlightCode } from "@/lib/highlighter";
import { cn } from "@/lib/utils";
import type React from "react";

interface CodeBlockWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  code: string;
  language: string;
}

export default async function CodeBlock({
  code,
  language,
}: CodeBlockWrapperProps) {
  const highlightedCode = await highlightCode(code, language);

  return (
    <div
      // biome-ignore lint/security/noDangerouslySetInnerHtml: This is a code block and we need to render the HTML.
      dangerouslySetInnerHTML={{ __html: highlightedCode }}
      className={cn(
        "w-full overflow-hidden rounded-md [&_pre]:my-0 [&_pre]:overflow-auto [&_pre]:whitespace-break-spaces [&_pre]:p-6 [&_pre]:font-mono [&_pre]:text-sm [&_pre]:leading-relaxed",
      )}
    />
  );
}
