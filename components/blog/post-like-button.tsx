import { LikeButton } from "@/components/ui/like-button";
import { getClientIp } from "@/lib/client-ip";

export async function PostLikeButton({
  likedBy,
  likes,
  postId,
}: {
  likedBy?: string[] | null;
  likes: number;
  postId?: string;
}) {
  const clientIp = await getClientIp();

  return (
    <LikeButton
      className="mr-2"
      likes={likes}
      liked={likedBy?.includes(clientIp) ?? false}
      postId={postId}
    />
  );
}
