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
  const response = await fetch(
    `https://api.github.com/repos/${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO}/issues?state=open&per_page=100`,
    {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        Accept: 'application/vnd.github.v3+json',
      },
      next: { revalidate: 30 },
    },
  )

  if (!response.ok) {
    throw new Error('Failed to fetch likes from GitHub')
  }

  const issues = await response.json()
  return issues.map((issue: any) => parseIssue(issue))
}

export async function getLikeById(id: string): Promise<Like | null> {
  const response = await fetch(
    `https://api.github.com/repos/${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO}/issues/${id}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        Accept: 'application/vnd.github.v3+json',
      },
      next: { revalidate: 30 },
    },
  )

  if (response.status === 404) {
    return null
  }

  if (!response.ok) {
    throw new Error(`Failed to fetch like by id: ${response.statusText}`)
  }

  const issue = await response.json()
  return parseIssue(issue)
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
