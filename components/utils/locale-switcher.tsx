"use client";

import { type Locale, i18n } from "@/i18n.config";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LocaleSwitcher() {
  const pathName = usePathname();

  const redirectedPathName = (locale: Locale) => {
    if (!pathName) return { pathname: "/" };
    const segments = pathName.split("/");
    segments[1] = locale;
    return { pathname: segments.join("/") };
  };

  return (
    <div className="flex gap-2">
      {i18n.locales.map((locale) => (
        <Link
          href={redirectedPathName(locale)}
          key={locale}
          className={cn("-m-2 p-2", {
            underline: pathName === redirectedPathName(locale).pathname,
          })}
        >
          {locale.charAt(0).toUpperCase() + locale.slice(1)}
        </Link>
      ))}
    </div>
  );
}
