'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FormEvent } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { LucideArrowLeft, LucideMoveLeft, LucideMoveRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface usuario_persona {
  id: true
  correoelectronico: true
  rol: true
  estado: true
  persona: {
    select: {
      nombres: true
      primerapellido: true
      segundoapellido: true
    }
  }
}
export default function CreateForm() {
  const router = useRouter()
  const enviar = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const respose = await fetch('http://localhost:3000/api/usuarios', {
      method: 'POST',
      body: formData,
    })
    console.log(formData)
  }
  return (
    <form
      onSubmit={enviar}
      className="flex-1  flex flex-col relative overflow-y-auto"
    >
      <div className="flex-1 p-8 pt-10 flex flex-col gap-5">
        <div className="flex justify-between">
          <h1 className="text-3xl font-medium ">Nuevo usuario</h1>
          <Button
            type="button"
            onClick={() => router.back()}
            className="flex gap-3 pl-3"
            variant={'outline'}
          >
            <LucideMoveLeft />
            <span>Volver</span>
          </Button>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="font-medium text-lg">Datos Persona</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-white  rounded-xl grid md:grid-cols-2 gap-5">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="nombres">Nombre</Label>
                <Input
                  type="text"
                  id="nombres"
                  name="nombres"
                  placeholder="Nombre"
                  required
                />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="nrodocumento">Nro documento</Label>
                <Input
                  type="number"
                  id="nrodocumento"
                  name="nrodocumento"
                  placeholder="Nro documento"
                  required
                />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="primerapellido">Primer Apellido</Label>
                <Input
                  type="text"
                  id="primerapellido"
                  name="primerapellido"
                  placeholder="Primer Apellido"
                  required
                />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="segundoapellido">Segundo Apellido</Label>
                <Input
                  type="text"
                  id="segundoapellido"
                  name="segundoapellido"
                  placeholder="Segundo Apellido"
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="font-medium text-lg">Datos Usuario</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-white  rounded-xl grid md:grid-cols-2 gap-5">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="correoelectronico">Correo</Label>
                <Input
                  type="text"
                  id="correoelectronico"
                  name="correoelectronico"
                  placeholder="Correo Electronico"
                  required
                />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  name="password"
                  type="password"
                  id="password"
                  placeholder="Contraseña"
                  required
                />
              </div>
              <div className="grid items-center gap-1.5 w-1/2">
                <Label htmlFor="password">Rol del usuario</Label>
                <Select name="rol">
                  <SelectTrigger>
                    <SelectValue placeholder="seleccione un rol" />
                  </SelectTrigger>
                  <SelectContent className="capitalize">
                    <SelectItem value="ARTESANO">ARTESANO</SelectItem>
                    <SelectItem value="COMPRADOR">COMPRADOR</SelectItem>
                    <SelectItem value="DELIVERY">DELIVERY</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="flex sticky bottom-0 bg-white justify-end w-full md:col-span-2  text-sm px-4 py-4 border-t">
        <Button
          variant={'default'}
          className="bg-indigo-600 hover:bg-indigo-700"
        >
          Guardar
        </Button>
      </div>
    </form>
  )
}
