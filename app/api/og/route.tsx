import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export async function GET() {
  const image = await readFile(
    join(process.cwd(), "public/blog-opengraph-image.png"),
    "base64",
  );

  return new ImageResponse(
    // biome-ignore lint/performance/noImgElement: ImageResponse requires a standard image element.
    <img
      alt="Blog by Erwann Rousseau"
      src={`data:image/png;base64,${image}`}
      style={{ height: "100%", width: "100%" }}
    />,
    {
      width: 464,
      height: 252,
    },
  );
}
