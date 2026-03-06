export interface Like {
  id: number
  url: string
  src: string
  tags: string[]
  title: string
  number: number
  pageUrl: string
  imageUrl: string | null
  category: string
  githubUrl: string
  createdAt: string
  description: string
}

export async function getLikes(): Promise<Like[]> {
  const repoConfig = getRepoConfig()
  if (!repoConfig) {
    return []
  }

  try {
    const response = await fetch(
      `https://api.github.com/repos/${repoConfig.owner}/${repoConfig.repo}/issues?state=open&per_page=100`,
      {
        headers: getGitHubHeaders(),
        next: { revalidate: 30 },
      },
    )

    if (!response.ok) {
      console.warn(
        `[github] Failed to fetch likes: ${response.status} ${response.statusText}`,
      )
      return []
    }

    const issues = await response.json()
    if (!Array.isArray(issues)) {
      return []
    }

    return issues.map((issue: any) => parseIssue(issue))
  } catch (error) {
    console.error('[github] Failed to fetch likes from GitHub', error)
    return []
  }
}

export async function getLikeById(id: string): Promise<Like | null> {
  const repoConfig = getRepoConfig()
  if (!repoConfig) {
    return null
  }

  try {
    const response = await fetch(
      `https://api.github.com/repos/${repoConfig.owner}/${repoConfig.repo}/issues/${id}`,
      {
        headers: getGitHubHeaders(),
        next: { revalidate: 30 },
      },
    )

    if (response.status === 404) {
      return null
    }

    if (!response.ok) {
      console.warn(
        `[github] Failed to fetch like ${id}: ${response.status} ${response.statusText}`,
      )
      return null
    }

    const issue = await response.json()
    return parseIssue(issue)
  } catch (error) {
    console.error(`[github] Failed to fetch like ${id}`, error)
    return null
  }
}

function getRepoConfig():
  | {
      owner: string
      repo: string
    }
  | null {
  const owner = process.env.GITHUB_OWNER?.trim()
  const repo = process.env.GITHUB_REPO?.trim()

  if (!owner || !repo) {
    console.warn(
      '[github] GITHUB_OWNER or GITHUB_REPO is missing; returning empty likes data',
    )
    return null
  }

  return { owner, repo }
}

function getGitHubHeaders(): HeadersInit {
  const token = process.env.GITHUB_TOKEN?.trim()

  if (!token) {
    return {
      Accept: 'application/vnd.github.v3+json',
    }
  }

  return {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github.v3+json',
  }
}

function parseIssue(issue: any): Like {
  const body = issue.body || ''

  const tagsString = extractField(body, 'Tags')
  const tags =
    tagsString === 'N/A' || !tagsString
      ? []
      : tagsString
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean)

  const categoryFromBody = extractField(body, 'Category')

  return {
    id: issue.id,
    number: issue.number,
    title: issue.title,
    url: issue.html_url,
    description: extractField(body, 'Description'),
    pageUrl: extractField(body, 'URL'),
    src: extractField(body, 'Source'),
    imageUrl:
      extractField(body, 'Image') === 'N/A'
        ? null
        : extractField(body, 'Image'),

    category: categoryFromBody !== 'N/A' ? categoryFromBody : 'other',
    tags: tags,

    createdAt: issue.created_at,
    githubUrl: issue.html_url,
  }
}

function extractField(body: string, fieldName: string): string {
  const regex = new RegExp(`\\*\\*${fieldName}:\\*\\* (.+)`)
  const match = body.match(regex)
  return match?.[1]?.trim() || 'N/A'
}
