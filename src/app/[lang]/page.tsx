import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getDictionary, Locale } from "@/getDictionary";
import HeroBanner from "@/components/HeroBanner";
import { getAllPosts } from "@/lib/mdx";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const [dict, posts] = await Promise.all([
    getDictionary(lang as Locale),
    getAllPosts(lang),
  ]);
  const latestPosts = posts.slice(0, 3);

  return (
    <div className="flex flex-col gap-16 pb-16">
      <HeroBanner
        title={dict.home.title}
        subtitle={dict.home.description}
      />
      {latestPosts.length > 0 && (
        <section aria-labelledby="latest-posts-heading" className="space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 id="latest-posts-heading" className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              {dict.home.latestPosts}
            </h2>
            <Link
              href={`/${lang}/blog`}
              className="inline-flex items-center gap-2 font-medium text-fuchsia-600 dark:text-fuchsia-400 hover:underline underline-offset-4"
            >
              {dict.home.viewAllPosts}
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {latestPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/${lang}/blog/${post.slug}`}
                className="group flex flex-col gap-4 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-[#0a0a0a] p-6 hover:border-fuchsia-500 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fuchsia-500"
              >
                <time dateTime={post.date} className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(post.date).toLocaleDateString(lang === "fr" ? "fr-FR" : "en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    timeZone: "UTC",
                  })}
                </time>
                <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100 group-hover:text-fuchsia-500 transition-colors">
                  {post.title}
                </h3>
                {post.description && (
                  <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400 line-clamp-3">
                    {post.description}
                  </p>
                )}
                <span className="mt-auto inline-flex items-center gap-2 pt-2 text-sm font-medium text-fuchsia-600 dark:text-fuchsia-400">
                  {dict.home.readPost}
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
