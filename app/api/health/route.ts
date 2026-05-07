export const runtime = 'nodejs'

export async function GET() {
  return Response.json(
    {
      ok: true,
      service: 'mtverse',
      timestamp: new Date().toISOString(),
    },
    {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    }
  )
}
