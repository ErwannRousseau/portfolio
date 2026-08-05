"use client";

import Giscus from "@giscus/react";
import type { Locale } from "@/i18n.config";
import { useTheme } from "@/lib/theme";

interface GithubCommentsProps {
  lang: Locale;
}

export function Comments({ lang }: GithubCommentsProps) {
  const { theme } = useTheme();
  const isLight = theme === "light";

  return (
    <Giscus
      id="comments"
      repo="ErwannRousseau/portfolio"
      repoId="R_kgDOL9W-cQ"
      category="Announcements"
      categoryId="DIC_kwDOL9W-cc4CnJaY"
      mapping="title"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme={isLight ? "catppuccin_latte" : "catppuccin_macchiato"}
      lang={lang}
      loading="lazy"
    />
  );
}
