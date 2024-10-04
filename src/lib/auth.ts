'use server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { SignJWT, jwtVerify } from 'jose'
import { prisma } from './prisma'
import bcrypt from 'bcryptjs'
const clave = process.env.PRIVATE_KEY as string
const key = new TextEncoder().encode(clave)

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1 day from now')
    .sign(key)
}
export async function decrypt(input: string) {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ['HS256'],
  })
  return payload
}
export async function getSession() {
  const session = cookies().get('session')?.value

  if (!session) return null
  return await decrypt(session)
}
export async function logout() {
  cookies().set('session', '', { expires: new Date(0) })
}
export async function login(formData: FormData) {
  // Validate form fields

  const usuario = await prisma.usuario.findUnique({
    where: {
      correoelectronico: formData.get('correoelectronico') as string,
    },
    include: {
      persona: true,
    },
  })
  if (!usuario) {
    return null
  }

  /* const hash = bcrypt.hashSync(formData.get('password') as string, 10)
  console.log(hash) */
  const password = usuario.password as string
  const comparar = bcrypt.compareSync(
    formData.get('password') as string,
    password
  ) // true
  console.log('comparar password', comparar)
  if (!comparar) {
    return null
  }

  const data = {
    id: usuario.id,
    nombres: usuario.persona?.nombres,
    primerapellido: usuario.persona?.primerapellido,
    segundoapellido: usuario.persona?.segundoapellido,
    rol: usuario.rol,
  }

  const session = await encrypt(data)
  return { session: session, rol: usuario.rol }

  // Call the provider or db to create a user...
}
