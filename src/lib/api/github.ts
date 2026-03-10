export type GitHubRepo = {
  name: string;
  description: string | null;
  url: string;
  stargazerCount: number;
  pushedAt: string;
  primaryLanguage: {
    name: string;
    color: string;
  } | null;
  repositoryTopics: {
    nodes: { topic: { name: string } }[];
  };
};

export async function getLatestRepos(): Promise<GitHubRepo[]> {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

  if (!GITHUB_TOKEN) return [];

  const query = `
    query {
      user(login: "lionel-kaufmann") {
        repositories(first: 6, orderBy: {field: UPDATED_AT, direction: DESC}, privacy: PUBLIC) {
          nodes {
            name
            description
            url
            stargazerCount
            pushedAt
            primaryLanguage {
              name
              color
            }
            repositoryTopics(first: 3) {
              nodes {
                topic {
                  name
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        "User-Agent": "lkmail-portfolio",
      },
      body: JSON.stringify({ query }),
      next: { revalidate: 3600 },
    });

    if (!res.ok) return [];

    const json = (await res.json()) as { 
      data: { user: { repositories: { nodes: GitHubRepo[] } } } 
    };
    
    return json.data.user.repositories.nodes;
  } catch (error) {
    console.error("GitHub API Error:", error);
    return [];
  }
}