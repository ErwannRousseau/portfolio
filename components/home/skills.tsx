import { Section } from "@/components/ui";
import { InlineSVG } from "@/components/utils/inline-svg";
import { getI18n } from "@/lib/locales/server";
import { cn } from "@/lib/utils";
import type { Skills as TSkills } from "@/sanity.types";

type SkillsProps = {
  skills?: TSkills[] | null;
};

export default async function Skills({ skills }: SkillsProps) {
  const t = await getI18n();

  return (
    <Section className="flex-col">
      <h2 className="font-semibold text-2xl">{t("Skills")}</h2>
      <ul className="flex flex-wrap items-center gap-2.5">
        {(skills ?? []).map((skill) => (
          <li className="block" key={skill.name}>
            <span
              className={cn(
                "flex h-8 cursor-default items-center gap-2 rounded-md border bg-accent px-3 py-1.5 font-medium transition-colors hover:border-badge-border hover:bg-badge",
              )}
              style={
                {
                  "--color-badge": `rgba(${skill.color}/0.12)`,
                  "--color-badge-border": `rgba(${skill.color}/0.24)`,
                } as React.CSSProperties
              }
            >
              <InlineSVG value={skill.icon} />
              <p>{skill.name}</p>
            </span>
          </li>
        ))}
      </ul>
    </Section>
  );
}
