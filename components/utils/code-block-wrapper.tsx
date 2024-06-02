"use client";

import { cn } from "@/lib/utils";
import { CheckIcon, ClipboardIcon } from "lucide-react";
import * as React from "react";
import { Button, type ButtonProps } from "../ui";
import { highlightCode } from "./highlighter";

interface CodeBlockWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  code: string;
  language: string;
}

export default async function CodeBlockWrapper({
  code,
  language,
}: CodeBlockWrapperProps) {
  const highlightedCode = await highlightCode(code, language);

  return (
    <div className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
      <div className="flex flex-col space-y-4">
        <div className="w-full rounded-md [&_pre]:my-0 [&_button]:hidden [&_pre]:max-h-[350px] [&_pre]:overflow-auto">
          {/* {highlightedCode && (
            <CopyButton
              value={highlightedCode}
              className="absolute top-20 right-4"
            />
          )} */}
          {/* {highlightedCode && (
            <div
              data-rehype-pretty-code-fragment
              // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
              dangerouslySetInnerHTML={{ __html: highlightedCode }}
              className="w-full overflow-hidden rounded-md [&_pre]:my-0 [&_pre]:h-[--container-height] [&_pre]:overflow-auto [&_pre]:whitespace-break-spaces [&_pre]:p-6 [&_pre]:font-mono [&_pre]:text-sm [&_pre]:leading-relaxed"
            />
          )} */}
        </div>
      </div>
    </div>
  );
}

interface CopyButtonProps extends ButtonProps {
  value: string;
}

export async function copyToClipboardWithMeta(value: string) {
  navigator.clipboard.writeText(value);
}

export function CopyButton({
  value,
  className,
  variant = "ghost",
  ...props
}: CopyButtonProps) {
  const [hasCopied, setHasCopied] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  }, []);

  return (
    <Button
      size="icon"
      variant={variant}
      className={cn(
        "relative z-10 h-6 w-6 text-zinc-50 [&_svg]:size-3 hover:bg-zinc-700 hover:text-zinc-50",
        className,
      )}
      onClick={() => {
        copyToClipboardWithMeta(value);
        setHasCopied(true);
      }}
      {...props}
    >
      <span className="sr-only">Copy</span>
      {hasCopied ? <CheckIcon /> : <ClipboardIcon />}
    </Button>
  );
}
