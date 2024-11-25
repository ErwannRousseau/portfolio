import { getClientIp } from "@/lib/client-ip";
import { client } from "@/sanity/lib/client";
import { loadPostLikes } from "@/sanity/lib/store";
import { type NextRequest, NextResponse } from "next/server";

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
        .setIfMissing({ likedBy: [] })
        .append("likedBy", [ip])
        .commit();
    }

    return NextResponse.json(
      { message: "Like successfully updated" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error updating like:", error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
