import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { getClientIp } from "@/lib/client-ip";
import { client } from "@/sanity/lib/client";
import { loadPostLikes } from "@/sanity/lib/store";

export async function POST(req: NextRequest) {
  try {
    const { postId } = await req.json();

    if (!postId) {
      return NextResponse.json({ message: "Post ID requis" }, { status: 400 });
    }

    const ip = await getClientIp();

    if (ip === "unknown") {
      return NextResponse.json({ message: "IP unknown" }, { status: 400 });
    }

    const { data } = await loadPostLikes(postId);

    if (!data?.slug?.current) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    const hasLiked = data?.likedBy?.includes(ip);

    if (hasLiked) {
      const index = data?.likedBy?.indexOf(ip);
      await client
        .patch(postId)
        .dec({ likeCount: 1 })
        .unset([`likedBy[${index}]`])
        .commit();
    } else {
      await client
        .patch(postId)
        .inc({ likeCount: 1 })
        .setIfMissing({ likeCount: 0, likedBy: [] })
        .append("likedBy", [ip])
        .commit();
    }

    revalidateTag(`post-${data.slug.current}`, { expire: 0 });

    return NextResponse.json(
      { message: "Like successfully updated" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error updating like:", error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
