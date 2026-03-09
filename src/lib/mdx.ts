import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type BlogPostMeta = {
  slug: string;
  title: string;
  date: string;
  description: string;
  image?: string;
  tags?: string[];
};

const contentDir = path.join(process.cwd(), "src/content/blog");

export async function getPostBySlug(slug: string) {
  const filePath = path.join(contentDir, `${slug}.mdx`);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);
  return { meta: { ...data, slug } as BlogPostMeta, content };
}

export async function getAllPosts(): Promise<BlogPostMeta[]> {
  if (!fs.existsSync(contentDir)) return [];
  const files = fs.readdirSync(contentDir);
  
  const posts = files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const filePath = path.join(contentDir, file);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data } = matter(fileContent);
      return { ...data, slug } as BlogPostMeta;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
  return posts;
}