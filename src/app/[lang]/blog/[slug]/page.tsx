import { getPostBySlug, getAllPosts } from "@/lib/mdx";
import ReactMarkdown from "react-markdown";
import { notFound } from "next/navigation";

// 🔒 THE FIX: Lock the route to be 100% static
export const dynamic = "force-static";
export const dynamicParams = false;

export async function generateStaticParams() {
  const langs = ['en', 'fr'];
  const paths: { lang: string; slug: string }[] = [];

  for (const lang of langs) {
    const posts = await getAllPosts(lang);
    for (const post of posts) {
      paths.push({ lang, slug: post.slug });
    }
  }

  return paths;
}

export default async function BlogPost({ 
  params 
}: { 
  params: Promise<{ lang: string, slug: string }> 
}) {
  const { lang, slug } = await params;
  
  const post = await getPostBySlug(slug, lang);

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