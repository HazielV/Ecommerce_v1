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
import Habilitar from '@/components/Habilitar'
interface categorias {
  id: number
  nombre: string
  descripcion: string
  estado: {
    id: number
    descripcion: string
  } | null
}
async function getCategorias() {
  const data = await fetch('http://localhost:3000/api/categorias', {
    method: 'GET',
    cache: 'no-store',
  })
  /* console.log(data) */
  return data.json()
}

export default async function page() {
  const data: categorias[] = await getCategorias()

  return (
    <div className="flex flex-col overflow-y-auto p-8 pt-10 gap-5">
      <div className="flex justify-between items-center ">
        <h1 className="font-medium text-3xl">Categorias</h1>
        <Link href={'categorias/create'}>
          <Button className="text-xs">nueva categoria</Button>
        </Link>
      </div>
      <Card x-chunk="">
        <CardHeader>
          <CardTitle>Lista de Categorias</CardTitle>
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

                <TableHead className="hidden sm:table-cell">Estado</TableHead>
                <TableHead className="sm:table-cell">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((categoria, index) => (
                <TableRow key={index} className="">
                  <TableCell>
                    <div className="font-medium flex gap-1 capitalize">
                      <span>{categoria.nombre}</span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {categoria.descripcion}
                  </TableCell>

                  <TableCell className="hidden sm:table-cell w-20 mx-auto">
                    {categoria.estado?.id === 1 ? (
                      <Badge className="text-xs capitalize" variant="default">
                        {categoria.estado?.descripcion}
                      </Badge>
                    ) : (
                      <Badge
                        className="text-xs capitalize"
                        variant="destructive"
                      >
                        {categoria.estado?.descripcion}
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <TooltipProvider delayDuration={0}>
                      <div className="flex gap-2 items-end ">
                        {categoria.estado?.id === 1 ? (
                          <>
                            <Tooltip>
                              <TooltipTrigger>
                                <Link href={'categorias/edit/' + categoria.id}>
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
                                  url={`http://localhost:3000/api/categorias/${categoria.id}`}
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
                          </>
                        ) : (
                          <Tooltip>
                            <TooltipTrigger>
                              <Habilitar
                                url={`http://localhost:3000/api/categorias/${categoria.id}`}
                              >
                                <div className="rounded-full border text-emerald-700  p-1.5 hover:bg-emerald-600 hover:text-gray-50">
                                  <Lucide_Icon name="RefreshCcwDot" size={15} />
                                </div>
                              </Habilitar>
                            </TooltipTrigger>

                            <TooltipContent
                              className="py-1 px-2 bg-black text-white"
                              align="start"
                            >
                              <span className="text-xs ">Habilitar</span>
                            </TooltipContent>
                          </Tooltip>
                        )}
                      </div>
                    </TooltipProvider>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <div className="text-xs text-muted-foreground">
            Showing <strong>1-10</strong> of <strong>32</strong> products
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
