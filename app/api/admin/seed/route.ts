import { NextResponse } from 'next/server'
import { seedFirestoreWithLocalTools } from '@/lib/db'

export async function GET() {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Only allowed in development' }, { status: 403 })
  }

  try {
    console.log('Starting Firestore seed...')
    const result = await seedFirestoreWithLocalTools()
    return NextResponse.json(result)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
