import { getPostBySlug, getAllPosts } from "@/lib/mdx";
import ReactMarkdown from "react-markdown";
import { notFound } from "next/navigation";

// 🔒 STRICT SSG: Prevents Cloudflare from attempting dynamic rendering for unknown slugs
export const dynamicParams = false;

// 📦 Tell Next.js to pre-build every single markdown file as a static HTML page
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
  
  // This runs entirely at BUILD time
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