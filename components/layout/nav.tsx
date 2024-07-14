"use client";

import type { Locale } from "@/i18n.config";
import { useI18n } from "@/lib/locales/client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export default function Nav() {
  const t = useI18n();
  const { lang } = useParams<{ lang: Locale }>();
  const pathname = usePathname();

  return (
    <nav>
      <ul className="flex gap-4">
        <li>
          <Link
            href={{ pathname: `/${lang}` }}
            className={cn({
              "font-semibold": pathname === `/${lang}`,
            })}
          >
            {t("Nav.Home")}
          </Link>
        </li>
        <li>
          <Link
            href={{ pathname: `/${lang}/blog` }}
            className={cn({
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
