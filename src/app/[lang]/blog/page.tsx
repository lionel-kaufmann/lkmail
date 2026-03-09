import { getAllPosts } from "@/lib/mdx";
import { getDictionary, Locale } from "@/getDictionary";
import PageHeader from "@/components/PageHeader";
import Link from "next/link";
import { getRoute } from "@/lib/routes";

export default async function BlogIndex({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  const posts = await getAllPosts();
  const blogRoute = getRoute("BLOG", lang);

  return (
    <div className="flex flex-col gap-12 pb-16">
      <PageHeader title={dict.blog?.title || "Blog"} description={dict.blog?.description || "Writing about code, architecture, and life."} />
      
      <div className="flex flex-col gap-8">
        {posts.map((post) => (
          <article key={post.slug} className="flex flex-col gap-2 group">
            <Link href={`${blogRoute}/${post.slug}`} className="flex flex-col gap-2">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100 group-hover:text-fuchsia-500 transition-colors">
                {post.title}
              </h2>
              <time className="text-sm text-gray-500 dark:text-gray-400">
                {new Date(post.date).toLocaleDateString(lang, { year: 'numeric', month: 'long', day: 'numeric' })}
              </time>
              <p className="text-gray-600 dark:text-gray-400">
                {post.description}
              </p>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}