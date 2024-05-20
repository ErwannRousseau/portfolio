import type { getDictionary } from "@/app/[lang]/dictionaries";
import { rgbColorToString } from "@/lib/utils";
import type { Works as TWorks } from "@/sanity.types";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { DateFormat } from "./utils/date-format";
import { InlineSVG } from "./utils/inline-svg";

type WorksProps = {
  works?: TWorks[] | null;
  dict: Awaited<ReturnType<typeof getDictionary>>["Works"];
};

export default function Works({ works, dict }: WorksProps) {
  return (
    <div className="flex flex-col gap-4 md:w-1/2">
      <h2 className="px-3">{dict.title}</h2>
      <ul className="first-of-type:-mt-3">
        {(works ?? []).map(({ title, job, link, icon, tags, duration }) => (
          <li key={title} className="leading-5">
            <Link
              href={{ pathname: link }}
              target="_blank"
              className="inline-flex w-full items-center gap-4 rounded-md p-3 transition-colors hover:bg-accent/50"
            >
              <i className="rounded-md bg-accent p-2 text-accent-foreground">
                <InlineSVG value={icon} />
              </i>
              <div className="w-full">
                <div className="flex gap-4">
                  <p className="font-semibold">{title}</p>
                  {(tags || []).map(({ name, color }) => (
                    <Badge
                      key={name}
                      className="w-fit border-badge-border bg-badge"
                      style={
                        {
                          "--badge": rgbColorToString(color),
                        } as React.CSSProperties
                      }
                    >
                      {name}
                    </Badge>
                  ))}
                </div>
                <div className="flex justify-between text-muted-foreground text-sm">
                  <p className="mr-2">{job}</p>
                  <DateFormat date={duration} current={dict.current} />
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
