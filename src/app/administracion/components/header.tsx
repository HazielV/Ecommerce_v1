'use client'

import useSidebarStore from '@/store/sidebar'
import { Menu } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Lucide_Icon from '@/components/lucide_icono'
import Link from 'next/link'
import { getSession } from '@/lib/auth'

export default function Header({ session }: { session: any }) {
  const { toggle } = useSidebarStore()
  return (
    <div className="w-full h-[68px] bg-white shadow-md px-5 py-3.5 flex justify-between z-20">
      <button onClick={toggle} className="outline-none">
        <Menu />
      </button>

      <DropdownMenu dir="ltr">
        <DropdownMenuTrigger>
          <div className="rounded-full grid place-content-center h-10 w-10 bg-indigo-500 hover:bg-indigo-600 text-white font-medium ">
            <div className="flex uppercase">
              <span>{session ? session.nombres.at(0) : 'NN'}</span>
              <span>{session && session.primerapellido.at(0)}</span>
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-5 w-48">
          <DropdownMenuLabel className="capitalize flex gap-1">
            <span>{session ? session.nombres : 'Cuenta'}</span>
            <span>{session && session.primerapellido}</span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link href={'/'}>
            <DropdownMenuItem>Inicio</DropdownMenuItem>
          </Link>
          <Link href={'/administracion'}>
            <DropdownMenuItem>Administracion</DropdownMenuItem>
          </Link>

          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <form
              id="cerrar_sesion"
              className="flex gap-2 items-center capitalize w-full justify-between"
            >
              <span>cerrar sesion</span>
              <button
                type="submit"
                form="cerrar_sesion"
                onClick={() => console.log('hola')}
              >
                <Lucide_Icon name="LogOut" size={18} />
              </button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
