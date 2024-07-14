"use client";

import { Button, CopyButton } from "@/components/ui";
import { useScopedI18n } from "@/lib/locales/client";
import { cn } from "@/lib/utils";
import * as React from "react";

interface CodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  code: string;
  filename?: string;
}

export function CodeBlockWrapper({
  children,
  code,
  filename,
  ...props
}: CodeBlockProps) {
  const t = useScopedI18n("CodeBlock");
  const [isOpened, setIsOpened] = React.useState(false);

  return (
    <div
      className="my-4 rounded-md border focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
      {...props}
    >
      <div className="flex flex-col space-y-4">
        <div className={cn("relative", !isOpened && "[&_pre]:max-h-[350px]")}>
          {filename && (
            <span className="absolute pt-1 pl-2 text-xs opacity-70">
              {filename}
            </span>
          )}
          <CopyButton value={code} className="absolute top-4 right-4" />
          {children}
          <div className="absolute inset-x-0 bottom-0 flex items-center justify-center rounded-b-md bg-gradient-to-b from-muted/30 to-primary/60 p-2">
            <Button
              variant="secondary"
              className="h-8 text-xs"
              onClick={() => setIsOpened(!isOpened)}
            >
              {isOpened ? t("collapse") : t("expand")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
