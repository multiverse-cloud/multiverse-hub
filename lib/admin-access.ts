type ClerkMetadata = Record<string, unknown> | null | undefined

type ClerkEmailAddress = {
  id?: string
  emailAddress?: string
}

type ClerkUserLike = {
  emailAddresses?: ClerkEmailAddress[]
  primaryEmailAddressId?: string | null
  publicMetadata?: ClerkMetadata
  privateMetadata?: ClerkMetadata
  unsafeMetadata?: ClerkMetadata
}

const DEFAULT_ADMIN_EMAIL = 'admin@multiverse.local'

function splitEmailList(value?: string | null) {
  return (value || '')
    .split(',')
    .map(entry => entry.trim().toLowerCase())
    .filter(Boolean)
}

function hasAdminRole(value: unknown): boolean {
  if (typeof value === 'string') {
    return value.toLowerCase() === 'admin'
  }

  if (Array.isArray(value)) {
    return value.some(entry => typeof entry === 'string' && entry.toLowerCase() === 'admin')
  }

  return false
}

function metadataMarksAdmin(metadata: ClerkMetadata) {
  if (!metadata) {
    return false
  }

  return hasAdminRole(metadata.role) || hasAdminRole(metadata.roles)
}

export function getAdminEmailAllowlist() {
  const envEmails = [
    ...splitEmailList(process.env.ADMIN_EMAILS),
    ...splitEmailList(process.env.ADMIN_EMAIL),
  ]

  if (envEmails.length > 0) {
    return Array.from(new Set(envEmails))
  }

  return [DEFAULT_ADMIN_EMAIL]
}

export function getPrimaryEmail(user: ClerkUserLike | null | undefined) {
  if (!user?.emailAddresses?.length) {
    return null
  }

  const primaryEmail =
    user.emailAddresses.find(emailAddress => emailAddress.id === user.primaryEmailAddressId)?.emailAddress ||
    user.emailAddresses[0]?.emailAddress

  return primaryEmail?.trim().toLowerCase() || null
}

export function isAdminEmail(email: string | null | undefined) {
  if (!email) {
    return false
  }

  return getAdminEmailAllowlist().includes(email.trim().toLowerCase())
}

export function isAdminUser(user: ClerkUserLike | null | undefined) {
  if (!user) {
    return false
  }

  return (
    isAdminEmail(getPrimaryEmail(user)) ||
    metadataMarksAdmin(user.publicMetadata) ||
    metadataMarksAdmin(user.privateMetadata) ||
    metadataMarksAdmin(user.unsafeMetadata)
  )
}
