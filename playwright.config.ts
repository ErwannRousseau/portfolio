import { defineConfig, devices } from "@playwright/test";

const port = Number.parseInt(process.env.PORT ?? "", 10) || 3000;
const baseURL = `http://127.0.0.1:${port}`;

export default defineConfig({
  testDir: "./e2e",
  forbidOnly: !!process.env.CI,
  reporter: "list",
  use: {
    baseURL,
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: "pnpm build && pnpm start",
    url: baseURL,
    env: {
      PORT: String(port),
      NEXT_PUBLIC_SANITY_DATASET: "e2e",
      NEXT_PUBLIC_SANITY_PROJECT_ID: "fssg1pp3",
    },
    reuseExistingServer: false,
    timeout: 120_000,
  },
});
