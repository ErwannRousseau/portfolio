import { highlightCode } from "@/lib/highlight-code";
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
    />
  );
}
