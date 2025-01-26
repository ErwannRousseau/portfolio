"use client";

import { useScopedI18n } from "@/lib/locales/client";
import { copyToClipboard, twx } from "@/lib/utils";
import * as React from "react";

const SnippetComp = twx.code`relative rounded-md bg-muted px-[0.3rem] py-[0.2rem] font-geist-mono text-sm cursor-pointer active:text-pink-400`;

export const Snippet = ({ children }: { children: React.ReactNode }) => {
  const [hasCopied, setHasCopied] = React.useOptimistic(false);
  const t = useScopedI18n("Snippet");

  const handleCopy = () => {
    React.startTransition(async () => {
      copyToClipboard(children?.toString() || "");
      setHasCopied(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setHasCopied(false);
    });
  };
  return (
    <>
      {hasCopied && (
        <span className="-translate-x-1/2 fixed top-2 left-1/2 transform rounded bg-pink-300/80 px-2 font-geist-mono text-secondary shadow-sm">
          {t("copied")}
        </span>
      )}
      <SnippetComp onClick={handleCopy}>{children}</SnippetComp>
    </>
  );
};
