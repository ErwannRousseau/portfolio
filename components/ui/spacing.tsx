import { cn } from "@/lib/utils";

type SpacingProps = {
  size?: "sm" | "md" | "lg";
};

export function Spacing({ size = "sm" }: SpacingProps) {
  return (
    <div
      className={cn({
        "h-8 lg:h-16": size === "sm",
        "h-16 lg:h-24": size === "md",
        "h-24 lg:h-32": size === "lg",
      })}
    />
  );
}
