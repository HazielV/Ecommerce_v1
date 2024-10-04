import Lucide_Icon from '@/components/lucide_icono'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Link from 'next/link'
import { getSession } from '@/lib/auth'
import { LucideMapPin, LucideX, Search } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'

interface productos {
  id: number
  nombre: string
  descripcion: string
  precio: number
  categoria: {
    id: number
    nombre: string
  }
  estado: {
    id: number
    descripcion: string
  } | null
}
;[]
const getTodosProductos = async () => {
  const data = await fetch('http://localhost:3000/api/todos_productos', {
    credentials: 'include',
    method: 'GET',
    cache: 'no-store',
  })
  if (data.status != 200) {
    return null
  }

  return data.json()
}
export default async function Home() {
  const productos: productos[] = await getTodosProductos()
  const session: any = await getSession()
  return (
    <main className="flex min-h-screen flex-col items-center pb-10  px-8">
      <aside className="flex px-1 py-5 w-full justify-between items-center">
        <div className="flex gap-10">
          <span className="font-medium uppercase p-2">logo</span>
          <ul className="flex font-medium">
            <Link href={'/'}>
              <Button variant={'ghost'}>Inicio</Button>
            </Link>
            <Link href={'/productos'}>
              <Button variant={'ghost'}>Productos</Button>
            </Link>
            <Link href={'/promociones'}>
              <Button variant={'ghost'}>Promociones</Button>
            </Link>
          </ul>
        </div>
        <div className="flex w-full items-center justify-center px-2 ">
          <label
            htmlFor="search"
            className=" w-full flex px-4 py-2.5  rounded-xl text-gray-400 items-center gap-3 focus-within:text-gray-700 bg-[#F5F5F5]"
          >
            <Search size={20} />
            <input
              id="search"
              name="search"
              type="text"
              placeholder="buscar"
              className="bg-transparent outline-none text-sm w-full"
            />
          </label>
        </div>
        <div className="flex">
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="outline-none ">
              <Button variant={'ghost'} className=" h-auto">
                <Lucide_Icon name="User" size={20} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40">
              <DropdownMenuLabel className="capitalize flex gap-1">
                <span>{session ? session.nombres : 'Cuenta'}</span>
                <span>{session && session.primerapellido}</span>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link href={'/'}>
                <DropdownMenuItem>Perfil</DropdownMenuItem>
              </Link>
              <Link href={'/pedidos'}>
                <DropdownMenuItem>Pedidos</DropdownMenuItem>
              </Link>
              <Link href={'/administracion'}>
                <DropdownMenuItem>Administracion</DropdownMenuItem>
              </Link>
              <Link href={'/administracion/productos'}>
                <DropdownMenuItem>Productos</DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              {!session && (
                <DropdownMenuItem className="">
                  <Link href={'login'}>Ingresar</Link>
                </DropdownMenuItem>
              )}
              {!session && (
                <DropdownMenuItem>
                  <Link href={'singin'}>Registrarse</Link>
                </DropdownMenuItem>
              )}
              {session && <DropdownMenuItem>Cerrar sesion</DropdownMenuItem>}
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="p-2">
            <Lucide_Icon name="ShoppingCart" size={20} />
          </div>
        </div>
      </aside>

      <section className="min-h-[60vh] flex flex-1 w-full gap-2 ">
        {/* buscador */}

        <div className="flex flex-col gap-8 py-2 w-1/6 max-w-[15rem]">
          <div className="space-y-4">
            <div className="text-sm border-b py-2 flex justify-between items-center">
              <h1>Filtros</h1>
              <Button variant={'ghost'} className="capitalize text-xs">
                limpiar todo
              </Button>
            </div>
            <div className="text-sm flex flex-wrap">
              <Button
                className="rounded-full text-xs flex items-center gap-1"
                variant={'secondary'}
              >
                <div className="mt-0.5">Ciudad</div>
                <div className="text-red-600">
                  <LucideX size={15} />
                </div>
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="font-medium text-xs uppercase  text-gray-500 mb-1">
              Ciudad
            </h1>
            <div className="flex items-center space-x-2 text-gray-400 hover:text-gray-600 mb-1">
              <Checkbox
                checked
                id="lapaz"
                className="data-[state=checked]:bg-red-500 outline-none ring-0 data-[state=checked]:border-none border-gray-300 border-2 shadow-none "
              />
              <label
                htmlFor="lapaz"
                className="text-sm font-medium leading-none  peer-disabled:cursor-not-allowed peer-disabled:opacity-70 peer-data-[state=checked]:text-gray-800"
              >
                La Paz
              </label>
            </div>
            <div className="flex items-center space-x-2 text-gray-400 hover:text-gray-600 mb-1">
              <Checkbox
                id="oruro"
                className="data-[state=checked]:bg-red-500 outline-none ring-0 data-[state=checked]:border-none border-gray-300 border-2 shadow-none"
              />
              <label
                htmlFor="oruro"
                className="text-sm font-medium leading-none  peer-disabled:cursor-not-allowed peer-disabled:opacity-70 peer-data-[state=checked]:text-gray-800"
              >
                Oruro
              </label>
            </div>
            <div className="flex items-center space-x-2 text-gray-400 hover:text-gray-600 mb-1">
              <Checkbox
                id="Potosi"
                className="data-[state=checked]:bg-red-500 outline-none ring-0 data-[state=checked]:border-none border-gray-300 border-2 shadow-none"
              />
              <label
                htmlFor="Potosi"
                className="text-sm font-medium leading-none  peer-disabled:cursor-not-allowed peer-disabled:opacity-70 peer-data-[state=checked]:text-gray-800"
              >
                Potosi
              </label>
            </div>
            <div className="flex items-center space-x-2 text-gray-400 hover:text-gray-600 mb-1">
              <Checkbox
                id="Cochabamba"
                className="data-[state=checked]:bg-red-500 outline-none ring-0 data-[state=checked]:border-none border-gray-300 border-2 shadow-none"
              />
              <label
                htmlFor="Cochabamba"
                className="text-sm font-medium leading-none  peer-disabled:cursor-not-allowed peer-disabled:opacity-70 peer-data-[state=checked]:text-gray-800"
              >
                Cochabamba
              </label>
            </div>
            <div className="flex items-center space-x-2 text-gray-400 hover:text-gray-600 mb-1">
              <Checkbox
                id="SantaCruz"
                className="data-[state=checked]:bg-red-500 outline-none ring-0 data-[state=checked]:border-none border-gray-300 border-2 shadow-none"
              />
              <label
                htmlFor="SantaCruz"
                className="text-sm font-medium leading-none  peer-disabled:cursor-not-allowed peer-disabled:opacity-70 peer-data-[state=checked]:text-gray-800"
              >
                Santa Cruz
              </label>
            </div>
            <div className="flex items-center space-x-2 text-gray-400 hover:text-gray-600 mb-1">
              <Checkbox
                id="Tarija"
                className="data-[state=checked]:bg-red-500 outline-none ring-0 data-[state=checked]:border-none border-gray-300 border-2 shadow-none"
              />
              <label
                htmlFor="Tarija"
                className="text-sm font-medium leading-none  peer-disabled:cursor-not-allowed peer-disabled:opacity-70 peer-data-[state=checked]:text-gray-800"
              >
                Tarija
              </label>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="font-medium text-xs uppercase  text-gray-500 mb-1">
              Precio
            </h1>
            <div className="flex items-center space-x-2 text-gray-400 hover:text-gray-600 mb-1">
              <Checkbox
                id="lapaz"
                className="data-[state=checked]:bg-red-500 outline-none ring-0 data-[state=checked]:border-none border-gray-300 border-2 shadow-none "
              />
              <label
                htmlFor="lapaz"
                className="text-sm font-medium leading-none  peer-disabled:cursor-not-allowed peer-disabled:opacity-70 peer-data-[state=checked]:text-gray-800"
              >
                0 - 100
              </label>
            </div>
            <div className="flex items-center space-x-2 text-gray-400 hover:text-gray-600 mb-1">
              <Checkbox
                id="lapaz"
                className="data-[state=checked]:bg-red-500 outline-none ring-0 data-[state=checked]:border-none border-gray-300 border-2 shadow-none "
              />
              <label
                htmlFor="lapaz"
                className="text-sm font-medium leading-none  peer-disabled:cursor-not-allowed peer-disabled:opacity-70 peer-data-[state=checked]:text-gray-800"
              >
                100 - 200
              </label>
            </div>
            <div className="flex items-center space-x-2 text-gray-400 hover:text-gray-600 mb-1">
              <Checkbox
                id="lapaz"
                className="data-[state=checked]:bg-red-500 outline-none ring-0 data-[state=checked]:border-none border-gray-300 border-2 shadow-none "
              />
              <label
                htmlFor="lapaz"
                className="text-sm font-medium leading-none  peer-disabled:cursor-not-allowed peer-disabled:opacity-70 peer-data-[state=checked]:text-gray-800"
              >
                200 - 300
              </label>
            </div>
            <div className="flex items-center space-x-2 text-gray-400 hover:text-gray-600 mb-1">
              <Checkbox
                id="lapaz"
                className="data-[state=checked]:bg-red-500 outline-none ring-0 data-[state=checked]:border-none border-gray-300 border-2 shadow-none "
              />
              <label
                htmlFor="lapaz"
                className="text-sm font-medium leading-none  peer-disabled:cursor-not-allowed peer-disabled:opacity-70 peer-data-[state=checked]:text-gray-800"
              >
                300 - 400
              </label>
            </div>
            <div className="flex items-center space-x-2 text-gray-400 hover:text-gray-600 mb-1">
              <Checkbox
                id="lapaz"
                className="data-[state=checked]:bg-red-500 outline-none ring-0 data-[state=checked]:border-none border-gray-300 border-2 shadow-none "
              />
              <label
                htmlFor="lapaz"
                className="text-sm font-medium leading-none  peer-disabled:cursor-not-allowed peer-disabled:opacity-70 peer-data-[state=checked]:text-gray-800"
              >
                +500
              </label>
            </div>
          </div>
        </div>
        {/* seccion */}
        <div className="flex-1  bg-[#FAFAFA] p-5 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 place-items-start">
          {productos.map((elem) => (
            <div
              key={elem.id}
              className="rounded-xl flex flex-col overflow-hidden  shadow-sm hover:shadow-md cursor-default "
            >
              <div className="p-2 bg-[#F2F2F2]">
                <img
                  className="object-cover"
                  src="./tallado_madera.png"
                  alt=""
                />
              </div>
              <div className="bg-white text-xs  p-3 ">
                <div className="font-bold first-letter:uppercase">
                  {elem.nombre}
                </div>
                <div>{elem.descripcion}</div>

                <div className="mt-3 font-medium text-xl ">
                  {'Bs. '}
                  {elem.precio}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
