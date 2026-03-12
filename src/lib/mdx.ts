import fs from 'fs';
import path from 'path';
import fm from 'front-matter';

const BLOG_DIR = path.join(process.cwd(), 'src/content/blog');

export interface BlogPostMeta {
  title: string;
  description?: string;
  date: string;
  tags?: string[];
  author?: string;
  slug: string; 
}

export async function getPostBySlug(slug: string, lang: string) {
  const filePath = path.join(BLOG_DIR, lang, `${slug}.mdx`);
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    // Use the Edge-safe front-matter parser
    const { attributes, body } = fm<Omit<BlogPostMeta, 'slug'>>(fileContent);
    return { meta: attributes, content: body };
  } catch (error) {
    return null;
  }
}

export async function getAllPosts(lang: string): Promise<BlogPostMeta[]> {
  const langDir = path.join(BLOG_DIR, lang);
  if (!fs.existsSync(langDir)) return [];

  const files = fs.readdirSync(langDir);
  const posts = files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => {
      const filePath = path.join(langDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      
      // Use the Edge-safe front-matter parser
      const { attributes } = fm<Omit<BlogPostMeta, 'slug'>>(fileContent);
      
      return { ...attributes, slug: file.replace(/\.mdx$/, '') } as BlogPostMeta;
    });

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}