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
      <div className="flex flex-2 flex-col justify-center leading-7">
        <h1 className="font-extrabold text-4xl lg:text-5xl">{data?.title}</h1>
        <h2 className="text-3xl text-secondary-foreground">{data?.subtitle}</h2>
        <CustomPortableText value={data?.overview as PortableTextBlock[]} />
      </div>
    </Section>
  );
}
