import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import Card from '@/components/Card'
import { getServerSession } from 'next-auth'

export const metadata = {
  title: 'Favorites - Tools4.tech',
}

async function getFavorites(userId) {
  try {
    const response = await fetch(
      `${process.env.URL_API}/favorites/user/${userId}`,
      {
        method: 'GET',
        cache: 'no-store',
      },
    )

    if (!response.ok) {
      return null
    }

    const data = await response.json()
    return data
  } catch (error) {
    return null
  }
}

export default async function Favorites() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return (
      <div className='flex flex-col justify-center items-center h-screen'>
        <h2 className='text-xl font-semibold mb-4'>
          You need to sign in first!
        </h2>
        <p className='text-gray-600'>Please log in to view your favorites.</p>
      </div>
    )
  }

  const favorites = await getFavorites(session?.user?.githubId)

  if (!favorites || favorites.length === 0) {
    return (
      <div className='flex flex-col justify-center items-center h-screen'>
        <h2 className='text-xl font-semibold mb-4'>No favorites found</h2>
        <p className='text-gray-600'>
          You haven't added any tools to your favorites yet.
        </p>
      </div>
    )
  }

  return (
    <div className='w-4/5 mx-auto py-8'>
      <h1 className='text-2xl font-bold mb-6'>My Favorites</h1>
      <div className='grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-5 gap-5'>
        {favorites &&
          favorites.map(fav => (
            <div key={fav.id}>
              <Card tool={fav.tool} isFavorite={true} favoriteId={fav.id} />
            </div>
          ))}
      </div>
    </div>
  )
}
