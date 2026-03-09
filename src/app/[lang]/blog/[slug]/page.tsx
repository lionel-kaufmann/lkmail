import { getPostBySlug, getAllPosts } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import PageHeader from "@/components/PageHeader";
import { notFound } from "next/navigation";

// Required for fast static generation on Cloudflare
export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string; lang: string }>;
}) {
  const { slug, lang } = await params;

  try {
    const { meta, content } = await getPostBySlug(slug);

    // Format the date based on the current locale
    const formattedDate = new Date(meta.date).toLocaleDateString(lang, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    return (
      <article className="flex flex-col gap-8 pb-16 w-full">
        <PageHeader title={meta.title} description={formattedDate} />

        <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
          <MDXRemote source={content} />
        </div>
      </article>
    );
  } catch (error) {
    notFound();
  }
}