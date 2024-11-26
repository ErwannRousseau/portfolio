import type { UrlObject } from "node:url";
import { Section } from "@/components/ui/section";
import { getI18n } from "@/lib/locales/server";
import Link from "next/link";

export default async function Connect() {
  const t = await getI18n();

  const contacts = [
    {
      href: "mailto:erwann.rousseau@icloud.com?subject=Prise de contact",
      label: "Email",
    },
    {
      href: "https://www.linkedin.com/in/erwannrousseauwebdev/",
      label: "LinkedIn",
      target: "_blank",
    },
    {
      href: "https://github.com/ErwannRousseau",
      label: "GitHub",
      target: "_blank",
    },
    {
      href: "https://twitter.com/ErwannRousseau4",
      label: "Twitter",
      target: "_blank",
    },
  ];

  return (
    <Section className="flex-col">
      <h2 className="font-semibold text-2xl">{t("Connect")}</h2>
      <ul className="contact-list flex w-fit gap-6 font-medium">
        {contacts.map((contact) => (
          <li key={contact.label} className="transition-opacity">
            <Link
              href={contact.href as unknown as UrlObject}
              target={contact?.target}
            >
              {contact.label}
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
