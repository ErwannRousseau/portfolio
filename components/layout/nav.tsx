"use client";

import type { Locale } from "@/i18n.config";
import { useScopedI18n } from "@/lib/locales/client";
import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { buttonVariants } from "../ui";

export default function Nav() {
  const t = useScopedI18n("Nav");
  const { lang } = useParams<{ lang: Locale }>();
  const pathname = usePathname();

  const isPostPage = pathname.includes(`/${lang}/blog/`);

  return (
    <nav>
      <ul className="flex gap-4">
        <li>
          <Link
            href={{ pathname: `/${lang}` }}
            className={cn(buttonVariants({ variant: "link", size: "link" }), {
              "font-semibold": pathname === `/${lang}`,
            })}
          >
            {t("Home")}
          </Link>
        </li>
        <li>
          <Link
            href={{ pathname: `/${lang}/blog` }}
            className={cn(buttonVariants({ variant: "link", size: "link" }), {
              "font-semibold": pathname.includes(`/${lang}/blog`),
            })}
            prefetch={true}
          >
            Blog
          </Link>
        </li>
        {isPostPage && (
          <li className="flex justify-center">
            <Link
              href={{ pathname: `/${lang}/blog` }}
              className={cn(
                buttonVariants({ variant: "link", size: "link" }),
                "text-sm",
              )}
            >
              <ChevronLeft className="size-4" /> {t("Back")}
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
