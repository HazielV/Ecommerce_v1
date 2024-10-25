import { NextResponse } from 'next/server'
import { DetalleProducto, Prisma, PrismaClient, Rol } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'
import formidable from 'formidable'
import { writeFile } from 'fs/promises'
import path from 'path'
import { File } from 'buffer'
export async function GET(req: Request) {
  const session = await getSession()

  if (!session) {
    return NextResponse.json([])
  }

  try {
    if (session && session.rol === 'ARTESANO') {
      const data = await prisma.producto.findMany({
        select: {
          id: true,
          categoria: {
            select: {
              id: true,
              nombre: true,
            },
          },
          /* Almacen: {
            select: {
              cantidad: true,
            },
          }, */
          estado: true,
          nombre: true,
          precio: true,
          descripcion: true,
        },
        where: {
          Artesano: {
            usuarioId: Number(session.id),
          },
        },
      })

      return NextResponse.json(data, { status: 200 })
    }

    const data = await prisma.producto.findMany({
      select: {
        id: true,
        categoria: {
          select: {
            id: true,
            nombre: true,
          },
        },
        estado: true,
        nombre: true,
        precio: true,
        descripcion: true,
      },
    })

    return NextResponse.json(data)
  } catch (error) {
    console.log(error)
    throw 'no se pudo obtener '
  } finally {
    prisma.$disconnect()
  }
}

export async function POST(req: Request) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json('no tiene sesion')
  }
  /* if ((session && session.rol != 'ARTESANO') || !session) {
    return NextResponse.json('no puede crear un producto con su ROL')
  } */
  const data = await req.formData()
  if (!data.get('images')) {
    return NextResponse.json('no hay imagenes')
  }
  const imagenes = data.getAll('images') as unknown as File[]
  const rutas: string[] = []

  for (const imagen of imagenes) {
    const bytes = await imagen.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Formatea la fecha de una manera adecuada para el nombre del archivo
    const f = new Date()
    const fecha = `${f.getDate()}-${f.getMonth() + 1}-${f.getFullYear()}`
    const hour = f.getHours()
    const minute = f.getMinutes()
    const seconds = f.getSeconds()
    const mili = f.getMilliseconds()

    const extension = path.extname(imagen.name)
    const nameimage = `img_${fecha}_${hour}-${minute}-${seconds}-${mili}${extension}`
    console.log(nameimage)

    const filepath = path.join(process.cwd(), 'public/images', nameimage)
    rutas.push(filepath)

    // Guardar el archivo
    await writeFile(filepath, buffer)
  }

  /* return NextResponse.json('recibido') */
  const detalles: any[] = []
  const entries = Array.from(data.entries())
  const detallesEntradas = entries.filter(([key]) =>
    key.startsWith('titulo_detalle_')
  )

  detallesEntradas.forEach(([key, titulo], index) => {
    const descripcionKey = `descripcion_detalle_${index}`
    const descripcion = data.get(descripcionKey)

    detalles.push({
      titulo: String(titulo),
      descripcion: descripcion,
    })
  })
  /* console.log(session)
  return NextResponse.json('prueba') */

  try {
    await prisma.producto.create({
      data: {
        Artesano: {
          connect: {
            usuarioId: Number(session.id) || 0,
          },
        },
        nombre: data.get('nombre') as string,
        descripcion: data.get('descripcion') as string,
        precio: Number(data.get('precio')),
        categoria: {
          connect: {
            id: Number(data.get('categoria_id')),
          },
        },

        detalles: {
          createMany: {
            data: [...detalles],
          },
        },
        Imagenes: {
          createMany: {
            data: rutas.map((ruta) => ({ url: ruta })),
          },
        },
      },
    })
  } catch (error) {
    console.log(error)
    throw 'no se pudo crear el usuario'
  }
  revalidatePath('/administracion/usuarios')
  return NextResponse.json({ redirect: '/administracion/usuarios' })
}
