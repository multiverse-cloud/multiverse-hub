import { isClerkAPIResponseError } from '@clerk/nextjs/errors'

function normalizeClerkMessage(message: string) {
  const normalized = message.trim()
  const lowerMessage = normalized.toLowerCase()

  if (lowerMessage.includes('online data breach') || lowerMessage.includes('haveibeenpwned')) {
    return 'Choose a different password. This one is too easy to guess.'
  }

  if (lowerMessage.includes('password is incorrect') || lowerMessage.includes('invalid password')) {
    return 'Email or password is incorrect.'
  }

  if (lowerMessage.includes('already exists')) {
    return 'An account with this email already exists. Try signing in instead.'
  }

  if (lowerMessage.includes('couldn\'t be found') || lowerMessage.includes('could not be found') || lowerMessage.includes('not found')) {
    return 'We could not find an account with that email.'
  }

  if (lowerMessage.includes('verification code') || lowerMessage.includes('code is invalid')) {
    return 'That code does not look right yet. Please try again.'
  }

  if (lowerMessage.includes('too many requests') || lowerMessage.includes('too many attempts')) {
    return 'Too many attempts right now. Please wait a moment and try again.'
  }

  if (lowerMessage.includes('identifier is invalid') || lowerMessage.includes('valid email')) {
    return 'Enter a valid email address.'
  }

  return normalized
}

export function getClerkErrorMessage(error: unknown, fallback: string) {
  if (isClerkAPIResponseError(error)) {
    const firstError = error.errors[0]

    if (firstError?.longMessage) {
      return normalizeClerkMessage(firstError.longMessage)
    }

    if (firstError?.message) {
      return normalizeClerkMessage(firstError.message)
    }
  }

  if (error instanceof Error && error.message) {
    return normalizeClerkMessage(error.message)
  }

  return fallback
}
