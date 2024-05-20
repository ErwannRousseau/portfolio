import { Section } from "@/components/ui/section";
import { CustomPortableText } from "@/components/utils/custom-portable-text";
import type { HOME_QUERYResult } from "@/sanity.types";

import { urlForImage } from "@/sanity/lib/image";
import type { PortableTextBlock } from "next-sanity";

export default function Hero({ data }: { data: HOME_QUERYResult }) {
  const backgroundImage = urlForImage(data?.profilePicture)?.url();

  return (
    <Section className="justify-between md:flex-row-reverse">
      <div className="grid flex-1 place-items-center">
        <div
          className="hero-img"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      </div>
      <div className="flex flex-[2] flex-col justify-center">
        <h1>{data?.title}</h1>
        <i data-lucide="menu" />
        <h3>{data?.subtitle}</h3>
        <CustomPortableText value={data?.overview as PortableTextBlock[]} />
      </div>
    </Section>
  );
}
