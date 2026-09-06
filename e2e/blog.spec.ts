import { expect, test } from "@playwright/test";

const locales = [
  {
    locale: "en",
    blogHeading: "My blog",
    home: "Home",
    title: "Fixture article",
    subtitle: "A stable article for browser smoke tests.",
    body: "This is the stable English article body.",
    sectionHeading: "Fixture section",
    codeHeading: "Code example",
    codeSnippet: "const fixture = true;",
  },
  {
    locale: "fr",
    blogHeading: "Mon blog",
    home: "Accueil",
    title: "Article de test",
    subtitle: "Un article stable pour le smoke navigateur.",
    body: "Ceci est le contenu stable de l’article français.",
    sectionHeading: "Section de test",
    codeHeading: "Exemple de code",
    codeSnippet: "const fixture = true;",
  },
] as const;

for (const {
  locale,
  blogHeading,
  home,
  title,
  subtitle,
  body,
  sectionHeading,
  codeHeading,
  codeSnippet,
} of locales) {
  test(`${locale} blog list renders the localized article`, async ({
    page,
  }) => {
    await page.goto(`/${locale}/blog`);

    await expect(page.locator("html")).toHaveAttribute("lang", locale);

    const main = page.getByRole("main");
    await expect(
      main.getByRole("heading", { name: blogHeading }),
    ).toBeVisible();

    const articleLink = main.getByRole("link", { name: title });
    await expect(articleLink).toContainText(subtitle);
    await expect(articleLink).toHaveAttribute(
      "href",
      `/${locale}/blog/fixture-article`,
    );

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

  test(`${locale} blog article renders the localized body`, async ({
    page,
  }) => {
    await page.goto(`/${locale}/blog/fixture-article`);

    await expect(page.locator("html")).toHaveAttribute("lang", locale);
    await expect(page).toHaveTitle(title);

    const article = page.locator("article");
    await expect(article.getByRole("heading", { level: 1 })).toHaveText(title);
    await expect(article).toContainText(body);
    await expect(article.getByRole("button").first()).toContainText("7");
    await expect(article.getByRole("heading", { level: 2 })).toHaveText(
      sectionHeading,
    );
    await expect(article.getByRole("heading", { level: 3 })).toHaveText(
      codeHeading,
    );
    await expect(article.locator("figcaption")).toHaveText("fixture.ts");
    await expect(article.locator("pre")).toContainText(codeSnippet);

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
