"use client";

import { useScopedI18n } from "@/lib/locales/client";
import { cn, copyToClipboard } from "@/lib/utils";
import { CheckIcon, Copy } from "lucide-react";
import * as React from "react";
import { Button, type ButtonProps } from "./button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";

interface CopyButtonProps extends ButtonProps {
  value: string;
}

export function CopyButton({ value, className, ...props }: CopyButtonProps) {
  const t = useScopedI18n("CodeBlock");
  const [hasCopied, setHasCopied] = React.useState(false);

  // biome-ignore lint/correctness/useExhaustiveDependencies: This effect should run every time `hasCopied` changes
  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      setHasCopied(false);
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [hasCopied]);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="icon"
            variant="ghost"
            className={cn(
              "relative z-10 size-6 text-foreground opacity-0 group-hover:opacity-100 [&_svg]:size-4",
              className,
            )}
            onClick={() => {
              copyToClipboard(value);
              setHasCopied(true);
            }}
            {...props}
          >
            <span className="sr-only">{t("copy")}</span>
            {hasCopied ? <CheckIcon /> : <Copy />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{t("copy")}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
