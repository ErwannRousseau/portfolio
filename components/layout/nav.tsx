"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import type { Locale } from "@/i18n.config";
import { useScopedI18n } from "@/lib/locales/client";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";

export default function Nav() {
  const t = useScopedI18n("Nav");
  const { lang } = useParams<{ lang: Locale }>();
  const pathname = usePathname();

  return (
    <nav>
      <ul className="flex gap-4">
        <li>
          <Link
            href={`/${lang}`}
            className={cn(buttonVariants({ variant: "link" }), "px-0", {
              "font-semibold": pathname === `/${lang}`,
            })}
            prefetch={true}
          >
            {t("Home")}
          </Link>
        </li>
        <li>
          <Link
            href={`/${lang}/blog`}
            className={cn(buttonVariants({ variant: "link" }), "px-0", {
              "font-semibold": pathname.includes(`/${lang}/blog`),
            })}
            prefetch={true}
          >
            Blog
          </Link>
        </li>
      </ul>
    </nav>
  );
}
