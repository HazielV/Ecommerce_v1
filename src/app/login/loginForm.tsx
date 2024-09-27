'use client'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import InputGroup from '@/components/InputGroup'

export default function LoginForm() {
  const [errores, setErrores] = React.useState<Record<string, string[]> | null>(
    null
  )
  const router = useRouter()
  const enviar = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const response = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      body: formData,
      redirect: 'follow',
    })

    if (response.status >= 400) {
      // Devolvemos un error que puede ser manejado
      const error = await response.json()
      setErrores(error)
      return
    }
    const result = await response.json()
    router.push(result.redirect)
  }

  return (
    <form
      onSubmit={enviar}
      className=" md:max-w-lg  flex flex-col gap-10 p-10  self-center justify-self-center col-span-3 md:col-span-2 w-full"
    >
      <h1 className="font-medium text-2xl relative mb-2">
        <span>Bienvenido al sistema</span>
        {errores && errores['credenciales'] && (
          <div className="text-sm font-medium text-red-600 absolute top-full mt-1">
            {errores['credenciales']}
          </div>
        )}
      </h1>

      <div className="grid w-full items-center gap-5 ">
        <InputGroup
          error={errores}
          id="correoelectronico"
          name="correoelectronico"
          label="Correo Electronico"
          placeholder="Escriba su correo electronico"
          type="email"
          required
        />
        <InputGroup
          error={errores}
          id="password"
          name="password"
          label="Constraseña"
          placeholder="Escriba su contraseña"
          type="password"
          required
        />

        {/* <div className="flex flex-col space-y-1.5 relative">
          <Label htmlFor="correoelectronico">Correo Electronico</Label>
          <Input
            className="p-3 px-4 h-auto"
            id="correoelectronico"
            name="correoelectronico"
            type="email"
            placeholder="Escriba su correo electronico"
          />
          {errores && errores['correoelectronico'] && (
            <div className="text-xs absolute -bottom-4 font-medium text-red-600 first-letter:capitalize  right-0">
              {errores['correoelectronico'][0]}
            </div>
          )}
        </div> */}
        {/* <div className="flex flex-col space-y-1.5 relative">
          <Label htmlFor="password">Constraseña</Label>
          <Input
            className="p-3 px-4 h-auto"
            id="password"
            name="password"
            type="password"
            placeholder="Escriba su contraseña"
          />
          {errores && errores['password'] && (
            <div className="text-xs absolute -bottom-4 font-medium text-red-600 first-letter:capitalize  right-0">
              {errores['password'][0]}
            </div>
          )}
        </div> */}
      </div>
      <div className="flex flex-col ">
        <Button
          type="submit"
          className="flex-1 h-auto py-3 bg-[#065AD8] hover:bg-[#065AD8] hover:shadow-md"
        >
          Ingresar
        </Button>
        <div className="self-end">
          <Link href={'singin'}>
            <Button
              type="button"
              variant={'ghost'}
              className="flex-1 px-0 h-auto py-3 focus:bg-transparent hover:bg-transparent text-sx text-[#065AD8]/90 hover:text-[#065AD8]"
            >
              Crear una cuenta
            </Button>
          </Link>
        </div>
      </div>
    </form>
  )
}
