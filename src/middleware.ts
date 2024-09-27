import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { getSession } from './lib/auth'

const protectedRoutes = ['/dashboard']
const publicRoutes = ['/login', '/signup', '/']

export default async function middleware(request: NextRequest) {
  /* console.log(request.url) */
  const path = request.nextUrl.pathname

  const isProtectedRoute = path.includes('administracion')

  const session = await getSession()
  /* console.log('seesion middleware', session) */
  if (!session && isProtectedRoute) {
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }

  if (session && path.includes('login')) {
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }
  if (session && isProtectedRoute) {
    if (session.rol === 'ADMINISTRADOR' || session.rol === 'ARTESANO') {
      return NextResponse.next()
    } else {
      return NextResponse.redirect(new URL('/', request.nextUrl))
    }
  }

  return NextResponse.next()
}

/* // See "Matching Paths" below to learn more
export const config = {
  matcher: '/dashboard/:path*',
}
 */
