import { highlightCode } from "@/lib/highlight-code";

interface CodeBlockWrapperProps {
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
