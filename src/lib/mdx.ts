import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const BLOG_DIR = path.join(process.cwd(), 'src/content/blog');

// 1. Define the TypeScript interface for your frontmatter
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
    const { data, content } = matter(fileContent);
    return { meta: data as Omit<BlogPostMeta, 'slug'>, content };
  } catch (error) {
    console.error(`Error reading MDX file for slug ${slug} in language ${lang}:`, error);
    return null;
  }
}

// 2. Add the missing getAllPosts function
export async function getAllPosts(lang: string): Promise<BlogPostMeta[]> {
  const langDir = path.join(BLOG_DIR, lang);
  
  try {
    // If a language folder doesn't exist yet, return an empty array
    if (!fs.existsSync(langDir)) {
      return [];
    }

    const files = fs.readdirSync(langDir);
    
    const posts = files
      // Only process .mdx files
      .filter((file) => file.endsWith('.mdx'))
      .map((file) => {
        const filePath = path.join(langDir, file);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const { data } = matter(fileContent);
        
        // Remove .mdx extension to get the slug
        const slug = file.replace(/\.mdx$/, '');
        
        return {
          ...data,
          slug,
        } as BlogPostMeta;
      });

    // Sort posts chronologically by date (newest first)
    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error(`Error reading MDX directory for language ${lang}:`, error);
    return [];
  }
}