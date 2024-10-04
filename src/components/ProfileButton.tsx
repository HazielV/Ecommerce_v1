'use client'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { Button } from '@/components/ui/button'
import { LucideUser } from 'lucide-react'

export default function ProfileButton({ session }: { session: any }) {
  const router = useRouter()
  const logout = async () => {
    const response = await fetch('http://localhost:3000/api/auth', {
      method: 'DELETE',
    })
    if (response.status >= 400) {
      // Devolvemos un error que puede ser manejado
      const error = await response.json()
      return
    }
    router.refresh()
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="outline-none ">
        <Button variant={'ghost'} className=" h-auto">
          <LucideUser />
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

        <Link href={'/administracion/productos'}>
          <DropdownMenuItem>Productos</DropdownMenuItem>
        </Link>
        {session && session.rol === 'ADMINISTRADOR' && (
          <Link href={'/administracion'}>
            <DropdownMenuItem>Administracion</DropdownMenuItem>
          </Link>
        )}
        <DropdownMenuSeparator />
        {!session && (
          <Link href={'login'}>
            <DropdownMenuItem>Ingresar</DropdownMenuItem>
          </Link>
        )}
        {!session && (
          <Link href={'singin'}>
            <DropdownMenuItem>Registrarse</DropdownMenuItem>
          </Link>
        )}
        {session && (
          <DropdownMenuItem onClick={logout}>Cerrar sesion</DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
