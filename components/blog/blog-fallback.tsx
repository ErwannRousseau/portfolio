import { Section } from "@/components/ui/section";
import { Skeleton } from "@/components/ui/skeleton";
import { Spacing } from "@/components/ui/spacing";

export function BlogFallback() {
  return (
    <>
      <Spacing />
      <Skeleton className="ml-4 h-7 w-24" />
      <Spacing size="xs" />
      <Section className="flex-col gap-4 px-4">
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
      </Section>
    </>
  );
}
