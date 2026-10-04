import { site } from '@/content/site'
import { apiRequest, isApiConfigured } from '@/lib/api'
import { InquiryRateLimitError, looksAutomated, recordSubmission, retryAfter } from './inquiry-limiter'

export { formatWait, InquiryRateLimitError } from './inquiry-limiter'

export const budgetRanges = ['Under $10k', '$10k to $25k', '$25k to $50k', '$50k+', 'Not sure yet'] as const

export interface InquiryInput {
  name: string
  email: string
  company: string
  budget: string
  services: string[]
  message: string
}

export type InquiryErrors = Partial<Record<keyof InquiryInput, string>>

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit'
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY?.trim() ?? ''

export function validateInquiry(input: InquiryInput): InquiryErrors {
  const errors: InquiryErrors = {}
  if (input.name.trim().length < 2) errors.name = 'Enter your name.'
  if (!EMAIL_PATTERN.test(input.email.trim())) errors.email = 'Enter a valid email address.'
  if (input.message.trim().length < 20)
    errors.message = 'Tell us a little more about the project (at least 20 characters).'
  return errors
}

function subjectFor(input: InquiryInput) {
  return `Project inquiry from ${input.name}${input.company ? `, ${input.company}` : ''}`
}

function toMailto(input: InquiryInput) {
  const lines = [
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    input.company ? `Company: ${input.company}` : null,
    input.budget ? `Budget: ${input.budget}` : null,
    input.services.length > 0 ? `Interested in: ${input.services.join(', ')}` : null,
    '',
    input.message,
  ].filter((line) => line !== null)

  return `mailto:${site.email}?subject=${encodeURIComponent(subjectFor(input))}&body=${encodeURIComponent(lines.join('\n'))}`
}

async function sendViaWeb3Forms(input: InquiryInput) {
  const response = await fetch(WEB3FORMS_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      access_key: WEB3FORMS_KEY,
      subject: subjectFor(input),
      from_name: `${site.name} website`,
      name: input.name,
      email: input.email,
      company: input.company || 'Not provided',
      budget: input.budget || 'Not provided',
      services: input.services.length > 0 ? input.services.join(', ') : 'Not provided',
      message: input.message,
    }),
  })

  const result = (await response.json().catch(() => null)) as { success?: boolean } | null
  if (!response.ok || !result?.success) {
    throw new Error('Inquiry could not be delivered')
  }
}

interface SubmitGuard {
  /** When the form was first shown, used to catch instant bot submissions */
  startedAt: number
  /** Whether the hidden honeypot field was filled in */
  honeypot: boolean
}

async function deliver(input: InquiryInput): Promise<'sent' | 'mailto'> {
  if (isApiConfigured) {
    await apiRequest('/inquiries', { method: 'POST', body: input })
    return 'sent'
  }

  if (WEB3FORMS_KEY) {
    await sendViaWeb3Forms(input)
    return 'sent'
  }

  window.location.href = toMailto(input)
  return 'mailto'
}

/**
 * Delivery order: own backend (`VITE_API_URL`), then Web3Forms (`VITE_WEB3FORMS_KEY`),
 * then the visitor's email client as a last resort.
 * Suspected bots get a success response without anything being sent, so they have no signal to adapt to.
 * Throws `InquiryRateLimitError` when this browser has hit the submission limit.
 */
export async function submitInquiry(input: InquiryInput, guard: SubmitGuard): Promise<'sent' | 'mailto'> {
  if (looksAutomated(guard.startedAt, guard.honeypot)) return 'sent'

  const wait = retryAfter()
  if (wait > 0) throw new InquiryRateLimitError(wait)

  const result = await deliver(input)
  recordSubmission()
  return result
}
