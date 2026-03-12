import Link from "next/link";
import { getDictionary, Locale } from "@/getDictionary";
import PageHeader from "@/components/PageHeader";
import { getAllPosts, BlogPostMeta } from "@/lib/mdx";

// 🔒 THE FIX: Lock the route to be 100% static
export const dynamic = "force-static";
export const dynamicParams = false;

// 🔒 THE FIX: Tell Next.js which languages exist so it pre-builds the index
export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "fr" }];
}

export default async function BlogIndex({ 
  params 
}: { 
  params: Promise<{ lang: string }> 
}) {
  const { lang } = await params;
  
  const [dict, posts] = await Promise.all([
    getDictionary(lang as Locale),
    getAllPosts(lang)
  ]);

  return (
    <div className="flex flex-col gap-12 pb-16">
      <PageHeader 
        title={dict.blog?.title || "Blog"} 
        description={dict.blog?.description || "My latest thoughts and technical articles."} 
      />

      {posts.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">
          No posts found in this language yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {posts.map((post: BlogPostMeta) => (
            <Link 
              key={post.slug} 
              href={`/${lang}/blog/${post.slug}`}
              className="group flex flex-col justify-between p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-[#0a0a0a] hover:border-fuchsia-500 transition-colors"
            >
              <div className="space-y-3">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100 group-hover:text-fuchsia-500 transition-colors">
                  {post.title}
                </h2>
                {post.description && (
                  <p className="text-gray-600 dark:text-gray-400 text-base line-clamp-3">
                    {post.description}
                  </p>
                )}
              </div>
              
              <div className="mt-6 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}