import { NextResponse } from 'next/server'
import { Prisma, PrismaClient, Rol } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const users = await prisma.usuario.findMany({
      select: {
        id: true,
        correoelectronico: true,
        rol: true,
        estado: true,
        persona: {
          select: {
            nombres: true,
            primerapellido: true,
            segundoapellido: true,
          },
        },
      },
    })
    /* const users_count = await prisma.usuario.count()
    console.log(users_count) */

    return NextResponse.json(users)
  } catch (error) {
    console.log(error)
    throw 'no se pudo obtener '
  } finally {
    prisma.$disconnect()
  }
}
export async function POST(req: Request) {
  const data = await req.formData()

  const rol_usuario: Rol = data.get('rol') as Rol
  if (rol_usuario === 'ARTESANO') {
    try {
      await prisma.artesano.create({
        data: {
          usuario: {
            create: {
              correoelectronico: data.get('correoelectronico') as string,
              rol: data.get('rol') as Rol,
              password: data.get('password') as string,
              persona: {
                create: {
                  nombres: data.get('nombres') as string,
                  primerapellido: data.get('primerapellido') as string,
                  segundoapellido: data.get('segundoapellido') as string,
                  nrodocumento: Number(data.get('nrodocumento')),
                },
              },
            },
          },
        },
      })
    } catch (error) {
      console.log(error)
      return NextResponse.json('no se puedo crear el usuario', { status: 401 })
    }
  }
  if (rol_usuario === 'DELIVERY') {
    try {
      await prisma.delivery.create({
        data: {
          usuario: {
            create: {
              correoelectronico: data.get('correoelectronico') as string,
              rol: data.get('rol') as Rol,
              password: data.get('password') as string,
              persona: {
                create: {
                  nombres: data.get('nombres') as string,
                  primerapellido: data.get('primerapellido') as string,
                  segundoapellido: data.get('segundoapellido') as string,
                  nrodocumento: Number(data.get('nrodocumento')),
                },
              },
            },
          },
        },
      })
    } catch (error) {
      console.log(error)
      return NextResponse.json('no se puedo crear el usuario', { status: 401 })
    }
  }

  if (rol_usuario === 'CLIENTE') {
    try {
      await prisma.cliente.create({
        data: {
          usuario: {
            create: {
              correoelectronico: data.get('correoelectronico') as string,
              rol: data.get('rol') as Rol,
              password: data.get('password') as string,
              persona: {
                create: {
                  nombres: data.get('nombres') as string,
                  primerapellido: data.get('primerapellido') as string,
                  segundoapellido: data.get('segundoapellido') as string,
                  nrodocumento: Number(data.get('nrodocumento')),
                },
              },
            },
          },
        },
      })
    } catch (error) {
      console.log(error)
      return NextResponse.json('no se puedo crear el usuario', { status: 401 })
    }
  }
  revalidatePath('/administracion/usuarios')
  return NextResponse.json({ redirect: '/administracion/usuarios' })
}
