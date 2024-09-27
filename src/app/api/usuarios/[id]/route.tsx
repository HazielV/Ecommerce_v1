import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

type Params = {
  id: string
}
export async function GET(req: Request, context: { params: Params }) {
  const id = Number(context.params.id)
  try {
    const user = await prisma.usuario.findUnique({
      where: {
        id: id,
      },
    })
    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json(
      { error: 'no se encontro al usuario' },
      { status: 402 }
    )
  }
}
export async function DELETE(req: Request, context: { params: Params }) {
  const id = Number(context.params.id)
  try {
    const user = await prisma.usuario.findUnique({
      where: {
        id: id,
      },
    })
    console.log(user)
  } catch (error) {
    return NextResponse.json(
      { error: 'no se encontro al usuario' },
      { status: 500 }
    )
  }
  return NextResponse.json('todo bien')
}
