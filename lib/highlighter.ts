"use server";

import { promises as fs } from "node:fs";
import path from "node:path";
import {
  type BundledLanguage,
  type BundledTheme,
  type HighlighterGeneric,
  createHighlighter,
} from "shiki";

let highlighterInstance: HighlighterGeneric<
  BundledLanguage,
  BundledTheme
> | null = null;

export async function highlightCode(code: string, language: string) {
  if (!highlighterInstance) {
    const darkTheme = await fs.readFile(
      path.join(process.cwd(), "lib/themes/dark.json"),
      "utf-8",
    );

    const lightTheme = await fs.readFile(
      path.join(process.cwd(), "lib/themes/light.json"),
      "utf-8",
    );

    highlighterInstance = await createHighlighter({
      themes: [],
      langs: [language],
    });

    await highlighterInstance.loadTheme(JSON.parse(darkTheme));
    await highlighterInstance.loadTheme(JSON.parse(lightTheme));
  }

  const html = highlighterInstance.codeToHtml(code, {
    lang: language,
    themes: {
      light: "Pace Light",
      dark: "Pace Dark",
    },
  });

  return html;
}
