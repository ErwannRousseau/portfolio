import { highlightCode } from "@/lib/highlight-code";
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
        "w-full rounded-md [&_pre]:my-0 [&_pre]:p-6 [&_pre]:pb-12 [&_pre]:font-mono [&_pre]:text-sm [&_pre]:leading-relaxed",
      )}
    />
  );
}
