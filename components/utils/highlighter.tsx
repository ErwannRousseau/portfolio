import { getHighlighter } from "shiki";

export interface HighlighterProps {
  codeInput: string;
  language: string;
}

export const Highlighter = async ({
  codeInput,
  language,
}: HighlighterProps) => {
  // `getHighlighter` is async, it initializes the internal and
  // loads the themes and languages specified.
  const highlighter = await getHighlighter({
    themes: ["min-dark"],
    langs: [language],
  });

  // then later you can use `highlighter.codeToHtml` synchronously
  // with the loaded themes and languages.
  const code = highlighter.codeToHtml(codeInput, {
    theme: "min-dark",
    lang: language,
  });

  return <>{code}</>;
};
