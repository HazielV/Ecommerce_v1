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

interface UserPayload {
  nombres?: string
  primerapellido?: string
  segundoapellido?: string
  rol?: string
}
export default async function Home() {
  const session: any = await getSession()
  return (
    <main className="flex min-h-screen flex-col items-center pb-10  px-10">
      <aside className="flex px-1 py-5 w-full justify-between">
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

        <div className="flex ">
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="outline-none ">
              <Button variant={'ghost'} className=" h-auto">
                <Lucide_Icon name="User" />
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
            <Lucide_Icon name="ShoppingCart" />
          </div>
        </div>
      </aside>
      {/* baner 1 */}
      <div className="min-h-[80vh] bg-[#F2F3F5] w-full flex flex-col md:flex-row items-center justify-evenly py-10 px-5">
        {/* titulo articulo */}
        <div className="flex flex-col gap-4">
          <h1 className="text-5xl font-medium max-w-xl">
            Descubre Artesanías Únicas y Auténticas
          </h1>
          <p className="max-w-sm">
            Compra artesanías de todo tipo: tejidos, cerámicas, joyería,
            tallados en madera, productos en cuero, y mucho más.
          </p>
          <div>
            <Button
              className="w-auto bg-transparent font-medium border-2 border-gray-900/60 capitalize hover:bg-gray-900/5 px-8 "
              variant={'outline'}
            >
              ver mas
            </Button>
          </div>
        </div>
        {/* seccion imagen */}
        <div className="relative">
          <div className="z-0 bg-white absolute p-6 py-6 rounded-md -left-14 leading-tight flex flex-col pr-20 pb-4">
            <span className="font-medium text-xs text-gray-500">
              Artesanías en madera
            </span>
            <h1 className="font-medium text-lg">Persona tallada en madera</h1>
            <div className="flex gap-1 py-2 items-center text-gray-300">
              <div className="text-yellow-500 flex gap-1 items-center">
                <Lucide_Icon name="Star" size={16} />
                <Lucide_Icon name="Star" size={16} />
                <Lucide_Icon name="Star" size={16} />
                <Lucide_Icon name="Star" size={16} />
              </div>
              <Lucide_Icon name="Star" size={16} />
              <span className="text-sm text-gray-600 font-medium pl-2">
                1304 comentarios
              </span>
            </div>
            <div className="">
              <span className="font-medium text-2xl">Bs. 250</span>
            </div>
            <div className="flex gap-2 items-center pt-2 text-gray-400">
              <span className="uppercase text-xs font-medium">ver mas</span>
              <Lucide_Icon name="MoveRight" size={20} />
            </div>
          </div>
          <div className="z-20 relative">
            <img
              className="max-w-lg w-full z-20"
              src="./tallado_madera.png"
              alt=""
            />
          </div>
        </div>
      </div>
      {/* baner 2 */}
      <div className="min-h-[20vh] w-full grid md:grid-cols-2 gap-5  mt-8">
        <div className="h-full flex-1 bg-[#F8F3F0] flex items-center justify-between p-6">
          <div className="flex flex-col h-full justify-evenly">
            <h1 className="font-semibold capitalize ">
              compras <span className="normal-case">del</span> dia
            </h1>
            <p className="text-sm max-w-md">
              Encuentra descuentos en artesanías seleccionadas, disponibles solo
              por hoy. Productos auténticos y de calidad.
            </p>
          </div>
        </div>
        <div className="h-full flex-1 bg-[#F8F3F0] flex items-center justify-between overflow-hidden ">
          <div className="flex flex-col h-full justify-evenly p-6">
            <h1 className="font-semibold capitalize ">
              Promociones <span className="normal-case">y</span> descuentos
            </h1>
            <p className="text-sm max-w-md">
              Explora nuestras promociones y descuentos en una variedad de
              artesanías. Obtén piezas únicas a precios reducidos por tiempo
              limitado.
            </p>
          </div>
          <div className="h-60 relative bottom-6 left-12">
            <img className="max-w-[18rem]" src="./reloj.png" alt="" />
          </div>
        </div>
      </div>
    </main>
  )
}
