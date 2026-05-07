import { isCloudinaryConfigured } from '@/lib/cloudinary'
import { FFMPEG_PATH, isCommandAvailable, YTDLP_PATH } from '@/lib/server-utils'

export const runtime = 'nodejs'

function hasEnv(name: string) {
  return Boolean(process.env[name]?.trim())
}

export async function GET() {
  const checks = {
    adminEmail: hasEnv('ADMIN_EMAIL'),
    adminPassword: hasEnv('ADMIN_PASSWORD'),
    adminSessionSecret: hasEnv('ADMIN_SESSION_SECRET'),
    siteUrl: hasEnv('NEXT_PUBLIC_SITE_URL'),
    openRouter: hasEnv('OPENROUTER_API_KEY'),
    cloudinary: isCloudinaryConfigured(),
    ytDlp: isCommandAvailable(YTDLP_PATH),
    ffmpeg: isCommandAvailable(FFMPEG_PATH),
  }

  const required = ['adminEmail', 'adminPassword', 'adminSessionSecret', 'siteUrl'] as const
  const ready = required.every(key => checks[key])
  const mediaProcessingReady = checks.ytDlp && checks.ffmpeg

  const publicChecks = {
    core: ready,
    uploads: checks.cloudinary,
    mediaProcessing: mediaProcessingReady,
    ai: checks.openRouter,
  }

  return Response.json(
    {
      ok: ready,
      service: 'mtverse',
      environment: process.env.NODE_ENV || 'development',
      checks: publicChecks,
      timestamp: new Date().toISOString(),
    },
    {
      status: ready ? 200 : 503,
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    }
  )
}
