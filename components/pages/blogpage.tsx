import type { getDictionary } from "@/app/[lang]/dictionaries";
import type { BLOG_QUERYResult } from "@/sanity.types";
import type { EncodeDataAttributeCallback } from "@sanity/react-loader";

export type BlogPageProps = {
  data: BLOG_QUERYResult;
  encodeDataAttribute?: EncodeDataAttributeCallback;
  dict: Awaited<ReturnType<typeof getDictionary>>;
};

export default function BlogPage({ data, dict }: BlogPageProps) {
  console.log(data);

  return (
    <main className="container mx-auto grid grid-cols-1 divide-y divide-blue-100">
      {data.length ? (
        data.map((post, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          <div key={index}>
            <h3>{post.title}</h3>
            <p>{post.subtitle}</p>
          </div>
        ))
      ) : (
        <div className="p-4 text-red-500">No posts found</div>
      )}
    </main>
  );
}
