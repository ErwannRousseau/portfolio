"use client";

import { cn, copyToClipboard } from "@/lib/utils";
import { CheckIcon, ClipboardIcon } from "lucide-react";
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
              "relative z-10 size-6 text-foreground [&_svg]:size-4 hover:bg-foreground/30 hover:text-background",
              className,
            )}
            onClick={() => {
              copyToClipboard(value);
              setHasCopied(true);
            }}
            {...props}
          >
            <span className="sr-only">Copy</span>
            {hasCopied ? <CheckIcon /> : <ClipboardIcon />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Copy to clipboard</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}