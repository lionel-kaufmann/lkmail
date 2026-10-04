import { getDictionary, Locale } from "@/getDictionary";
import PageHeader from "@/components/PageHeader";
import { getLatestRepos } from "@/lib/api/github";
import { Star, ExternalLink, CalendarDays } from "lucide-react";

// 🔒 STRICT SSG: Keep architecture perfectly uniform with the blog
export const dynamicParams = false;

// 📦 Tell Next.js to pre-build the English and French project pages
export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "fr" }];
}

export default async function ProjectsPage({ 
  params 
}: { 
  params: Promise<{ lang: string }> 
}) {
  const { lang } = await params;
  
  const [dict, repos] = await Promise.all([
    getDictionary(lang as Locale),
    getLatestRepos(),
  ]);

  return (
    <div className="flex flex-col gap-12 pb-16">
      <PageHeader 
        title={dict.projects.title} 
        description={dict.projects.description} 
      />

      {repos.length === 0 ? (
        <p className="text-gray-500">No projects found. Please check the GitHub token.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {repos.map((repo) => {
            const lastUpdated = new Date(repo.pushedAt).toLocaleDateString(lang, {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            });

            return (
              <article
                key={repo.name}
                className="group flex flex-col justify-between p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0a0a0a] shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-fuchsia-500 transition-all duration-300"
              >
                <div className="space-y-4">
                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start justify-between gap-4 rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fuchsia-500"
                  >
                    <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100 group-hover:text-fuchsia-500 transition-colors">
                      {repo.name}
                    </h3>
                    <ExternalLink aria-hidden="true" className="h-5 w-5 text-gray-400 group-hover:text-fuchsia-500 transition-colors" />
                  </a>
                  
                  <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">
                    {repo.description || "No description provided yet."}
                  </p>

                  {repo.repositoryTopics.nodes.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {repo.repositoryTopics.nodes.map(({ topic }) => (
                        <span 
                          key={topic.name} 
                          className="px-2.5 py-1 rounded-md bg-gray-100 dark:bg-gray-800 text-xs font-medium text-gray-600 dark:text-gray-300"
                        >
                          {topic.name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="mt-8 pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs font-medium text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-4">
                    {repo.primaryLanguage && (
                      <div className="flex items-center gap-1.5">
                        <span 
                          className="w-2.5 h-2.5 rounded-full" 
                          style={{ backgroundColor: repo.primaryLanguage.color }}
                        />
                        <span>{repo.primaryLanguage.name}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5" />
                      <span>{repo.stargazerCount}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1.5">
                    <CalendarDays className="h-3.5 w-3.5" />
                    <span>{lastUpdated}</span>
                  </div>
                </div>
                <div className="mt-6 flex flex-wrap gap-4 text-sm font-medium">
                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-fuchsia-600 dark:text-fuchsia-400 underline underline-offset-4 hover:text-fuchsia-500"
                  >
                    {dict.projects.viewOnGithub}
                  </a>
                  {repo.url === "https://github.com/lionel-kaufmann/lkmail" && (
                    <a
                      href="https://github.com/users/lionel-kaufmann/projects/1/views/1"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-fuchsia-600 dark:text-fuchsia-400 underline underline-offset-4 hover:text-fuchsia-500"
                    >
                      {dict.projects.viewRoadmap}
                    </a>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}