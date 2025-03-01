import Card from '@/components/Card'

export const metadata = {
  title: 'Tools - Tools4.tech',
}

const getToolsByCategory = async nameCategory => {
  const response = await fetch(
    `${process.env.URL_API}/tools/category/${nameCategory}`,
    {
      method: 'GET',
    },
  )

  const data = await response.json()

  return data
}

export default async function ToolsPage({ params }) {
  const nameCategory = (await params).slug

  const tools = await getToolsByCategory(nameCategory)

  return (
    <div className='w-4/5 mx-auto py-8'>
      <h1 className='text-2xl font-bold mb-6 text-center'>{nameCategory.replace('|', '\|')}</h1>
      {tools?.length > 0 ? (
        <div className='flex flex-wrap items-center justify-center gap-6'>
          {tools.map(tool => (
            <Card key={tool.name} tool={tool} />
          ))}
        </div>
      ) : (
        <p className='text-center'>Nenhuma ferramenta encontrada para esta categoria.</p>
      )}
    </div>
  )
}