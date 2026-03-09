export type GitHubRepo = {
  name: string;
  description: string | null;
  url: string;
  stargazerCount: number;
  primaryLanguage: {
    name: string;
    color: string;
  } | null;
};

export async function getLatestRepos(): Promise<GitHubRepo[]> {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

  if (!GITHUB_TOKEN) {
    console.warn("GITHUB_TOKEN is not set. Returning empty projects list.");
    return [];
  }

  const query = `
    query {
      user(login: "lionel-kaufmann") {
        repositories(first: 6, orderBy: {field: UPDATED_AT, direction: DESC}, privacy: PUBLIC) {
          nodes {
            name
            description
            url
            stargazerCount
            primaryLanguage {
              name
              color
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
      },
      body: JSON.stringify({ query }),
      next: { revalidate: 3600 },
    });

    if (!res.ok) throw new Error("Failed to fetch GitHub data");

    // Strictly type the expected JSON response to satisfy the TS compiler
    const json = (await res.json()) as { 
      data: { user: { repositories: { nodes: GitHubRepo[] } } } 
    };
    
    return json.data.user.repositories.nodes;
  } catch (error) {
    console.error("GitHub API Error:", error);
    return [];
  }
}