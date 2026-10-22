import { expect, test } from "@playwright/test";

const locales = [
  {
    locale: "en",
    home: "Home",
    subtitle: "Full-stack developer",
    projectDescription: "An isolated project fixture.",
    sections: ["Projects", "Works", "Skills", "Connect"],
  },
  {
    locale: "fr",
    home: "Accueil",
    subtitle: "Développeur full-stack",
    projectDescription: "Un projet isolé pour le smoke navigateur.",
    sections: ["Projets", "Expériences", "Compétences", "Contact"],
  },
] as const;

for (const {
  locale,
  home,
  subtitle,
  projectDescription,
  sections,
} of locales) {
  test(`${locale} homepage renders its localized content`, async ({ page }) => {
    await page.goto(`/${locale}`);

    await expect(page.locator("html")).toHaveAttribute("lang", locale);

    const main = page.getByRole("main");
    await expect(main.getByRole("heading", { level: 1 })).toHaveText(
      "Fixture portfolio",
    );
    await expect(main.getByRole("heading", { name: subtitle })).toBeVisible();
    await expect(main).toContainText(projectDescription);

    for (const section of sections) {
      await expect(main.getByRole("heading", { name: section })).toBeVisible();
    }

    const nav = page.getByRole("navigation");
    await expect(nav.getByRole("link", { name: home })).toHaveAttribute(
      "href",
      `/${locale}`,
    );
    await expect(nav.getByRole("link", { name: "Blog" })).toHaveAttribute(
      "href",
      `/${locale}/blog`,
    );
  });
}
