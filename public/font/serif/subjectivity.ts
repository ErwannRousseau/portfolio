import localFont from "next/font/local";

export const SubjectivitySerif = localFont({
  src: [
    {
      path: "./SubjectivitySerif-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./SubjectivitySerif-Regular-Italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "./SubjectivitySerif-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./SubjectivitySerif-Bold-Italic.woff2",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-subjectivity-serif",
});
