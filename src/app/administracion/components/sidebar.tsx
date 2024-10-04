'use client'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { usePathname } from 'next/navigation'
import useSidebarStore from '@/store/sidebar'
import { icons, X } from 'lucide-react'

import React from 'react'
import Link from 'next/link'
import Lucide_Icon from '@/components/lucide_icono'

type IconName = keyof typeof icons
interface menu {
  id: number
  descripcion: string
  icono: IconName
  url: string
  path: string
}
const generarMenus = (rol: string) => {
  const menus: menu[] = [
    {
      id: 4,
      descripcion: 'productos',
      icono: 'Package',
      path: 'productos',
      url: '/administracion/productos',
    },

    /* {
      id: 3,
      descripcion: 'clientes',
      icono: 'UsersRound',
      path: 'clientes',
      url: '/administracion/clientes',
    },
    {
      id: 4,
      descripcion: 'productos',
      icono: 'Package',
      path: 'productos',
      url: '/administracion/productos',
    }, */
  ]
  if (rol === 'ADMINISTRADOR') {
    menus.push({
      id: 2,
      descripcion: 'usuarios',
      icono: 'SquareUser',
      path: 'usuarios',
      url: '/administracion/usuarios',
    })
    /* menus.push({
      id: 3,
      descripcion: 'clientes',
      icono: 'UsersRound',
      path: 'clientes',
      url: '/administracion/clientes',
    }) */

    menus.push({
      id: 5,
      descripcion: 'Categorias',
      icono: 'LayoutGrid',
      path: 'categorias',
      url: '/administracion/categorias',
    })
    menus.push({
      id: 6,
      descripcion: 'Almacenes',
      icono: 'Container',
      path: 'almacenes',
      url: '/administracion/almacenes',
    })
  }

  return menus
}

export default function Sidebar({ rol }: { rol: string }) {
  const pathname = usePathname()

  const menus = generarMenus(rol)

  const { isOpen, toggle } = useSidebarStore()

  return (
    <div
      id="elemento"
      className="z-30  px-3 fixed transition-all duration-300 bg-white w-60 h-full shadow-lg data-[sidebar=true]:-translate-x-full md:data-[sidebar=true]:translate-x-0 md:data-[sidebar=true]:w-[64px] md:relative md:data-[sidebar=false]:w-60 flex flex-col gap-3 py-20 "
      data-sidebar={isOpen}
    >
      <button
        onClick={toggle}
        className="absolute top-3 right-3  transition duration-300 hover:rotate-90 md:hidden block  "
      >
        <X width={30} height={30} />
      </button>

      <TooltipProvider delayDuration={0}>
        <React.Fragment>
          {!isOpen ? (
            <Link href={'/administracion'}>
              <div
                className={
                  'flex px-2.5 py-2.5  rounded-md items-center gap-3 font-medium capitalize text-sm cursor-pointer ' +
                  (pathname === '/administracion'
                    ? ' bg-indigo-50/60 text-indigo-600'
                    : ' hover:bg-indigo-50/60')
                }
              >
                <div className="">
                  <Lucide_Icon name={'House'} size={20} />
                </div>
                <span className="text-black">inicio</span>
              </div>
            </Link>
          ) : (
            <nav>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link href={'/administracion'}>
                    <div
                      className={
                        'px-2.5 py-2.5  rounded-md cursor-pointer ' +
                        (pathname === '/administracion'
                          ? ' bg-indigo-50/60 text-indigo-600'
                          : ' hover:bg-indigo-50/60')
                      }
                    >
                      <Lucide_Icon name={'House'} size={20} />
                    </div>
                  </Link>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="flex items-center capitalize gap-4 cursor-pointer bg-black text-white "
                >
                  <span>inicio</span>
                </TooltipContent>
              </Tooltip>
            </nav>
          )}
        </React.Fragment>
        {menus.map((elem, index) => (
          <React.Fragment key={index}>
            {!isOpen ? (
              <Link href={elem.url}>
                <div
                  className={
                    'flex px-2.5 py-2.5  rounded-md items-center gap-3 font-medium capitalize text-sm cursor-pointer ' +
                    (pathname.includes(elem.path)
                      ? ' bg-indigo-50/60 text-indigo-600'
                      : ' hover:bg-indigo-50/60')
                  }
                >
                  <div className="">
                    <Lucide_Icon name={elem.icono} size={20} />
                  </div>
                  <span className="text-black">{elem.descripcion}</span>
                </div>
              </Link>
            ) : (
              <nav>
                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <Link href={elem.url}>
                      <div
                        className={
                          'px-2.5 py-2.5  rounded-md cursor-pointer transition-colors duration-300 ' +
                          (pathname.includes(elem.path)
                            ? ' bg-indigo-50/60 text-indigo-600'
                            : ' hover:bg-indigo-50/60')
                        }
                      >
                        <Lucide_Icon name={elem.icono} size={20} />
                      </div>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent
                    side="right"
                    className="flex items-center capitalize gap-4 cursor-pointer bg-black text-white "
                  >
                    <span>{elem.descripcion}</span>
                  </TooltipContent>
                </Tooltip>
              </nav>
            )}
          </React.Fragment>
        ))}
      </TooltipProvider>
    </div>
  )
}
