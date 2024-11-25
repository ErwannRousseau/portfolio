"use client";

import type { Locale } from "@/i18n.config";
import { useScopedI18n } from "@/lib/locales/client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { buttonVariants } from "../ui";

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
            className={cn(buttonVariants({ variant: "link", size: "link" }), {
              "font-semibold": pathname === `/${lang}`,
            })}
          >
            {t("Home")}
          </Link>
        </li>
        <li>
          <Link
            href={`/${lang}/blog`}
            className={cn(buttonVariants({ variant: "link", size: "link" }), {
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
