const encoder = new TextEncoder()
const decoder = new TextDecoder()

export const ADMIN_SESSION_COOKIE = 'multiverse_admin_session'
export const ADMIN_SESSION_TTL_SECONDS = 60 * 60 * 24 * 7
export const DEFAULT_ADMIN_EMAIL = 'admin@multiverse.local'
export const DEFAULT_ADMIN_PASSWORD = 'MultiverseAdmin!2026'
const DEFAULT_ADMIN_SESSION_SECRET = 'local-multiverse-admin-session-secret-change-me'

export type AdminSession = {
  email: string
  exp: number
  iat: number
}

export function getAdminCredentials() {
  return {
    email: process.env.ADMIN_EMAIL?.trim() || DEFAULT_ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD || DEFAULT_ADMIN_PASSWORD,
  }
}

function getAdminSessionSecret() {
  return process.env.ADMIN_SESSION_SECRET || DEFAULT_ADMIN_SESSION_SECRET
}

function toBase64(binary: string) {
  if (typeof btoa === 'function') {
    return btoa(binary)
  }

  return Buffer.from(binary, 'binary').toString('base64')
}

function fromBase64(base64: string) {
  if (typeof atob === 'function') {
    return atob(base64)
  }

  return Buffer.from(base64, 'base64').toString('binary')
}

function bytesToBinary(bytes: Uint8Array) {
  let output = ''
  const chunkSize = 0x8000

  for (let index = 0; index < bytes.length; index += chunkSize) {
    output += String.fromCharCode(...bytes.subarray(index, index + chunkSize))
  }

  return output
}

function binaryToBytes(binary: string) {
  const bytes = new Uint8Array(binary.length)

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index)
  }

  return bytes
}

function bytesToBase64Url(bytes: Uint8Array) {
  return toBase64(bytesToBinary(bytes))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '')
}

function base64UrlToBytes(value: string) {
  const normalized = value.replace(/-/g, '+').replace(/_/g, '/')
  const padding = normalized.length % 4 === 0 ? '' : '='.repeat(4 - (normalized.length % 4))

  return binaryToBytes(fromBase64(`${normalized}${padding}`))
}

async function importSigningKey() {
  return crypto.subtle.importKey(
    'raw',
    encoder.encode(getAdminSessionSecret()),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  )
}

export async function createAdminSessionToken(email: string, ttlSeconds = ADMIN_SESSION_TTL_SECONDS) {
  const now = Math.floor(Date.now() / 1000)
  const payload = {
    email,
    iat: now,
    exp: now + ttlSeconds,
  }
  const payloadBytes = encoder.encode(JSON.stringify(payload))
  const key = await importSigningKey()
  const signature = await crypto.subtle.sign('HMAC', key, payloadBytes)

  return `${bytesToBase64Url(payloadBytes)}.${bytesToBase64Url(new Uint8Array(signature))}`
}

export async function verifyAdminSessionToken(token: string) {
  const [payloadPart, signaturePart] = token.split('.')

  if (!payloadPart || !signaturePart) {
    return null
  }

  try {
    const payloadBytes = base64UrlToBytes(payloadPart)
    const signatureBytes = base64UrlToBytes(signaturePart)
    const key = await importSigningKey()
    const isValid = await crypto.subtle.verify('HMAC', key, signatureBytes, payloadBytes)

    if (!isValid) {
      return null
    }

    const payload = JSON.parse(decoder.decode(payloadBytes)) as AdminSession
    const now = Math.floor(Date.now() / 1000)

    if (!payload.email || payload.exp <= now) {
      return null
    }

    return payload
  } catch {
    return null
  }
}
