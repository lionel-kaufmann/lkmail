import { getPostBySlug, getAllPosts } from "@/lib/mdx";
import ReactMarkdown from "react-markdown";
import { notFound } from "next/navigation";

// 1. This tells Next.js to read the files at BUILD time and generate static HTML
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

// 2. Your standard page component
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