import { getPostBySlug } from "@/lib/mdx";
import ReactMarkdown from "react-markdown";
import { notFound } from "next/navigation";

export default async function BlogPost({ 
  params 
}: { 
  params: Promise<{ lang: string, slug: string }> 
}) {
  // Extract both lang and slug from the URL
  const { lang, slug } = await params;
  
  // Pass both to the parser
  const post = await getPostBySlug(slug, lang);

  // If the file doesn't exist (e.g., no French translation yet), trigger a 404
  if (!post) {
    notFound();
  }

  return (
    <article className="prose dark:prose-invert max-w-none">
      <h1>{post.meta.title}</h1>
      
      <ReactMarkdown>
        {post.content}
      </ReactMarkdown>
      
    </article>
  );
}