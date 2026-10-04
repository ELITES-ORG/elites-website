import { motion } from 'motion/react'
import { processSteps } from '@/content/company'
import { easeExpo, viewportOnce } from '@/lib/motion'

export function ProcessSteps() {
  return (
    <ol className="relative grid gap-12 lg:grid-cols-4 lg:gap-8">
      <motion.span
        aria-hidden
        className="absolute top-0 left-0 hidden h-px w-full origin-left bg-smoke lg:block"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={viewportOnce}
        transition={{ duration: 1.6, ease: easeExpo }}
      />
      <motion.span
        aria-hidden
        className="absolute top-0 left-0 h-full w-px origin-top bg-smoke lg:hidden"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={viewportOnce}
        transition={{ duration: 1.6, ease: easeExpo }}
      />

      {processSteps.map((step, i) => (
        <motion.li
          key={step.title}
          className="relative pl-8 lg:pt-10 lg:pl-0"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 1, ease: easeExpo, delay: 0.15 + i * 0.12 }}
        >
          <span aria-hidden className="absolute top-1.5 -left-[5px] size-[11px] bg-signal lg:-top-[5px] lg:left-0" />
          <p className="font-mono text-sm text-signal">{String(i + 1).padStart(2, '0')}</p>
          <h3 className="mt-4 display text-display-md">{step.title}</h3>
          <p className="mt-3 eyebrow text-ash">{step.duration}</p>
          <p className="mt-5 max-w-sm leading-relaxed text-bone/75">{step.description}</p>
        </motion.li>
      ))}
    </ol>
  )
}
