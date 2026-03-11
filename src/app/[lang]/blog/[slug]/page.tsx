import { getPostBySlug } from "@/lib/mdx";
import ReactMarkdown from "react-markdown";

export default async function BlogPost({ 
  params 
}: { 
  params: Promise<{ lang: string, slug: string }> 
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  return (
    <article className="prose dark:prose-invert max-w-none">
      {/* Change .metadata to .meta here 👇 */}
      <h1>{post.meta.title}</h1>
      
      <ReactMarkdown>
        {post.content}
      </ReactMarkdown>
      
    </article>
  );
}