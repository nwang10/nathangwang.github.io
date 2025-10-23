import mockData from '../data/now.mock.json';

export interface GitHubCommit {
  repo: string;
  message: string;
  timestamp: string;
  url: string;
}

export interface GitHubStats {
  publicRepos: number;
  followers: number;
  following: number;
}

export const fetchLatestCommit = async (): Promise<GitHubCommit> => {
  const username = import.meta.env.VITE_GITHUB_USERNAME || 'nwang10';

  try {
    // Fetch user's repos
    const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=10`);
    if (!reposResponse.ok) throw new Error('Failed to fetch repos');

    const repos = await reposResponse.json();

    // Fetch commits from the most recently updated repo
    for (const repo of repos) {
      try {
        const commitsResponse = await fetch(`https://api.github.com/repos/${username}/${repo.name}/commits?per_page=1`);
        if (!commitsResponse.ok) continue;

        const commits = await commitsResponse.json();
        if (commits.length > 0) {
          const latestCommit = commits[0];
          return {
            repo: repo.name,
            message: latestCommit.commit.message,
            timestamp: latestCommit.commit.author.date,
            url: repo.html_url
          };
        }
      } catch {
        continue;
      }
    }

    throw new Error('No commits found');
  } catch (error) {
    console.warn('Using mock GitHub data:', error);
    return mockData.github.lastCommit;
  }
};

export const fetchGitHubStats = async (): Promise<GitHubStats> => {
  const username = import.meta.env.VITE_GITHUB_USERNAME || 'nwang10';

  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    if (!response.ok) throw new Error('Failed to fetch user data');

    const data = await response.json();
    return {
      publicRepos: data.public_repos,
      followers: data.followers,
      following: data.following
    };
  } catch (error) {
    console.warn('Using mock GitHub stats:', error);
    return mockData.github.stats;
  }
};
