"use client";

import "@/bones/registry";
import { BoneSuspense } from "boneyard-js/react";
import type { PropsWithChildren } from "react";
import { useCurrentLocale } from "@/lib/locales/client";

export function Skeleton({
  children,
  kind,
}: PropsWithChildren<{
  kind: "blog-list" | "blog-post";
}>) {
  const lang = useCurrentLocale();

  return (
    <BoneSuspense
      name={`${kind}-${lang}`}
      select="viewport"
      snapshotConfig={{
        excludeSelectors: ["svg", "[data-no-skeleton]"],
      }}
      stagger={80}
      // transition doesn't work with BoneSuspense, so we need to wait until this is fixed or feature is added to boneyard-js
      // transition={400}
    >
      {children}
    </BoneSuspense>
  );
}
