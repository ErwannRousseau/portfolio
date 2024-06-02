// "use client";

// import { getHighlighter } from "shiki";

// export interface HighlighterProps {
//   codeInput: string;
//   language: string;
// }

// export const Highlighter = async ({
//   codeInput,
//   language,
// }: HighlighterProps) => {
//   // `getHighlighter` is async, it initializes the internal and
//   // loads the themes and languages specified.
//   const highlighter = await getHighlighter({
//     themes: ["min-dark"],
//     langs: [language],
//   });

//   // then later you can use `highlighter.codeToHtml` synchronously
//   // with the loaded themes and languages.
//   const code = highlighter.codeToHtml(codeInput, {
//     theme: "min-dark",
//     lang: language,
//   });

//   return <div>{code}</div>;
// };

"use server";

import { promises as fs } from "node:fs";
import path from "node:path";
import { getHighlighter } from "shiki";

// Highlighting is failing in server components.
// Disabling this in development.
// TODO: Remove this when we figure out the issue.
const highlightCodeEnabled = process.env.NODE_ENV !== "development";

export async function highlightCode(code: string, language: string) {
  if (!highlightCodeEnabled) {
    return code;
  }

  const editorTheme = await fs.readFile(
    path.join(process.cwd(), "lib/themes/dark.json"),
    "utf-8",
  );

  const highlighter = await getHighlighter({
    langs: [language],
    themes: [],
  });

  await highlighter.loadTheme(JSON.parse(editorTheme));

  const html = highlighter.codeToHtml(code, {
    lang: language,
    theme: "Pace Dark",
  });

  return html;
}
