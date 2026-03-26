import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getAdminCredentials, createAdminSessionToken, ADMIN_SESSION_COOKIE } from '@/lib/admin-auth'

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 })
    }

    let adminCreds
    try {
      adminCreds = getAdminCredentials()
    } catch (e) {
      return NextResponse.json({ error: 'Admin credentials not configured on the server' }, { status: 500 })
    }

    if (email.toLowerCase() !== adminCreds.email.toLowerCase() || password !== adminCreds.password) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })
    }

    const token = await createAdminSessionToken(adminCreds.email)
    
    ;(await cookies()).set(ADMIN_SESSION_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 1 week
    })

    return NextResponse.json({ success: true, redirectUrl: '/admin' })
  } catch (error) {
    console.error('Admin login error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
