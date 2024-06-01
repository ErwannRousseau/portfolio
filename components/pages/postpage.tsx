import { Section } from "@/components/ui";
import type { POST_QUERYResult } from "@/sanity.types";
import type { EncodeDataAttributeCallback } from "@sanity/react-loader";

export type PostPageProps = {
  post: POST_QUERYResult;
  encodeDataAttribute?: EncodeDataAttributeCallback;
};

export default function PostPage({ post }: PostPageProps) {
  console.log(post);

  return (
    <main>
      <Section>Page</Section>
    </main>
  );
}
