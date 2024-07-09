import { CopyButton } from "@/components/ui/copy-button";
import { highlightCode } from "@/lib/highlighter";
import { cn } from "@/lib/utils";
import type React from "react";

interface CodeBlockWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  code: string;
  language: string;
}

//TODO: Improve the code block because it's not working properly

export default async function CodeBlockWrapper({
  code,
  language,
}: CodeBlockWrapperProps) {
  const highlightedCode = await highlightCode(code, language);

  return (
    <div className="mt-2 rounded-md border focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
      <div className="flex flex-col space-y-4">
        <div className="relative">
          <CopyButton value={code} className="absolute top-4 right-4" />
          <div
            // biome-ignore lint/security/noDangerouslySetInnerHtml: This is a code block and we need to render the HTML.
            dangerouslySetInnerHTML={{ __html: highlightedCode }}
            className={cn(
              "w-full overflow-hidden rounded-md [&_pre]:my-0 [&_pre]:max-h-[350px] [&_pre]:overflow-auto [&_pre]:whitespace-break-spaces [&_pre]:p-6 [&_pre]:font-mono [&_pre]:text-sm [&_pre]:leading-relaxed",
            )}
          />
        </div>
      </div>
    </div>
  );
}
