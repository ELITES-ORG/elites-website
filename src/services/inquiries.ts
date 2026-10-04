import { site } from '@/content/site'
import { apiRequest, isApiConfigured } from '@/lib/api'

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

export function validateInquiry(input: InquiryInput): InquiryErrors {
  const errors: InquiryErrors = {}
  if (input.name.trim().length < 2) errors.name = 'Enter your name.'
  if (!EMAIL_PATTERN.test(input.email.trim())) errors.email = 'Enter a valid email address.'
  if (input.message.trim().length < 20)
    errors.message = 'Tell us a little more about the project (at least 20 characters).'
  return errors
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

  const subject = `Project inquiry from ${input.name}${input.company ? `, ${input.company}` : ''}`
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`
}

/**
 * Posts to `${VITE_API_URL}/inquiries` once a backend exists.
 * Without one, it opens the visitor's email client with the inquiry prefilled.
 */
export async function submitInquiry(input: InquiryInput): Promise<'sent' | 'mailto'> {
  if (isApiConfigured) {
    await apiRequest('/inquiries', { method: 'POST', body: input })
    return 'sent'
  }

  window.location.href = toMailto(input)
  return 'mailto'
}
