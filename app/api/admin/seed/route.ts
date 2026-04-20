import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json(
    {
      success: false,
      message: 'External database sync is disabled. Tools run from local source data now.',
    },
    { status: 410 }
  )
}
