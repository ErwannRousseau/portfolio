import { Section } from "@/components/ui/section";
import { Skeleton } from "@/components/ui/skeleton";

export function PostFallback() {
  return (
    <Section className="flex-col gap-4">
      <Skeleton className="aspect-video w-full" />
      <Skeleton className="h-5 w-32" />
      <Skeleton className="mx-auto h-10 w-3/4" />
      <Skeleton className="h-40 w-full" />
    </Section>
  );
}
