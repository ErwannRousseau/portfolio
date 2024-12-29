"use client";

import { cn } from "@/lib/utils";
import NumberFlow from "@number-flow/react";
import { Heart } from "lucide-react";
import * as React from "react";

type Props = React.JSX.IntrinsicElements["button"] & {
  likes: number;
  liked: boolean;
  postId?: string;
};

export function LikeButton({
  className,
  likes,
  liked,
  postId,
  ...props
}: Props) {
  const [isPending, startTransition] = React.useTransition();
  const [currentLikes, setCurrentLikes] = React.useState(likes);
  const [isLiked, setIsLiked] = React.useState(liked);

  const handleLike = () => {
    const newLikes = isLiked ? currentLikes - 1 : currentLikes + 1;
    setCurrentLikes(newLikes);
    setIsLiked(!isLiked);

    startTransition(async () => {
      try {
        const res = await fetch("/api/like", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ postId }),
        });

        const data = await res.json();

        if (!res.ok) {
          setCurrentLikes(likes);
          setIsLiked(liked);
          console.error(data.message);
        }
      } catch (error) {
        setCurrentLikes(likes);
        setIsLiked(liked);
        console.error("Error updating like:", error);
      }
    });
  };

  return (
    <button
      {...props}
      type="button"
      className={cn(
        className,
        "group flex items-center gap-1.5 transition-colors hover:text-pink-500",
        isLiked && "text-pink-500",
      )}
      onClick={handleLike}
      disabled={isPending}
    >
      <div className="before:-inset-2.5 relative before:absolute before:rounded-full before:transition-[background-color] before:group-hover:bg-pink-500/10">
        <Heart
          absoluteStrokeWidth
          className={cn(
            "group-active:spring-duration-[25] spring-bounce-[65] spring-duration-300 size-5 transition-transform group-active:scale-[80%]",
            isLiked && "fill-current",
          )}
        />
      </div>
      <NumberFlow value={currentLikes} />
    </button>
  );
}
