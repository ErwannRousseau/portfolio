import { Skeleton } from "@/components/ui/skeleton";

function getRandomWidth(min: number, max: number): string {
  return `${Math.floor(Math.random() * (max - min + 1)) + min}px`;
}

export function CodeSkeleton() {
  const skeletons = Array.from({ length: 8 }, () => getRandomWidth(100, 700));

  return (
    <div className="flex flex-col gap-3 p-6">
      {skeletons.map((width) => (
        <Skeleton key={width} className={"h-4"} style={{ width }} />
      ))}
    </div>
  );
}
