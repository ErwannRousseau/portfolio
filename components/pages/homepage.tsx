import Connect from "@/components/home/connect";
import Hero from "@/components/home/hero";
import Projects from "@/components/home/projects";
import Skills from "@/components/home/skills";
import Works from "@/components/home/works";
import { Section, Spacing } from "@/components/ui";
import type { HOME_QUERYResult } from "@/sanity.types";
import type { EncodeDataAttributeCallback } from "@sanity/react-loader";

type HomeProps = {
  data: HOME_QUERYResult;
  encodeDataAttribute?: EncodeDataAttributeCallback;
};

export default function HomePage({ data }: HomeProps) {
  return (
    <main>
      <Spacing />
      <Hero data={data} />
      <Spacing />
      <Section className="gap-0 px-1">
        <Projects projects={data?.projects} />
        <Spacing />
        <Works works={data?.works} />
      </Section>
      <Spacing />
      <Skills skills={data?.skills} />
      <Spacing />
      <Connect />
    </main>
  );
}
