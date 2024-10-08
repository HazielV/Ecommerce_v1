import { NextResponse } from 'next/server'
import { Prisma, PrismaClient, Rol } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'

export async function GET() {
  try {
    const data = await prisma.categoria.findMany({
      select: {
        id: true,
        nombre: true,
        descripcion: true,
        estado: true,
      },
      orderBy: {
        id: 'asc',
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
  const data = await req.formData()
  /* console.log('data', data)
  return NextResponse.json(
    { 'descripcion': ['falta de informacion'] },
    { status: 400 }
  ) */
  try {
    await prisma.categoria.create({
      data: {
        nombre: data.get('nombre') as string,
        descripcion: data.get('descripcion') as string,
      },
    })
  } catch (error) {
    console.log(error)
    throw 'no se pudo crear el usuario'
  } finally {
    prisma.$disconnect()
  }
  revalidatePath('/administracion/categorias')
  return NextResponse.json({ redirect: '/administracion/categorias' })
}
