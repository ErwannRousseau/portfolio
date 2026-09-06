import { expect, test } from "@playwright/test";

const locales = [
  {
    locale: "en",
    blogHeading: "My blog",
    home: "Home",
    title: "Fixture article",
    subtitle: "A stable article for browser smoke tests.",
    body: "This is the stable English article body.",
    imageAlt: "Fixture article image",
    linkText: "Fixture link",
    linkHref: "https://example.com/fixture",
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
    imageAlt: "Fixture article image",
    linkText: "Lien de test",
    linkHref: "https://example.com/fixture",
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
  imageAlt,
  linkText,
  linkHref,
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
    const image = article.getByRole("img", { name: imageAlt });

    await expect(image).toBeVisible();
    await expect(image).toHaveAttribute("src", /cdn\.sanity\.io/);
    await expect(article.getByRole("heading", { level: 1 })).toHaveText(title);
    await expect(article).toContainText(body);
    await expect(article.getByRole("link", { name: linkText })).toHaveAttribute(
      "href",
      linkHref,
    );
    await expect(article.getByRole("button").first()).toContainText("7");
    await expect(article.getByRole("heading", { level: 2 })).toHaveText(
      sectionHeading,
    );
    await expect(article.getByRole("heading", { level: 3 })).toHaveText(
      codeHeading,
    );
    await expect(article.locator("figcaption")).toHaveText("fixture.ts");
    await expect(article.locator("pre")).toContainText(codeSnippet);

    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      subtitle,
    );
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
      "content",
      title,
    );
    await expect(
      page.locator('meta[property="og:description"]'),
    ).toHaveAttribute("content", subtitle);
    await expect(page.locator('meta[property="og:type"]')).toHaveAttribute(
      "content",
      "article",
    );
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
      "content",
      `https://erwannrousseau.dev/${locale}/blog/fixture-article`,
    );
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
      "content",
      /cdn\.sanity\.io/,
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

  test(`${locale} missing blog article returns not found`, async ({ page }) => {
    await page.goto(`/${locale}/blog/missing-article`);

    await expect(page.locator('head meta[name="robots"]')).toHaveAttribute(
      "content",
      "noindex",
    );
    await expect(page.locator("main article")).toHaveCount(0);
  });
}
