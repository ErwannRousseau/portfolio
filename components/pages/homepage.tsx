import type { getDictionary } from "@/app/[lang]/dictionaries";
import Connect from "@/components/connect";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Hero from "@/components/hero";
import Projects from "@/components/projects";
import Skills from "@/components/skills";
import { Section, Spacing } from "@/components/ui";
import Works from "@/components/works";
import type { HOME_QUERYResult } from "@/sanity.types";
import type { EncodeDataAttributeCallback } from "@sanity/react-loader";

type HomeProps = {
  data: HOME_QUERYResult;
  encodeDataAttribute?: EncodeDataAttributeCallback;
  dict: Awaited<ReturnType<typeof getDictionary>>;
};

export default function HomePage({ data, dict }: HomeProps) {
  return (
    <main className="m-auto max-w-4xl px-4">
      <Header />
      <Spacing />
      <Hero data={data} />
      <Spacing />
      <Section className="max-md:gap-0">
        <Projects projects={data?.projects} title={dict.Projects} />
        <Spacing />
        <Works works={data?.works} dict={dict.Works} />
      </Section>
      <Spacing />
      <Skills skills={data?.skills} title={dict.Skills} />
      <Spacing />
      <Connect title={dict.Connect} />
      <Spacing size="md" />
      <Footer />
    </main>
  );
}
