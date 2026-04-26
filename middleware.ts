import { NextRequest, NextResponse } from 'next/server'
import { ADMIN_SESSION_COOKIE, verifyAdminSessionToken } from '@/lib/admin-auth'

function buildSignInUrl(request: NextRequest) {
  const signInUrl = new URL('/admin-login', request.url)
  const nextPath = `${request.nextUrl.pathname}${request.nextUrl.search}`

  signInUrl.searchParams.set('next', nextPath)

  return signInUrl
}

async function handleRequest(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isAdminRoute = pathname === '/admin' || pathname.startsWith('/admin/')
  const cookieValue = request.cookies.get(ADMIN_SESSION_COOKIE)?.value
  const customSession = cookieValue ? await verifyAdminSessionToken(cookieValue) : null
  const hasValidAdminSession = Boolean(customSession)

  if (isAdminRoute && !hasValidAdminSession) {
    return NextResponse.redirect(buildSignInUrl(request))
  }

  if (pathname === '/admin-login' && hasValidAdminSession) {
    return NextResponse.redirect(new URL('/admin', request.url))
  }

  return NextResponse.next()
}

export default async function middleware(request: NextRequest) {
  return handleRequest(request)
}

export const config = {
  matcher: ['/admin/:path*', '/admin-login'],
}
