"use server";

import { promises as fs } from "node:fs";
import path from "node:path";
import { createHighlighter } from "shiki";

export async function highlightCode(code: string, language: string) {
  const darkTheme = await fs.readFile(
    path.join(process.cwd(), "lib/themes/dark.json"),
    "utf-8",
  );

  const lightTheme = await fs.readFile(
    path.join(process.cwd(), "lib/themes/light.json"),
    "utf-8",
  );

  const highlighter = await createHighlighter({
    themes: [],
    langs: [language],
  });

  await highlighter.loadTheme(JSON.parse(darkTheme));
  await highlighter.loadTheme(JSON.parse(lightTheme));

  const html = highlighter.codeToHtml(code, {
    lang: language,
    themes: {
      light: "Pace Light",
      dark: "Pace Dark",
    },
  });

  highlighter.dispose();

  return html;
}
