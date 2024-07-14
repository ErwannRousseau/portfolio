"use client";

import type { getDictionary } from "@/app/[lang]/dictionaries";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export default function Nav({
  dict,
}: { dict: Awaited<ReturnType<typeof getDictionary>>["Nav"] }) {
  const { lang } = useParams();
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
            {dict.Home}
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
