import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json(
    {
      success: false,
      message: 'Firebase and Firestore sync have been removed. Tools run in local-only mode now.',
    },
    { status: 410 }
  )
}
