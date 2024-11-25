import Connect from "@/components/home/connect";
import Hero from "@/components/home/hero";
import Projects from "@/components/home/projects";
import Skills from "@/components/home/skills";
import Works from "@/components/home/works";
import { Section, Spacing } from "@/components/ui";
import type { Locale } from "@/i18n.config";
import { loadHomePage } from "@/sanity/lib/store";

export default async function Home({
  params,
}: Readonly<{
  params: Promise<{ lang: Locale }>;
}>) {
  const { lang } = await params;

  const { data } = await loadHomePage(lang);

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
