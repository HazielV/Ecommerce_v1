import { NextResponse } from 'next/server'
import { Prisma, PrismaClient, Rol } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import { prisma } from '@/lib/prisma'
type Params = {
  id: string
}
export async function GET(req: Request, context: { params: Params }) {
  const id = Number(context.params.id) | 0
  try {
    const data = await prisma.categoria.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        nombre: true,
        descripcion: true,
        estado: true,
      },
    })

    return NextResponse.json(data)
  } catch (error) {
    console.log(error)
    NextResponse.json('no se pudo obtener el usuario')
  }
}
export async function PUT(req: Request, context: { params: Params }) {
  const data = await req.formData()
  const id = Number(context.params.id) | 0
  try {
    await prisma.categoria.update({
      where: {
        id: id,
      },
      data: {
        nombre: data.get('nombre') as string,
        descripcion: data.get('descripcion') as string,
      },
    })
  } catch (error) {
    console.log(error)
    NextResponse.json('no se pudo obtener el usuario')
  }
  revalidatePath('/administracion/categorias')
  return NextResponse.json({ redirect: '/administracion/categorias' })
}
export async function DELETE(req: Request, context: { params: Params }) {
  const id = Number(context.params.id) | 0
  /* console.log('data', data)
    return NextResponse.json(
      { 'descripcion': ['falta de informacion'] },
      { status: 400 }
    ) */
  try {
    await prisma.categoria.update({
      where: {
        id: id,
      },
      data: {
        estado: {
          connect: {
            id: 2,
          },
        },
      },
    })
  } catch (error) {
    console.log(error)
    throw 'no se pudo crear el usuario'
  }
  revalidatePath('/administracion/categorias')
  return NextResponse.json({ redirect: '/administracion/categorias' })
}
export async function PATCH(req: Request, context: { params: Params }) {
  const id = Number(context.params.id) | 0
  /* console.log('data', data)
      return NextResponse.json(
        { 'descripcion': ['falta de informacion'] },
        { status: 400 }
      ) */
  try {
    await prisma.categoria.update({
      where: {
        id: id,
      },
      data: {
        estado: {
          connect: {
            id: 1,
          },
        },
      },
    })
  } catch (error) {
    console.log(error)
    throw 'no se pudo crear el usuario'
  }
  revalidatePath('/administracion/categorias')
  return NextResponse.json({ redirect: '/administracion/categorias' })
}
