import { prisma } from '@/lib/prisma'
import { Rol } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { z } from 'zod'

export async function POST(req: Request) {
  const singinSquema = z.object({
    correoelectronico: z
      .string({ message: 'es un campo obligatorio' })
      .min(4, 'minimo 6 caracteres')
      .email({ message: 'debe ser un correo electrónico válido' }),
  })

  const data = await req.formData()
  const saltRounds = 10
  const rol_usuario: Rol = data.get('rol') as Rol
  const password = data.get('password') as string
  const hash = bcrypt.hashSync(password, saltRounds)

  if (rol_usuario === 'ARTESANO') {
    try {
      await prisma.artesano.create({
        data: {
          usuario: {
            create: {
              correoelectronico: data.get('correoelectronico') as string,
              rol: data.get('rol') as Rol,
              password: hash,
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
              password: hash,
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
              password: hash,
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
  revalidatePath('/')
  return NextResponse.json({ redirect: '/' })

  /* try {
    const usuario = await prisma.usuario.create({
      data: {
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
    })
  } catch (error) {
    console.log(error)
    throw 'no se pudo crear el usuario'
  } */
  revalidatePath('/administracion/usuarios')
  redirect('/administracion/usuarios')
}
