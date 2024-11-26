import { Section } from "@/components/ui";
import { cn } from "@/lib/utils";
import type { Skills as TSkills } from "@/sanity.types";

import { InlineSVG } from "@/components/utils/inline-svg";
import { getI18n } from "@/lib/locales/server";

type SkillsProps = {
  skills?: TSkills[] | null;
};

export default async function Skills({ skills }: SkillsProps) {
  const t = await getI18n();
  return (
    <Section className="flex-col">
      <h2 className="font-semibold text-2xl">{t("Skills")}</h2>
      <ul className="flex flex-wrap items-center gap-2.5">
        {(skills ?? []).map((skill) => {
          return (
            <li className="block" key={skill.name}>
              <span
                className={cn(
                  "flex h-8 cursor-default items-center gap-2 rounded-md border bg-accent px-3 py-1.5 font-medium transition-colors hover:border-badge-border hover:bg-badge",
                )}
                style={{ "--badge": skill.color } as React.CSSProperties}
              >
                <InlineSVG value={skill.icon} />
                <p>{skill.name}</p>
              </span>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
