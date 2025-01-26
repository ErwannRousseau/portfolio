import { InlineSVG } from "@/components/utils/inline-svg";
import { getI18n } from "@/lib/locales/server";
import type { Projects as TProjects } from "@/sanity.types";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

type ProjectsProps = {
  projects?: TProjects[] | null;
};

export default async function Projects({ projects }: ProjectsProps) {
  const t = await getI18n();
  return (
    <div className="flex flex-col gap-4 md:w-1/2">
      <h2 className="px-3 font-semibold text-2xl">{t("Projects")}</h2>
      <ul className="first-of-type:-mt-3">
        {(projects ?? []).map(({ title, description, link, icon }) => (
          <li key={title} className="leading-5">
            <Link
              target="_blank"
              href={{ pathname: link }}
              className="inline-flex w-full items-center gap-4 rounded-md p-3 transition-colors hover:bg-accent/50"
            >
              <i className="rounded-md bg-accent p-2 text-accent-foreground">
                <InlineSVG value={icon} />
              </i>
              <div className="flex w-full justify-between">
                <div>
                  <p className="font-semibold">{title}</p>
                  <p className="text-muted-foreground text-sm">{description}</p>
                </div>
                <ArrowUpRight className="shrink-0 self-center" />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
