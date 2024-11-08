"use client";

import {
  Button,
  CopyButton,
  Icons,
  ScrollArea,
  ScrollBar,
} from "@/components/ui";
import { MAX_NUMBER_OF_LINES } from "@/lib/constants";
import { useScopedI18n } from "@/lib/locales/client";
import { cn } from "@/lib/utils";
import * as React from "react";

type IconKeys = keyof typeof Icons;
interface CodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  code: string;
  filename?: string;
  language: string;
  numberOfLines: number;
}

export function CodeBlockWrapper({
  children,
  code,
  filename,
  language,
  numberOfLines,
  ...props
}: CodeBlockProps) {
  const t = useScopedI18n("CodeBlock");
  const [isOpened, setIsOpened] = React.useState(false);

  return (
    <figure
      className={cn(
        "group relative my-4 overflow-y-hidden rounded-md border focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
        numberOfLines === 1 && "my-2",
      )}
      {...props}
    >
      {filename && (
        <div className="flex flex-row items-center justify-between gap-2 border-b px-4 py-1.5">
          <div className="flex items-center gap-2">
            {Icons[language as IconKeys]({})}
            <figcaption>{filename}</figcaption>
          </div>
          <CopyButton value={code} />
        </div>
      )}
      <ScrollArea>
        {!filename && (
          <CopyButton value={code} className="absolute top-2 right-4" />
        )}
        <div
          className={cn(
            "w-full rounded-md [&_pre]:my-0 [&_pre]:p-6 [&_pre]:pb-12 [&_pre]:font-mono [&_pre]:text-sm [&_pre]:leading-relaxed",
            !isOpened && "max-h-[350px]",
            numberOfLines === 1 && "[&_pre]:p-2",
            numberOfLines <= MAX_NUMBER_OF_LINES &&
              numberOfLines !== 1 &&
              "[&_pre]:pb-6",
          )}
        >
          {children}
          {numberOfLines > MAX_NUMBER_OF_LINES && (
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-center bg-gradient-to-b from-transparent to-gray-100 p-2 dark:to-gray-700">
              <Button
                variant="link"
                type="button"
                onClick={() => setIsOpened(!isOpened)}
                className="text-pink-400 text-xs hover:no-underline"
              >
                {isOpened ? t("collapse") : t("expand")}
              </Button>
            </div>
          )}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </figure>
  );
}
