import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  try {
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
        Imagenes: {
          select: {
            url: true,
          },
        },
        Artesano: {
          select: {
            usuario: {
              select: {
                persona: true,
              },
            },
          },
        },
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
