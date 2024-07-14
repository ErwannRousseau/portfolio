"use server";

import { Section } from "@/components/ui/section";
import { getI18n } from "@/lib/locales/server";
import Link from "next/link";

export default async function Connect() {
  const t = await getI18n();
  return (
    <Section className="flex-col">
      <h2>{t("Connect")}</h2>
      <ul className="contact-list flex w-fit gap-6 font-medium">
        <li className="transition-opacit">
          <Link href="mailto:erwann.rousseau@icloud.com?subject=Prise de contact">
            Email
          </Link>
        </li>
        <li className="transition-opacity">
          <Link
            href="https://www.linkedin.com/in/erwannrousseauwebdev/"
            target="_blank"
          >
            LinkedIn
          </Link>
        </li>
        <li className="transition-opacity">
          <Link href="https://github.com/ErwannRousseau" target="_blank">
            GitHub
          </Link>
        </li>
        <li className="transition-opacity">
          <Link href="https://twitter.com/ErwannRousseau4" target="_blank">
            Twitter
          </Link>
        </li>
      </ul>
    </Section>
  );
}
