/* eslint-disable @next/next/no-img-element */
'use client'
import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { FormEvent, Fragment, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  LucideArrowLeft,
  LucideMoveLeft,
  LucideMoveRight,
  LucidePlus,
  LucidePlusCircle,
  LucideUpload,
  LucideX,
} from 'lucide-react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

import { useRouter } from 'next/navigation'
import { Textarea } from '@/components/ui/textarea'

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

export default function CreateForm({ categorias }: { categorias: any[] }) {
  const [detalles, adicionarDetalle, eliminarElemento] = useDetalleState()
  const [images, setImages] = useState<{ preview: string; file: File }[]>([])

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])

    const newImages = files.map((file) => ({
      preview: URL.createObjectURL(file), // URL de previsualización
      file, // Archivo original
    }))

    setImages((prevImages) => [...prevImages, ...newImages])
  }
  const router = useRouter()
  const enviar = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    images.forEach((image) => {
      formData.append('images', image.file) // Envía el archivo original
    })
    const respose = await fetch('http://localhost:3000/api/productos', {
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
          <h1 className="text-3xl font-medium ">Nuevo Producto</h1>
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
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-5 place-items-start">
          <Card className="xl:col-span-2 w-full">
            <CardHeader>
              <CardTitle className="font-medium text-lg">
                Datos Producto
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-white  rounded-xl grid md:grid-cols-2 gap-5">
                <div className="grid w-full items-center gap-1.5 md:col-span-2">
                  <Label htmlFor="nombre">Nombre</Label>
                  <Input
                    type="text"
                    id="nombre"
                    name="nombre"
                    placeholder="Nombre"
                    required
                  />
                </div>

                <div className="grid w-full items-center md:col-span-2 gap-1.5">
                  <Label htmlFor="descripcion">Descripcion</Label>
                  <Textarea
                    id="descripcion"
                    name="descripcion"
                    placeholder="Descripcion del producto"
                    required
                  />
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="precio">Precio (bs)</Label>
                  <Input
                    type="number"
                    id="precio"
                    name="precio"
                    placeholder="Precio"
                    required
                  />
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="categoria">Categoria</Label>
                  <Select name="categoria_id">
                    <SelectTrigger>
                      <SelectValue placeholder="seleccione una categoria" />
                    </SelectTrigger>
                    <SelectContent className="capitalize">
                      {categorias.map((cat, index) => (
                        <SelectItem key={index} value={String(cat.id)}>
                          {cat.nombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="xl:col-span-3 w-full">
            <CardHeader>
              <CardTitle className="font-medium text-lg">
                Imagenes del producto
              </CardTitle>
            </CardHeader>
            <CardContent className="w-full ">
              <div className="px-8 flex flex-col gap-5 w-full">
                <Carousel
                  opts={{
                    align: 'start',
                  }}
                >
                  <CarouselContent className="-ml-4">
                    {images.length > 0 ? (
                      images.map((imagen, index) => (
                        <CarouselItem
                          key={index}
                          className="basis-1/3 h-[250px]"
                        >
                          <div className="h-[250px]">
                            <img
                              className="object-cover aspect-[1/2] h-full w-full "
                              src={imagen.preview}
                              alt={`Imagen ${index + 1}`}
                            />
                          </div>
                        </CarouselItem>
                      ))
                    ) : (
                      <Fragment>
                        <CarouselItem key={1} className="basis-1/3">
                          <div className=" ">
                            <img
                              src="/placeholder.svg"
                              className="object-cover"
                              alt=""
                              height={80}
                              width={200}
                            />
                          </div>
                        </CarouselItem>
                        <CarouselItem key={2} className="basis-1/3">
                          <div className=" ">
                            <img
                              src="/placeholder.svg"
                              className="object-cover"
                              alt=""
                              height={80}
                              width={200}
                            />
                          </div>
                        </CarouselItem>
                        <CarouselItem key={3} className="basis-1/3">
                          <div className=" ">
                            <img
                              src="/placeholder.svg"
                              className="object-cover"
                              alt=""
                              height={80}
                              width={200}
                            />
                          </div>
                        </CarouselItem>
                        <CarouselItem key={4} className="basis-1/3">
                          <div className=" ">
                            <img
                              src="/placeholder.svg"
                              className="object-cover"
                              alt=""
                              height={80}
                              width={200}
                            />
                          </div>
                        </CarouselItem>
                      </Fragment>
                    )}

                    <CarouselPrevious />
                    <CarouselNext />
                  </CarouselContent>
                </Carousel>
                <div className="flex">
                  <input
                    hidden
                    type="file"
                    name=""
                    id="_imagen"
                    multiple
                    onChange={handleImageUpload}
                  />
                  <label
                    htmlFor="_imagen"
                    className="bg-black px-3 py-2 rounded-md text-white w-auto flex items-center gap-2 cursor-pointer"
                  >
                    <span>Subir Imagen</span>
                    <LucideUpload size={18} />
                  </label>
                </div>
              </div>
              {/* <div className="bg-white  rounded-xl flex gap-2 place-items-center">
                <div className=" col-span-3 row-span-2">
                  <img src="/placeholder.svg" alt="" height={250} width={250} />
                </div>
                <div className="max-w-sm ">
                  <img src="/placeholder.svg" alt="" />
                </div>
                <div className="max-w-sm ">
                  <img src="/placeholder.svg" alt="" />
                </div>
                <div className="max-w-sm ">
                  <img src="/placeholder.svg" alt="" />
                </div>
                <div className="max-w-sm ">
                  <img src="/placeholder.svg" alt="" />
                </div>

                
              </div> */}
            </CardContent>
          </Card>
          <Card className="xl:col-span-3 w-full">
            <CardHeader>
              <CardTitle className="font-medium text-lg">
                Detalles del Producto
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="">Titulo (Peso) </TableHead>
                    <TableHead className="">Descripcion (30 kg)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {detalles.map((elem, index) => (
                    <TableRow key={elem}>
                      <TableCell className="font-semibold w-1/3">
                        <Input
                          type="text"
                          placeholder="Titulo"
                          name={`titulo_detalle_${index}`}
                        />
                      </TableCell>
                      <TableCell className="w-full">
                        <Input
                          type="text"
                          placeholder="Descripcion"
                          name={`descripcion_detalle_${index}`}
                        />
                      </TableCell>
                      <TableCell className="">
                        <Button
                          onClick={() => eliminarElemento(elem)}
                          className="px-2"
                          variant={'destructive'}
                          type="button"
                        >
                          <LucideX size={20} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>

            <CardFooter className="border-t p-4 flex items-center justify-center ">
              <Button
                onClick={adicionarDetalle}
                type="button"
                variant={'ghost'}
                className="space-x-2 pl-2.5 capitalize "
              >
                <LucidePlusCircle size={17} />
                <span>Nuevo item</span>
              </Button>
            </CardFooter>
          </Card>
          {/* <Card className="md:col-span-2 w-full">
            <CardHeader>
              <CardTitle className="font-medium text-lg">Inventario</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-white  rounded-xl grid md:grid-cols-2 gap-5">
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="costo">Costo</Label>
                  <Input
                    type="number"
                    id="costo"
                    name="costo"
                    placeholder="Costo total"
                    required
                  />
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="cantidad">Cantidad</Label>
                  <Input
                    type="number"
                    id="cantidad"
                    name="cantidad"
                    placeholder="Cantidad"
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card> */}
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
