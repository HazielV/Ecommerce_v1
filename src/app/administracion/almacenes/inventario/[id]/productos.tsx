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
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  LucideArrowLeft,
  LucideMoveLeft,
  LucideMoveRight,
  LucidePlus,
  LucidePlusCircle,
  LucideUpload,
  LucideX,
  Minus,
  Plus,
  Search,
} from 'lucide-react'

import { useRouter } from 'next/navigation'
import { Textarea } from '@/components/ui/textarea'
import InputGroup from '@/components/InputGroup'
import InputTextArea from '@/components/InputTextArea'
import { Separator } from '@/components/ui/separator'
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command'
type DetalleState = [number[], () => void, (indice: number) => void]
const useDetalleState = (): DetalleState => {
  const [detalles, setDetalles] = useState<number[]>([1])
  const adicionarDetalle = () => {
    setDetalles((prev) => [...prev, (prev.at(-1) || 0) + 1])
  }
  const eliminarElemento = (indice: number) => {
    setDetalles((prev) => prev.filter((elem) => elem !== indice))
  }
  return [detalles, adicionarDetalle, eliminarElemento]
}
export default function Productos({
  item,
}: {
  item: {
    id: number
    nombre: string
    direccion: string
    estado: {
      id: number
      descripcion: string
    } | null
  } | null
}) {
  const router = useRouter()
  const [detalles, adicionarDetalle, eliminarElemento] = useDetalleState()
  const [errores, setErrores] = useState<Record<string, string[]> | null>(null)
  const enviar = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const response = await fetch(
      `http://localhost:3000/api/almacenes/${String(item?.id)}`,
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
    router.refresh()
  }

  return (
    <form
      onSubmit={enviar}
      className="flex-1  flex flex-col relative overflow-y-auto"
    >
      <div className="flex-1 p-8 pt-10 flex flex-col gap-5">
        <div className="flex justify-between">
          <h1 className="text-3xl font-medium ">Inventario</h1>
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
          <div className="grid grid-cols-2 w-full bg-white p-4 rounded-md border ">
            <div>
              <span className="font-medium capitalize text-gray-400 text-sm">
                nombre
              </span>
              <div className="text-sm font-medium">{item?.nombre}</div>
            </div>

            <div className="border-l px-4">
              <span className="font-medium capitalize text-gray-400 text-sm">
                Direccion
              </span>
              <div className="text-sm font-medium"> {item?.direccion}</div>
            </div>
          </div>
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="font-medium text-lg">
                Adicionar producto
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full flex items-center justify-center">
                <div className="flex rounded-full border p-2 items-center w-full px-3 gap-1">
                  <Search size={18} />
                  <input
                    type="text"
                    placeholder="buscar producto"
                    className="outline-none border-none px-2 w-full text-sm"
                  />
                </div>
              </div>
              <Table className="mt-2">
                <TableHeader>
                  <TableRow>
                    <TableHead className="">Producto </TableHead>
                    <TableHead className="">Codigo</TableHead>
                    <TableHead className="">Cantidad</TableHead>
                    <TableHead className="">Costo</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {detalles.map((elem, index) => (
                    <TableRow key={elem}>
                      <TableCell className="font-semibold w-1/3">
                        <span> Producto </span>
                      </TableCell>
                      <TableCell className="font-medium">
                        <span> 1354 </span>
                      </TableCell>
                      <TableCell className="w-20 ">
                        <div className="flex items-center w-auto bg-gray-100 p-1 rounded-md">
                          <Button
                            variant={'ghost'}
                            className="border rounded-md h-auto py-1  p-1.5 bg-white hover:bg-white text-gray-400 hover:text-blue-600"
                          >
                            <Minus size={18} />
                          </Button>
                          <input
                            type="text"
                            name=""
                            id=""
                            defaultValue={0}
                            className="w-8 px-1 bg-transparent outline-none border-none text-center"
                          />
                          <Button
                            variant={'ghost'}
                            className="border  h-auto rounded-md py-1  p-1.5 bg-white hover:bg-white text-gray-400 hover:text-blue-600"
                          >
                            <Plus size={18} />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium w-32">
                        <span> 500 </span>
                      </TableCell>
                      <TableCell className="w-10">
                        <Button
                          onClick={() => eliminarElemento(elem)}
                          className="px-2"
                          variant={'destructive'}
                          type="button"
                        >
                          <LucideX size={18} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
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
