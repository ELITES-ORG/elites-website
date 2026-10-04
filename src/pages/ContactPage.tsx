import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { PAGE_REVEAL_DELAY } from '@/components/layout/PageTransition'
import { Seo } from '@/components/layout/Seo'
import { Button } from '@/components/ui/Button'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { FadeIn } from '@/components/ui/FadeIn'
import { Icon } from '@/components/ui/Icon'
import { RevealText } from '@/components/ui/RevealText'
import { services } from '@/content/services'
import { site, socials } from '@/content/site'
import { ApiError } from '@/lib/api'
import { cn } from '@/lib/cn'
import { easeExpo } from '@/lib/motion'
import {
  budgetRanges,
  formatWait,
  InquiryRateLimitError,
  submitInquiry,
  validateInquiry,
  type InquiryErrors,
  type InquiryInput,
} from '@/services/inquiries'

const emptyForm: InquiryInput = { name: '', email: '', company: '', budget: '', services: [], message: '' }

type Status =
  { kind: 'idle' } | { kind: 'sending' } | { kind: 'sent' } | { kind: 'mailto' } | { kind: 'error'; message: string }

function Field({
  id,
  label,
  error,
  optional,
  children,
}: {
  id: string
  label: string
  error?: string
  optional?: boolean
  children: ReactNode
}) {
  return (
    <div className="group/field relative flex flex-col">
      <label htmlFor={id} className="flex items-center justify-between eyebrow text-ash">
        {label}
        {optional && <span className="tracking-normal text-smoke normal-case">Optional</span>}
      </label>
      {children}
      <span
        aria-hidden
        className={cn(
          'absolute bottom-0 left-0 h-px w-full origin-left transition-transform duration-500 ease-expo',
          error ? 'scale-x-100 bg-signal' : 'scale-x-0 bg-bone group-focus-within/field:scale-x-100',
        )}
      />
      <AnimatePresence>
        {error && (
          <motion.p
            id={`${id}-error`}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute -bottom-6 left-0 text-xs text-signal"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

const inputClass =
  'w-full border-b border-graphite bg-transparent py-4 text-lg text-bone placeholder:text-smoke focus:outline-none'

function Chip({ selected, onClick, children }: { selected: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={cn(
        'h-10 border px-4 text-sm transition-colors duration-300',
        selected
          ? 'border-signal bg-signal text-bone'
          : 'border-graphite text-bone/75 hover:border-smoke hover:text-bone',
      )}
    >
      {children}
    </button>
  )
}

function InquiryForm() {
  const [form, setForm] = useState<InquiryInput>(emptyForm)
  const [errors, setErrors] = useState<InquiryErrors>({})
  const [status, setStatus] = useState<Status>({ kind: 'idle' })
  const startedAt = useRef(0)

  useEffect(() => {
    startedAt.current = Date.now()
  }, [])

  const update = <K extends keyof InquiryInput>(key: K, value: InquiryInput[K]) => {
    setForm((f) => ({ ...f, [key]: value }))
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }))
  }

  const toggleService = (title: string) =>
    update(
      'services',
      form.services.includes(title) ? form.services.filter((s) => s !== title) : [...form.services, title],
    )

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const found = validateInquiry(form)
    setErrors(found)
    if (Object.keys(found).length > 0) {
      document.getElementById(`inquiry-${Object.keys(found)[0]}`)?.focus()
      return
    }

    const honeypot = new FormData(e.currentTarget).get('botcheck') !== null

    setStatus({ kind: 'sending' })
    try {
      const result = await submitInquiry(form, { startedAt: startedAt.current, honeypot })
      setStatus({ kind: result })
      if (result === 'sent') setForm(emptyForm)
    } catch (err) {
      let message = `Something went wrong. Email us directly at ${site.email}.`
      if (err instanceof InquiryRateLimitError) {
        message = `You have sent several messages recently. Try again in ${formatWait(err.retryAfterMs)}, or email ${site.email} if it is urgent.`
      } else if (err instanceof ApiError) {
        message = err.message
      }
      setStatus({ kind: 'error', message })
    }
  }

  if (status.kind === 'sent') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: easeExpo }}
        className="flex flex-col items-start gap-6 border border-graphite bg-carbon p-10 md:p-14"
        role="status"
      >
        <span className="flex size-14 items-center justify-center bg-signal">
          <Icon name="fi-rs-check" className="text-xl" />
        </span>
        <h2 className="display text-display-md">Message sent</h2>
        <p className="max-w-md leading-relaxed text-ash">
          Thanks for reaching out. We will reply within one business day with next steps.
        </p>
        <Button variant="outline" arrow={false} onClick={() => setStatus({ kind: 'idle' })}>
          Send another message
        </Button>
      </motion.div>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-12">
      <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
      <div className="grid gap-12 md:grid-cols-2 md:gap-8">
        <Field id="inquiry-name" label="Your name" error={errors.name}>
          <input
            id="inquiry-name"
            className={inputClass}
            autoComplete="name"
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'inquiry-name-error' : undefined}
            placeholder="Jane Cruz"
          />
        </Field>
        <Field id="inquiry-email" label="Work email" error={errors.email}>
          <input
            id="inquiry-email"
            type="email"
            className={inputClass}
            autoComplete="email"
            value={form.email}
            onChange={(e) => update('email', e.target.value)}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'inquiry-email-error' : undefined}
            placeholder="jane@company.com"
          />
        </Field>
      </div>

      <Field id="inquiry-company" label="Company" optional>
        <input
          id="inquiry-company"
          className={inputClass}
          autoComplete="organization"
          value={form.company}
          onChange={(e) => update('company', e.target.value)}
          placeholder="Company name"
        />
      </Field>

      <fieldset>
        <legend className="mb-4 eyebrow text-ash">What do you need help with?</legend>
        <div className="flex flex-wrap gap-2">
          {services.map((s) => (
            <Chip key={s.slug} selected={form.services.includes(s.title)} onClick={() => toggleService(s.title)}>
              {s.title}
            </Chip>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-4 eyebrow text-ash">Estimated budget</legend>
        <div className="flex flex-wrap gap-2">
          {budgetRanges.map((b) => (
            <Chip key={b} selected={form.budget === b} onClick={() => update('budget', form.budget === b ? '' : b)}>
              {b}
            </Chip>
          ))}
        </div>
      </fieldset>

      <Field id="inquiry-message" label="About the project" error={errors.message}>
        <textarea
          id="inquiry-message"
          rows={5}
          className={cn(inputClass, 'resize-none leading-relaxed')}
          value={form.message}
          onChange={(e) => update('message', e.target.value)}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'inquiry-message-error' : undefined}
          placeholder="What are you building, who is it for, and when do you need it?"
        />
      </Field>

      <div className="flex flex-col gap-5 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" disabled={status.kind === 'sending'}>
          {status.kind === 'sending' ? 'Sending' : 'Send inquiry'}
        </Button>
        <AnimatePresence mode="wait">
          {status.kind === 'mailto' && (
            <motion.p
              key="mailto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-xs text-sm text-ash"
              role="status"
            >
              Your email app should open with the message ready. If it did not, write to{' '}
              <a href={`mailto:${site.email}`} className="text-bone underline underline-offset-4">
                {site.email}
              </a>
              .
            </motion.p>
          )}
          {status.kind === 'error' && (
            <motion.p
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-xs text-sm text-signal"
              role="alert"
            >
              {status.message}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </form>
  )
}

const nextSteps = [
  'We reply within one business day.',
  'A 30-minute call to understand the project.',
  'A written proposal with scope, timeline and cost.',
]

export default function ContactPage() {
  const d = PAGE_REVEAL_DELAY

  return (
    <>
      <Seo
        title="Contact"
        description="Tell Elites about your project. We reply within one business day with next steps and honest feedback."
      />
      <section className="container-page pt-[calc(var(--header-h)+clamp(4rem,11vw,10rem))] pb-[clamp(5rem,11vw,10rem)]">
        <FadeIn trigger="mount" delay={d} y={12}>
          <Eyebrow>Contact</Eyebrow>
        </FadeIn>
        <RevealText
          as="h1"
          trigger="mount"
          delay={d + 0.05}
          className="mt-8 display text-display-xl md:mt-10"
          lines={['Tell us about', 'your project']}
          lineClassName={(i) => (i === 1 ? 'text-outline md:[--outline-width:2px]' : '')}
        />

        <div className="mt-16 grid gap-16 border-t border-graphite pt-12 md:mt-24 lg:grid-cols-12 lg:gap-10 lg:pt-16">
          <FadeIn
            trigger="mount"
            delay={d + 0.35}
            className="flex flex-col gap-12 [overflow-wrap:anywhere] lg:col-span-5"
          >
            <dl className="flex flex-col gap-8">
              {[
                { label: 'Email', value: site.email, href: `mailto:${site.email}`, icon: 'fi-rs-envelope' },
                {
                  label: 'Phone',
                  value: site.phone,
                  href: `tel:${site.phone.replace(/\s/g, '')}`,
                  icon: 'fi-rs-phone-call',
                },
                { label: 'Location', value: `${site.location} (${site.timezone})`, icon: 'fi-rs-marker' },
                { label: 'Hours', value: site.hours, icon: 'fi-rs-clock' },
              ].map((item) => (
                <div key={item.label} className="flex gap-4">
                  <Icon name={item.icon} className="mt-1 text-signal" />
                  <div>
                    <dt className="eyebrow text-ash">{item.label}</dt>
                    <dd className="mt-1.5 text-lg">
                      {item.href ? (
                        <a href={item.href} className="transition-colors hover:text-signal">
                          {item.value}
                        </a>
                      ) : (
                        item.value
                      )}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>

            <div>
              <h2 className="mb-5 eyebrow text-ash">What happens next</h2>
              <ol className="flex flex-col gap-4">
                {nextSteps.map((step, i) => (
                  <li key={step} className="flex gap-4 text-bone/85">
                    <span className="font-mono text-sm text-signal">{String(i + 1).padStart(2, '0')}</span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            <ul className="flex gap-2">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="flex size-11 items-center justify-center border border-graphite text-bone/80 transition-colors hover:border-signal hover:text-signal"
                  >
                    <Icon name={s.icon} />
                  </a>
                </li>
              ))}
            </ul>
          </FadeIn>

          <FadeIn trigger="mount" delay={d + 0.45} className="lg:col-span-7 lg:col-start-6">
            <InquiryForm />
          </FadeIn>
        </div>
      </section>
    </>
  )
}
