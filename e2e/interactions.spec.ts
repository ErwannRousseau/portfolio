import { expect, test } from "@playwright/test";

const articlePath = "/en/blog/fixture-article";

test("the locale switcher changes the current article language", async ({
  page,
}) => {
  await page.goto(articlePath);

  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await page.getByRole("link", { name: "Fr", exact: true }).click();

  await expect(page).toHaveURL(/\/fr\/blog\/fixture-article$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "fr");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Article de test",
  );
});

test("the theme toggle changes the document theme", async ({ page }) => {
  await page.goto("/en");

  const documentRoot = page.locator("html");
  const themeToggle = page.getByRole("button", { name: "Toggle theme" });

  await expect(documentRoot).not.toHaveClass(/\bdark\b/);
  await themeToggle.click();
  await expect(documentRoot).toHaveClass(/\bdark\b/);
  await themeToggle.click();
  await expect(documentRoot).not.toHaveClass(/\bdark\b/);
});

test("like and unlike use the test API without changing Sanity data", async ({
  page,
}) => {
  let requests = 0;
  const postIds: unknown[] = [];

  await page.route("**/api/like", async (route) => {
    requests += 1;
    postIds.push(route.request().postDataJSON().postId);
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ message: "Like successfully updated" }),
    });
  });
  await page.goto(articlePath);

  const likeButton = page.locator("article").getByRole("button").first();

  await expect(likeButton).toContainText("7");
  await likeButton.click();
  await expect(likeButton).toContainText("8");
  await expect(likeButton.locator("svg")).toHaveClass(/fill-current/);

  await likeButton.click();
  await expect(likeButton).toContainText("7");
  await expect(likeButton.locator("svg")).not.toHaveClass(/fill-current/);
  await expect(likeButton).toBeEnabled();
  expect(requests).toBe(2);
  expect(postIds).toHaveLength(2);
  expect(postIds[0]).toBeTruthy();
  expect(postIds[1]).toBe(postIds[0]);
});

test("a failed like request restores the initial state", async ({ page }) => {
  let requests = 0;
  let releaseResponse!: () => void;
  const responsePending = new Promise<void>((resolve) => {
    releaseResponse = resolve;
  });

  await page.route("**/api/like", async (route) => {
    requests += 1;
    await responsePending;
    await route.fulfill({
      status: 500,
      contentType: "application/json",
      body: JSON.stringify({ message: "Server Error" }),
    });
  });
  await page.goto(articlePath);

  const likeButton = page.locator("article").getByRole("button").first();

  await expect(likeButton).toContainText("7");
  await likeButton.click();
  await expect(likeButton).toContainText("8");
  await expect(likeButton.locator("svg")).toHaveClass(/fill-current/);
  await expect(likeButton).toBeDisabled();
  expect(requests).toBe(1);
  releaseResponse();
  await expect(likeButton).toContainText("7");
  await expect(likeButton.locator("svg")).not.toHaveClass(/fill-current/);
  await expect(likeButton).toBeEnabled();
});
