/**
 * Shared rate limiter for API routes.
 *
 * Uses an in-memory Map with automatic pruning — adequate for single-instance
 * deployments. For multi-instance / serverless at scale, swap the Map for
 * Upstash Redis (`@upstash/ratelimit`).
 */

type RateLimitRecord = { count: number; reset: number }

const buckets = new Map<string, RateLimitRecord>()
let lastPruneAt = 0
const PRUNE_INTERVAL = 60_000

function prune(now: number) {
  if (now - lastPruneAt < PRUNE_INTERVAL) return
  for (const [key, record] of buckets.entries()) {
    if (now > record.reset) buckets.delete(key)
  }
  lastPruneAt = now
}

export type RateLimitConfig = {
  /** Maximum requests allowed within the window */
  max: number
  /** Window duration in milliseconds */
  windowMs: number
}

export type RateLimitResult = {
  allowed: boolean
  remaining: number
  resetAt: number
}

/**
 * Check whether a request from `key` (usually an IP) is within rate limits.
 *
 * ```ts
 * const result = checkRateLimit(ip, { max: 20, windowMs: 60_000 })
 * if (!result.allowed) return err('Rate limit exceeded', 429)
 * ```
 */
export function checkRateLimit(key: string, config: RateLimitConfig): RateLimitResult {
  const now = Date.now()
  prune(now)

  const record = buckets.get(key)

  if (!record || now > record.reset) {
    buckets.set(key, { count: 1, reset: now + config.windowMs })
    return { allowed: true, remaining: config.max - 1, resetAt: now + config.windowMs }
  }

  if (record.count >= config.max) {
    return { allowed: false, remaining: 0, resetAt: record.reset }
  }

  record.count++
  return { allowed: true, remaining: config.max - record.count, resetAt: record.reset }
}

/** Extract client IP from request headers. */
export function getClientIp(headers: Headers): string {
  return headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    || headers.get('x-real-ip')
    || 'unknown'
}
