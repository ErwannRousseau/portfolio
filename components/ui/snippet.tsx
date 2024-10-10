"use client";

import { useScopedI18n } from "@/lib/locales/client";
import { copyToClipboard, twx } from "@/lib/utils";
import React from "react";

const SnippetComp = twx.code`relative rounded-md bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm cursor-pointer active:text-pink-400`;

export const Snippet = ({ children }: { children: React.ReactNode }) => {
  const [hasCopied, setHasCopied] = React.useState(false);
  const t = useScopedI18n("Snippet");

  // biome-ignore lint/correctness/useExhaustiveDependencies: This effect should run every time `hasCopied` changes
  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      setHasCopied(false);
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [hasCopied]);

  return (
    <>
      {hasCopied && (
        <span className="-translate-x-1/2 fixed top-2 left-1/2 transform rounded bg-pink-300/80 px-2 font-mono text-secondary shadow">
          {t("copied")}
        </span>
      )}
      <SnippetComp
        onClick={() => {
          copyToClipboard(children?.toString() || "");
          setHasCopied(true);
        }}
      >
        {children}
      </SnippetComp>
    </>
  );
};
