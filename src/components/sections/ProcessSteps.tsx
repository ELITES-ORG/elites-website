import { motion } from 'motion/react'
import type { CSSProperties } from 'react'
import { processSteps } from '@/content/company'
import { easeExpo, viewportOnce } from '@/lib/motion'

const SCAN_START = 1.6
// The pulse head crosses the full line in 2.8s (scan keyframes: 125% of the track in 70% of 5s).
const SCAN_CROSSING = 2.8

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

      <motion.span
        aria-hidden
        className="absolute -top-1 left-0 hidden h-[9px] w-full overflow-hidden lg:block"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={viewportOnce}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        <span className="absolute inset-0 animate-scan-x" style={{ animationDelay: `${SCAN_START}s` }}>
          <span className="absolute top-1 right-0 h-px w-1/4 bg-linear-to-r from-transparent via-signal/60 to-signal shadow-[0_0_8px_rgb(221_43_55/0.7)]" />
          <span className="absolute top-0 right-0 size-[9px] rounded-full bg-bone shadow-[0_0_12px_3px_rgb(221_43_55/0.85)]" />
        </span>
      </motion.span>
      <motion.span
        aria-hidden
        className="absolute top-0 -left-1 h-full w-[9px] overflow-hidden lg:hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={viewportOnce}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        <span className="absolute inset-0 animate-scan-y" style={{ animationDelay: `${SCAN_START}s` }}>
          <span className="absolute bottom-0 left-1 h-1/4 w-px bg-linear-to-b from-transparent via-signal/60 to-signal shadow-[0_0_8px_rgb(221_43_55/0.7)]" />
          <span className="absolute bottom-0 left-0 size-[9px] rounded-full bg-bone shadow-[0_0_12px_3px_rgb(221_43_55/0.85)]" />
        </span>
      </motion.span>

      {processSteps.map((step, i) => {
        const hit = { animationDelay: `${SCAN_START + (SCAN_CROSSING * i) / processSteps.length}s` } as CSSProperties
        return (
          <motion.li
            key={step.title}
            className="group relative pl-8 lg:pt-10 lg:pl-0"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 1, ease: easeExpo, delay: 0.15 + i * 0.12 }}
          >
            <span
              aria-hidden
              className="absolute top-1.5 -left-[5px] size-[11px] transition-transform duration-500 ease-expo group-hover:scale-125 group-hover:rotate-45 lg:-top-[5px] lg:left-0"
            >
              <span className="absolute inset-0 animate-node-ring border border-signal" style={hit} />
              <span className="absolute inset-0 animate-node-flash bg-signal" style={hit} />
            </span>
            <p className="font-mono text-sm text-signal">{String(i + 1).padStart(2, '0')}</p>
            <h3 className="mt-4 display text-display-md">{step.title}</h3>
            <p className="mt-3 eyebrow text-ash">{step.duration}</p>
            <p className="mt-5 max-w-sm leading-relaxed text-bone/75">{step.description}</p>
          </motion.li>
        )
      })}
    </ol>
  )
}
