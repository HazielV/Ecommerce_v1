'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { FormEvent, useState } from 'react'

import {
  LucideArrowLeft,
  LucideMoveLeft,
  LucideMoveRight,
  LucidePlus,
  LucidePlusCircle,
  LucideUpload,
  LucideX,
} from 'lucide-react'

import { useRouter } from 'next/navigation'
import { Textarea } from '@/components/ui/textarea'
import InputGroup from '@/components/InputGroup'
import InputTextArea from '@/components/InputTextArea'

export default function EditForm({
  item,
}: {
  item: {
    id: number
    nombre: string
    descripcion: string
  } | null
}) {
  const router = useRouter()
  const [errores, setErrores] = useState<Record<string, string[]> | null>(null)
  const enviar = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const response = await fetch(
      `http://localhost:3000/api/categorias/${String(item?.id)}`,
      {
        method: 'PUT',
        body: formData,
      }
    )

    if (response.status >= 400) {
      // Devolvemos un error que puede ser manejado
      const error = await response.json()
      setErrores(error)
      return
    }
    const result = await response.json()
    router.push(result.redirect)
    /* router.refresh() */
  }

  return (
    <form
      onSubmit={enviar}
      className="flex-1  flex flex-col relative overflow-y-auto"
    >
      <div className="flex-1 p-8 pt-10 flex flex-col gap-5">
        <div className="flex justify-between">
          <h1 className="text-3xl font-medium ">Editar Categoria</h1>
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
        <div className="grid grid-cols-1  gap-5 place-items-start">
          <Card className="md:col-span-3 w-full">
            <CardHeader>
              <CardTitle className="font-medium text-lg">
                Datos de la categoria
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-white  rounded-xl grid md:grid-cols-2 gap-5">
                <InputGroup
                  name="nombre"
                  id="nombre"
                  placeholder="Ingrese el nombre de la categoria"
                  label="Nombre"
                  error={errores}
                  defaultValue={item?.nombre}
                />
                <InputTextArea
                  name="descripcion"
                  id="descripcion"
                  placeholder="Descripcion de la categoria"
                  label="Descripcion"
                  error={errores}
                  defaultValue={item?.descripcion}
                />
                {/* <div className="grid w-full items-center gap-1.5 md:col-span-2">
                  <Label htmlFor="nombre">Nombre</Label>
                  <Input
                    type="text"
                    id="nombre"
                    name="nombre"
                    placeholder="Nombre"
                    required
                  />
                </div> */}

                {/* <div className="grid w-full items-center md:col-span-2 gap-1.5">
                  <Label htmlFor="descripcion">Descripcion</Label>
                  <Textarea
                    id="descripcion"
                    name="descripcion"
                    placeholder="Descripcion del producto"
                    required
                  />
                </div> */}
              </div>
            </CardContent>
          </Card>
        </div>
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
