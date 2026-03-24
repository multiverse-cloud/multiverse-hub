import { createRequire } from 'module'
import { NextRequest } from 'next/server'
import { PDFDocument } from 'pdf-lib'
import { parseFormData, err, fileResponse } from '@/lib/server-utils'

export const runtime = 'nodejs'
export const maxDuration = 60

const require = createRequire(import.meta.url)

type CompressionProfile = 'extreme' | 'balanced' | 'light'
type PdfSerializer = { serializeToBuffer: () => Promise<Uint8Array> }

const PDFWriterModule = require('pdf-lib/cjs/core/writers/PDFWriter.js') as {
  default: {
    forContext: (context: unknown, objectsPerTick: number) => PdfSerializer
  }
}
const PDFStreamWriterModule = require('pdf-lib/cjs/core/writers/PDFStreamWriter.js') as {
  default: {
    forContext: (
      context: unknown,
      objectsPerTick: number,
      encodeStreams?: boolean,
      objectsPerStream?: number
    ) => PdfSerializer
  }
}
const PDFNameModule = require('pdf-lib/cjs/core/objects/PDFName.js') as {
  default: {
    of: (name: string) => unknown
  }
}

const PDFWriter = PDFWriterModule.default
const PDFStreamWriter = PDFStreamWriterModule.default
const PDFName = PDFNameModule.default

function sanitizeDocument(doc: PDFDocument) {
  const infoRef = doc.context.trailerInfo.Info
  if (
    infoRef &&
    typeof infoRef === 'object' &&
    'objectNumber' in infoRef &&
    typeof infoRef.objectNumber === 'number'
  ) {
    doc.context.delete(infoRef as Parameters<typeof doc.context.delete>[0])
  }
  delete doc.context.trailerInfo.Info

  const metadataKey = PDFName.of('Metadata')
  const catalog = doc.catalog as unknown as {
    dict: {
      get: (key: unknown) => unknown
      delete: (key: unknown) => boolean
    }
  }
  const catalogDict = catalog.dict
  const metadataRef = catalogDict.get(metadataKey)
  if (
    metadataRef &&
    typeof metadataRef === 'object' &&
    'objectNumber' in metadataRef &&
    typeof metadataRef.objectNumber === 'number'
  ) {
    doc.context.delete(metadataRef as Parameters<typeof doc.context.delete>[0])
  }
  catalogDict.delete(metadataKey)
}

async function buildCandidate(buffer: Buffer, profile: CompressionProfile) {
  const doc = await PDFDocument.load(buffer, { ignoreEncryption: true })
  sanitizeDocument(doc)

  if (profile === 'light') {
    return PDFWriter.forContext(doc.context, 50).serializeToBuffer()
  }

  if (profile === 'balanced') {
    return doc.save({
      useObjectStreams: true,
      addDefaultPage: false,
      updateFieldAppearances: false,
      objectsPerTick: 75,
    })
  }

  const firstPass = await PDFStreamWriter.forContext(doc.context, 100, true, 120).serializeToBuffer()
  const secondDoc = await PDFDocument.load(firstPass, { ignoreEncryption: true })
  sanitizeDocument(secondDoc)
  return PDFStreamWriter.forContext(secondDoc.context, 120, true, 220).serializeToBuffer()
}

async function compressWithProfile(buffer: Buffer, requestedProfile: CompressionProfile) {
  const candidates = await Promise.all([
    buildCandidate(buffer, 'light'),
    buildCandidate(buffer, 'balanced'),
    buildCandidate(buffer, 'extreme'),
  ])

  const ranked = [
    { profile: 'light' as const, bytes: candidates[0] },
    { profile: 'balanced' as const, bytes: candidates[1] },
    { profile: 'extreme' as const, bytes: candidates[2] },
  ].sort((left, right) => left.bytes.length - right.bytes.length)

  const selected =
    requestedProfile === 'extreme'
      ? ranked[0]
      : requestedProfile === 'light'
        ? ranked[ranked.length - 1]
        : ranked[Math.floor(ranked.length / 2)]

  if (selected.bytes.length >= buffer.length) {
    return {
      bytes: new Uint8Array(buffer),
      effectiveProfile: requestedProfile,
      adjusted: true,
    }
  }

  return {
    bytes: selected.bytes,
    effectiveProfile: selected.profile,
    adjusted: false,
  }
}

export async function POST(req: NextRequest) {
  try {
    const { files, fields } = await parseFormData(req)
    const pdf = files.find(f => f.fieldname === 'file')
    if (!pdf) return err('No PDF file uploaded')
    const profile =
      fields.profile === 'extreme' || fields.profile === 'light' || fields.profile === 'balanced'
        ? fields.profile
        : 'balanced'

    const { bytes: compressed, effectiveProfile, adjusted } = await compressWithProfile(pdf.buffer, profile)

    const originalSize = pdf.buffer.length
    const newSize = compressed.length
    const savings = Math.max(0, Math.round((1 - newSize / originalSize) * 100))

    const buf = Buffer.from(compressed)
    const res = fileResponse(buf, 'compressed.pdf', 'application/pdf')
    res.headers.set('X-Original-Size', originalSize.toString())
    res.headers.set('X-Compressed-Size', newSize.toString())
    res.headers.set('X-Savings-Percent', savings.toString())
    res.headers.set('X-Compression-Profile', profile)
    res.headers.set('X-Effective-Compression-Profile', effectiveProfile)
    res.headers.set('X-Compression-Adjusted', adjusted ? 'true' : 'false')
    return res
  } catch (e) {
    return err(`PDF compress failed: ${(e as Error).message}`, 500)
  }
}
