import { clerkMiddleware } from '@clerk/nextjs/server'
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'
import { getSafeRedirectPath } from '@/lib/auth-redirects'

const clerkEnabled = Boolean(
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && process.env.CLERK_SECRET_KEY
)
const AUTH_PAGES = new Set(['/sign-in', '/sign-up', '/forgot-password'])

function buildSignInUrl(request: NextRequest) {
  const signInUrl = new URL('/sign-in', request.url)
  const nextPath = `${request.nextUrl.pathname}${request.nextUrl.search}`

  signInUrl.searchParams.set('next', nextPath)

  return signInUrl
}

function handleRequest(request: NextRequest, userId: string | null) {
  const { pathname, searchParams } = request.nextUrl
  const isAdminRoute = pathname === '/admin' || pathname.startsWith('/admin/')

  if (isAdminRoute && !userId) {
    return NextResponse.redirect(buildSignInUrl(request))
  }

  if (AUTH_PAGES.has(pathname) && userId) {
    const nextPath = getSafeRedirectPath(searchParams.get('next'), '/')

    return NextResponse.redirect(new URL(nextPath, request.url))
  }

  return NextResponse.next()
}

const clerkAwareMiddleware = clerkEnabled
  ? clerkMiddleware(async (auth, request) => {
      const { userId } = await auth()

      return handleRequest(request, userId)
    })
  : null

export default async function middleware(request: NextRequest, event: NextFetchEvent) {
  if (clerkAwareMiddleware) {
    return clerkAwareMiddleware(request, event)
  }

  return handleRequest(request, null)
}

export const config = {
  matcher: ['/((?!_next|api|.*\\..*).*)', '/api/auth/:path*'],
}
