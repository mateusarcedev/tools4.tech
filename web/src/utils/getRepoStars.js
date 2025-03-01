export default async function getRepoStars(owner, repo) {
  const query = `
    query {
      repository(owner: "${owner}", name: "${repo}") {
        stargazers {
          totalCount
        }
      }
    }
  `

  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
    body: JSON.stringify({ query }),
  })

  const result = await response.json()

  if (!result.data || !result.data.repository) {
    return null
  }

  return result.data.repository.stargazers.totalCount
}
