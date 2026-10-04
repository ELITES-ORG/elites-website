const STORAGE_KEY = 'elites:inquiries'
const MINUTE = 60_000
const HOUR = 60 * MINUTE

export const limits = {
  /** Minimum gap between two submissions from the same browser */
  cooldownMs: MINUTE,
  /** Maximum submissions per rolling window */
  maxPerWindow: 3,
  windowMs: HOUR,
  /** Submissions faster than this after the form appears are treated as bots */
  minFillMs: 3_000,
}

export class InquiryRateLimitError extends Error {
  readonly retryAfterMs: number

  constructor(retryAfterMs: number) {
    super(`Too many inquiries. Try again in ${formatWait(retryAfterMs)}.`)
    this.name = 'InquiryRateLimitError'
    this.retryAfterMs = retryAfterMs
  }
}

export function formatWait(ms: number) {
  const seconds = Math.ceil(ms / 1000)
  if (seconds < 60) return `${seconds} second${seconds === 1 ? '' : 's'}`
  const minutes = Math.ceil(seconds / 60)
  return `${minutes} minute${minutes === 1 ? '' : 's'}`
}

function readHistory(now: number): number[] {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
    if (!Array.isArray(parsed)) return []
    return parsed.filter((t): t is number => typeof t === 'number' && now - t < limits.windowMs)
  } catch {
    return []
  }
}

/** Milliseconds until another submission is allowed, or 0 if it is allowed now. */
export function retryAfter(now = Date.now()): number {
  const history = readHistory(now)
  if (history.length === 0) return 0

  const latest = Math.max(...history)
  const cooldownLeft = latest + limits.cooldownMs - now

  const windowLeft = history.length >= limits.maxPerWindow ? Math.min(...history) + limits.windowMs - now : 0

  return Math.max(0, cooldownLeft, windowLeft)
}

export function recordSubmission(now = Date.now()) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...readHistory(now), now]))
  } catch {
    // Storage can be unavailable (private browsing, quota); the limiter then relies on the bot checks only.
  }
}

export function looksAutomated(startedAt: number, honeypot: boolean, now = Date.now()) {
  return honeypot || now - startedAt < limits.minFillMs
}
