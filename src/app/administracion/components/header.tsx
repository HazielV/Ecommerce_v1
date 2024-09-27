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

export default function Header() {
  const { toggle } = useSidebarStore()
  return (
    <div className="w-full h-[68px] bg-white shadow-md px-5 py-3.5 flex justify-between z-20">
      <button onClick={toggle} className="outline-none">
        <Menu />
      </button>

      <DropdownMenu dir="ltr">
        <DropdownMenuTrigger>
          <div className="rounded-full grid place-content-center h-10 w-10 bg-indigo-500 hover:bg-indigo-600 text-white font-medium">
            HE
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-5 w-48">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link href={'/'}>
            <DropdownMenuItem>Inicio</DropdownMenuItem>
          </Link>
          <Link href={'/administracion'}>
            <DropdownMenuItem>Administracion</DropdownMenuItem>
          </Link>
          <Link href={'/perfil'}>
            <DropdownMenuItem>Team</DropdownMenuItem>
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
