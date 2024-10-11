import { Skeleton } from "@/components/ui/skeleton";
import { MAX_NUMBER_OF_LINES } from "@/lib/constants";
import { cn } from "@/lib/utils";

function getRandomWidth(min: number, max: number): string {
  return `${Math.floor(Math.random() * (max - min + 1)) + min}px`;
}

export function CodeSkeleton({ numberOfLines }: { numberOfLines: number }) {
  const skeletons = Array.from(
    {
      length:
        numberOfLines > MAX_NUMBER_OF_LINES
          ? MAX_NUMBER_OF_LINES
          : numberOfLines,
    },
    () => getRandomWidth(100, 700),
  );

  return (
    <div
      className={cn("flex flex-col gap-3 p-6", numberOfLines === 1 && "p-3")}
    >
      {skeletons.map((width) => (
        <Skeleton key={width} className={"h-4"} style={{ width }} />
      ))}
    </div>
  );
}
