"use client";

import { type PropsWithChildren, useLayoutEffect } from "react";
import type { Locale } from "@/i18n.config";
import { I18nProviderClient } from "@/lib/locales/client";
import { applyStoredTheme } from "@/lib/theme";

// Client-inserted scripts do not execute; keep this bootstrap on initial render.
let hasRenderedThemeScript = false;

export function AppProvider({
  children,
  locale,
}: PropsWithChildren<{ locale: Locale }>) {
  const renderThemeScript = !hasRenderedThemeScript;

  useLayoutEffect(() => {
    hasRenderedThemeScript = true;
    applyStoredTheme();
  });

  return (
    <>
      {renderThemeScript && (
        <script id="theme">
          {`
            const theme = localStorage.getItem("theme") === "dark" ? "dark" : "light";
            document.documentElement.classList.toggle("dark", theme === "dark");
            document.documentElement.style.colorScheme = theme;
          `}
        </script>
      )}
      <I18nProviderClient locale={locale}>{children}</I18nProviderClient>
    </>
  );
}
