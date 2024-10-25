import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Usuario } from '@prisma/client'
import Lucide_Icon from '@/components/lucide_icono'
import Eliminar from '@/components/Eliminar'
import { cookies } from 'next/headers'
interface data_schema {
  id: number
  nombre: string
  precio: number
  descripcion: string
  categoria: {
    id: number
    nombre: string
  }
  estado: {
    id: number
    descripcion: string
  } | null
  Inventario: {
    cantidad: number
  }[]
}
;[]
async function getData() {
  const data = await fetch('http://localhost:3000/api/productos', {
    headers: {
      'Content-Type': 'application/json',
      Cookie: cookies().toString(),
    },
    credentials: 'include',
    method: 'GET',
    cache: 'no-store',
  })
  if (data.status != 200) {
    return null
  }

  return data.json()
}

export default async function page() {
  const data: data_schema[] = await getData()

  return (
    <div className="flex flex-col overflow-y-auto p-8 pt-10 gap-5">
      <div className="flex justify-between items-center ">
        <h1 className="font-medium text-3xl">Mis Productos</h1>
        <Link href={'productos/create'}>
          <Button className="text-xs">nuevo producto</Button>
        </Link>
      </div>
      <Card x-chunk="">
        <CardHeader>
          <CardTitle>Lista de Productos</CardTitle>
          {/* <CardDescription>
              Manage your products and view their sales performance.
            </CardDescription> */}
        </CardHeader>
        <CardContent>
          <Table className="">
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead className="hidden md:table-cell">
                  Descripcion
                </TableHead>
                <TableHead className="hidden sm:table-cell">Precio</TableHead>
                <TableHead className="hidden sm:table-cell">
                  Categoria
                </TableHead>
                {/* <TableHead className="hidden sm:table-cell">Stock</TableHead> */}
                <TableHead className="hidden sm:table-cell">Estado</TableHead>
                <TableHead className="sm:table-cell">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data ? (
                data?.map((producto, index) => (
                  <TableRow key={index} className="">
                    <TableCell>
                      <div className="font-medium flex gap-1 capitalize">
                        <span>{producto.nombre}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium flex gap-1 capitalize">
                        <span>{producto.descripcion}</span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {producto.precio}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {producto.categoria.nombre}
                    </TableCell>
                    {/* <TableCell className="hidden sm:table-cell">
                      {producto.Inventario.at(-1)?.cantidad}
                      {' unidades'}
                    </TableCell> */}
                    <TableCell className="hidden sm:table-cell">
                      <Badge className="text-xs" variant="default">
                        {producto.estado?.descripcion}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <TooltipProvider delayDuration={0}>
                        <div className="flex gap-2 items-end ">
                          <Tooltip>
                            <TooltipTrigger>
                              <Link href={'edit/' + producto.id}>
                                <div className="rounded-full border text-emerald-700 p-1.5 hover:bg-emerald-600 hover:text-gray-50">
                                  <Lucide_Icon name="Pencil" size={15} />
                                </div>
                              </Link>
                            </TooltipTrigger>
                            <TooltipContent
                              className="py-1 px-2 bg-black text-white"
                              align="start"
                            >
                              <span className="text-xs ">Editar</span>
                            </TooltipContent>
                          </Tooltip>

                          <Tooltip>
                            <TooltipTrigger>
                              <Eliminar
                                url={`http://localhost:3000/api/usuarios/${producto.id}`}
                              >
                                <div className="rounded-full border text-red-700  p-1.5 hover:bg-red-600 hover:text-gray-50">
                                  <Lucide_Icon name="Trash2" size={15} />
                                </div>
                              </Eliminar>
                            </TooltipTrigger>

                            <TooltipContent
                              className="py-1 px-2 bg-black text-white"
                              align="start"
                            >
                              <span className="text-xs ">Eliminar</span>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      </TooltipProvider>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow className="">
                  <TableCell>no se encontro ningun producto</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
        {/* <CardFooter>
          <div className="text-xs text-muted-foreground">
            Showing <strong>1-10</strong> of <strong>32</strong> products
          </div>
        </CardFooter> */}
      </Card>
    </div>
  )
}
