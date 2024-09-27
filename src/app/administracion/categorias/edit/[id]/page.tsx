import EditForm from './EditForm'

const getItem = async (id: number) => {
  const response = await fetch(`http://localhost:3000/api/categorias/${id}`, {
    method: 'GET',
    cache: 'no-store',
  })
  if (response.status >= 400) {
    // Devolvemos un error que puede ser manejado
    /*  const error = await response.json() */
    return null
  }
  return response.json()
}
export default async function page({ params }: { params: { id: string } }) {
  const item = await getItem(Number(params.id))

  return <EditForm item={item} />
}
