import CreateForm from './CreateForm'
const getCategorias = async () => {
  const respose = await fetch('http://localhost:3000/api/categorias', {
    method: 'GET',
  })
  return respose.json()
}
export default async function page() {
  const categorias = await getCategorias()

  return <CreateForm categorias={categorias} />
}
