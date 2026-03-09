import { getDictionary, Locale } from "@/getDictionary";
import PageHeader from "@/components/PageHeader";
import { getLatestRepos } from "@/lib/api/github";

export default async function ProjectsPage({ 
  params 
}: { 
  params: Promise<{ lang: string }> 
}) {
  // Await the Next.js 15 dynamic params
  const { lang } = await params;
  
  // Fetch dictionary and API data in parallel for maximum performance
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
          {repos.map((repo) => (
            <a 
              key={repo.name} 
              href={repo.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex flex-col justify-between p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-[#0a0a0a] hover:border-fuchsia-500 transition-colors"
            >
              <div className="space-y-3">
                <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100 group-hover:text-fuchsia-500 transition-colors">
                  {repo.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">
                  {repo.description || "No description provided."}
                </p>
              </div>
              
              <div className="mt-6 flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  {repo.primaryLanguage && (
                    <>
                      <span 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: repo.primaryLanguage.color }}
                      />
                      <span className="text-gray-600 dark:text-gray-400">
                        {repo.primaryLanguage.name}
                      </span>
                    </>
                  )}
                </div>
                <div className="flex items-center gap-1 text-gray-500">
                  <span>★</span>
                  <span>{repo.stargazerCount}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}