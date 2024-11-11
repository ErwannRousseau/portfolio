"use client";

import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";
import MotionNumber from "motion-number";
import React from "react";

const format: Omit<Intl.NumberFormatOptions, "notation"> & {
  notation?: "compact" | "standard";
} = {
  notation: "compact",
  compactDisplay: "short",
  roundingMode: "trunc",
};

type Props = React.JSX.IntrinsicElements["button"] & {
  likes: number;
  liked: boolean;
  // onLike: () => void;
};

export function Like({ className, likes, liked, ...props }: Props) {
  const [currentLikes, setCurrentLikes] = React.useState(likes);

  const handleLike = () => {
    setCurrentLikes((prevLikes) => prevLikes + 1);
  };

  return (
    <button
      {...props}
      type="button"
      className={cn(
        className,
        "group flex items-center gap-1.5 transition-[color] hover:text-pink-500",
        liked && "text-pink-500",
      )}
      onClick={() => handleLike()}
    >
      <div className="before:-inset-2.5 relative before:absolute before:rounded-full before:transition-[background-color] before:group-hover:bg-pink-500/10">
        <Heart
          absoluteStrokeWidth
          className={cn(
            "group-active:spring-duration-[25] spring-bounce-[65] spring-duration-300 size-4 transition-transform group-active:scale-[80%]",
            liked && "fill-current",
          )}
        />
      </div>
      <MotionNumber value={currentLikes} format={format} />
    </button>
  );
}
