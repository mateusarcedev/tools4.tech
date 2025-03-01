export default async function getContributors(owner, repo) {
  const query = `
    query {
      repository(owner: "${owner}", name: "${repo}") {
        defaultBranchRef {
          target {
            ... on Commit {
              history(first: 100) {
                edges {
                  node {
                    author {
                      user {
                        login
                        avatarUrl
                        name
                        followers {
                          totalCount
                        }
                        repositories {
                          totalCount
                        }
                      }
                    }
                  }
                }
              }
            }
          }
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
  const { data } = result

  if (!data || !data.repository) {
    return null
  }

  if (!data.repository.defaultBranchRef) {
    return null
  }

  const commits = data.repository.defaultBranchRef.target.history.edges

  const contributionsMap = new Map()

  commits.forEach(({ node }) => {
    if (node.author?.user) {
      const { login, avatarUrl, name, followers, repositories } =
        node.author.user
      if (!contributionsMap.has(login)) {
        contributionsMap.set(login, {
          login,
          avatar_url: avatarUrl,
          name: name || login,
          followers: followers?.totalCount || 0,
          public_repos: repositories?.totalCount || 0,
          contributions: 0,
        })
      }
      contributionsMap.get(login).contributions += 1
    }
  })

  return Array.from(contributionsMap.values())
}
