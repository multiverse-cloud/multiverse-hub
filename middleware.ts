import { NextRequest, NextResponse } from 'next/server'
import { ADMIN_SESSION_COOKIE } from '@/lib/admin-auth'

function buildSignInUrl(request: NextRequest) {
  const signInUrl = new URL('/admin-login', request.url)
  const nextPath = `${request.nextUrl.pathname}${request.nextUrl.search}`

  signInUrl.searchParams.set('next', nextPath)

  return signInUrl
}

async function handleRequest(request: NextRequest, userId: string | null) {
  const { pathname } = request.nextUrl
  const isAdminRoute = pathname === '/admin' || pathname.startsWith('/admin/')
  const hasCustomAdminSession = Boolean(request.cookies.get(ADMIN_SESSION_COOKIE)?.value)

  if (isAdminRoute && !userId) {
    if (hasCustomAdminSession) {
      return NextResponse.next()
    }

    return NextResponse.redirect(buildSignInUrl(request))
  }

  if (pathname === '/admin-login' && hasCustomAdminSession) {
    return NextResponse.redirect(new URL('/admin', request.url))
  }

  return NextResponse.next()
}

export default async function middleware(request: NextRequest) {
  return handleRequest(request, null)
}

export const config = {
  matcher: ['/admin/:path*', '/admin-login'],
}
