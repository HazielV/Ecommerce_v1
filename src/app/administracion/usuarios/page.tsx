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
interface usuario_persona {
  id: number
  correoelectronico: string
  rol: string
  estado: {
    id: number
    descripcion: string
  } | null
  persona: {
    nombres: string
    primerapellido: string
    segundoapellido: string | null
  } | null
}
async function getUsuarios() {
  const data = await fetch('http://localhost:3000/api/usuarios', {
    method: 'GET',
    cache: 'no-cache',
  })
  /* console.log(data) */
  return data.json()
}

export default async function page() {
  const data: usuario_persona[] = await getUsuarios()

  return (
    <div className="flex flex-col overflow-y-auto p-8 pt-10 gap-5">
      <div className="flex justify-between items-center ">
        <h1 className="font-medium text-3xl">Usuarios</h1>
        <Link href={'usuarios/create'}>
          <Button className="text-xs">nuevo usuario</Button>
        </Link>
      </div>
      <Card x-chunk="">
        <CardHeader>
          <CardTitle>Lista de Usuarios</CardTitle>
          {/* <CardDescription>
            Manage your products and view their sales performance.
          </CardDescription> */}
        </CardHeader>
        <CardContent>
          <Table className="">
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead className="hidden md:table-cell">Correo</TableHead>
                <TableHead className="hidden sm:table-cell">Rol</TableHead>
                <TableHead className="hidden sm:table-cell">Estado</TableHead>
                <TableHead className="sm:table-cell">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((usuario, index) => (
                <TableRow key={index} className="">
                  <TableCell>
                    <div className="font-medium flex gap-1 capitalize">
                      <span>{usuario.persona?.nombres}</span>
                      <span>{usuario.persona?.primerapellido}</span>
                      <span>{usuario.persona?.segundoapellido}</span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {usuario.correoelectronico}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {usuario.rol}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge className="text-xs" variant="default">
                      {usuario.estado?.descripcion}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <TooltipProvider delayDuration={0}>
                      <div className="flex gap-2 items-end ">
                        <Tooltip>
                          <TooltipTrigger>
                            <Link href={'edit/' + usuario.id}>
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
                              url={`http://localhost:3000/api/usuarios/${usuario.id}`}
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
