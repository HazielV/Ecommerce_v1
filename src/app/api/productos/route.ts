import { NextResponse } from 'next/server'
import { DetalleProducto, Prisma, PrismaClient, Rol } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'

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

  if ((session && session.rol != 'ARTESANO') || !session) {
    return NextResponse.json('no puede crear un producto con su ROL')
  }

  const data = await req.formData()

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
        Almacen: {
          create: {
            cantidad: Number(data.get('cantidad')),
            precio_compra: Number(data.get('costo')),
            proveedor: 'propio',
          },
        },
        detalles: {
          createMany: {
            data: [...detalles],
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