import { NextRequest, NextResponse } from 'next/server'
import { authorizeAdminRequest } from '@/lib/admin-request-auth'
import { getAdminTemplates, saveTemplate, saveTemplates } from '@/lib/template-db'
import { parseTemplateImportPayload, type TemplateImportSummary } from '@/lib/template-import'
import type { TemplateEntry } from '@/lib/template-library-data'

type AdminTemplatesResponse = {
  success?: boolean
  error?: string
  code?: string
  details?: string
  message?: string
  templates?: TemplateEntry[]
  template?: TemplateEntry
  summary?: TemplateImportSummary
}

function jsonError(error: string, status: number, code?: string, details?: string) {
  return NextResponse.json(
    {
      success: false,
      error,
      code,
      details,
    },
    { status }
  )
}

function getSafeErrorMessage(error: unknown, fallback: string) {
  if (error instanceof Error && error.message) {
    return error.message
  }

  return fallback
}

function isLocalTemplateReadOnlyError(error: unknown) {
  return error instanceof Error && /UI Templates is currently in local-only mode/i.test(error.message)
}

async function isAuthorizedRequest(request: NextRequest) {
  return (await authorizeAdminRequest(request)).authorized
}

export async function GET(request: NextRequest) {
  try {
    const isAuthorized = await isAuthorizedRequest(request)

    if (!isAuthorized) {
      return jsonError('Admin session expired. Sign in again to continue.', 401, 'unauthorized')
    }

    const templates = await getAdminTemplates()
    return NextResponse.json({ success: true, templates, count: templates.length })
  } catch (error) {
    console.error('Admin templates GET failed:', error)
    return jsonError(getSafeErrorMessage(error, 'Failed to fetch template data'), 500, 'template_fetch_failed')
  }
}

export async function POST(request: NextRequest) {
  try {
    const isAuthorized = await isAuthorizedRequest(request)

    if (!isAuthorized) {
      return jsonError('Admin session expired. Sign in again to continue.', 401, 'unauthorized')
    }

    const body = await request.json()

    if (body?.action === 'import-json') {
      let payload = body?.payload as unknown

      if (typeof body?.rawJson === 'string') {
        try {
          payload = JSON.parse(body.rawJson)
        } catch {
          return jsonError('Invalid JSON file or pasted JSON.', 400, 'invalid_json')
        }
      }

      const existingTemplates = await getAdminTemplates()
      const parsed = parseTemplateImportPayload(payload, existingTemplates, {
        replaceExisting: Boolean(body?.replaceExisting),
      })

      if (parsed.templates.length === 0) {
        const summary = {
          ...parsed.summary,
          imported: 0,
        }
        const alreadyExists = summary.skippedExisting > 0 || summary.skippedIncomingDuplicates > 0

        return NextResponse.json(
          {
            success: alreadyExists,
            error: alreadyExists ? undefined : 'No valid templates were found in the imported JSON.',
            code: alreadyExists ? undefined : 'no_valid_template_entries',
            message: alreadyExists
              ? 'No new templates were added because the imported titles already exist or were duplicates inside the JSON payload.'
              : undefined,
            templates: existingTemplates,
            summary,
          } satisfies AdminTemplatesResponse,
          { status: alreadyExists ? 200 : 400 }
        )
      }

      await saveTemplates(parsed.templates)
      const templates = await getAdminTemplates()

      return NextResponse.json({
        success: true,
        message: `Imported ${parsed.templates.length} templates successfully.`,
        templates,
        summary: {
          ...parsed.summary,
          imported: parsed.templates.length,
        },
      } satisfies AdminTemplatesResponse)
    }

    const template = body?.template as TemplateEntry | undefined

    if (!template) {
      return jsonError('Missing template payload', 400, 'missing_template_payload')
    }

    await saveTemplate(template)
    const templates = await getAdminTemplates()

    return NextResponse.json({
      success: true,
      message: `Saved "${template.title}" successfully.`,
      template,
      templates,
    } satisfies AdminTemplatesResponse)
  } catch (error) {
    console.error('Admin templates POST failed:', error)
    const status = isLocalTemplateReadOnlyError(error) ? 409 : 500
    const code = isLocalTemplateReadOnlyError(error) ? 'template_local_read_only' : 'template_save_failed'
    return jsonError(getSafeErrorMessage(error, 'Failed to save template'), status, code)
  }
}

export async function PATCH(request: NextRequest) {
  return POST(request)
}
