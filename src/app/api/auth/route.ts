import { NextResponse } from 'next/server'
import { Prisma, PrismaClient, Rol } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { getSession, login, logout } from '@/lib/auth'
import { cookies } from 'next/headers'

const userSchema = z.object({
  correoelectronico: z
    .string({ message: 'es un campo obligatorio' })
    .min(4, 'Debe contener minimo 6 caracteres')
    .email({ message: 'Debe ser un correo electrónico válido' }),

  password: z.string({ message: 'Es un campo obligatorio' }),
  /* .min(5, 'Debe contener minimo 5 caracteres')
    .regex(/[A-Z]/, { message: 'Debe contener al menos una letra mayúscula' }) //
    .regex(/\d.*\d/, { message: 'Debe contener al menos un números' }) */ // Al
})
export async function POST(req: Request) {
  const formData = await req.formData()
  const form = Object.fromEntries(formData.entries())
  const dataUsuario = userSchema.safeParse(form)

  if (!dataUsuario.success) {
    // Manejar errores y devolverlos
    const usuarioErrors = dataUsuario.success
      ? {}
      : dataUsuario.error.flatten().fieldErrors

    /*  return {
      ...usuarioErrors,
    } */
    return NextResponse.json({ ...usuarioErrors }, { status: 400 })
  }
  const session = await login(formData)
  if (session) {
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000)
    cookies().set('session', session.session, {
      expires,
      httpOnly: true,
      secure: true,
      path: '/',
    })
    const redirectUrl =
      session.rol === 'ADMINISTRADOR' ? '/administracion' : '/'
    return NextResponse.json({ redirect: redirectUrl })
  }
  return NextResponse.json(
    { 'credenciales': 'El correo o la contraseña no coindicen' },
    { status: 401 }
  )
}
export async function DELETE(req: Request) {
  const session = await getSession()

  if (!session) {
    return NextResponse.json('no existe ninguna session', { status: 400 })
  }
  logout()
  return NextResponse.json('session expired')
}
