import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'
import { Mark } from '@/components/ui/Logo'
import { easeQuart } from '@/lib/motion'

/** Seconds until the curtain has cleared enough for page content to start animating in. */
export const PAGE_REVEAL_DELAY = 0.55

const COVER = 0.6
const HOLD = 0.12
const REVEAL = 0.75

export function PageTransition({ children, label }: { children: ReactNode; label: string }) {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <motion.div initial="enter" animate="idle" exit="leave">
      {children}

      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[90] bg-signal"
        variants={{
          enter: { clipPath: 'inset(100% 0% 0% 0%)' },
          idle: { clipPath: 'inset(100% 0% 0% 0%)' },
          leave: { clipPath: 'inset(0% 0% 0% 0%)', transition: { duration: COVER, ease: easeQuart } },
        }}
      />

      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[91] flex items-center justify-center bg-signal"
        variants={{
          enter: { clipPath: 'inset(0% 0% 0% 0%)' },
          idle: {
            clipPath: 'inset(0% 0% 100% 0%)',
            transition: { duration: REVEAL, ease: easeQuart, delay: HOLD },
          },
          leave: { clipPath: 'inset(0% 0% 100% 0%)' },
        }}
      >
        <motion.div
          className="flex items-center gap-5 md:gap-7"
          variants={{
            enter: { opacity: 1, y: 0 },
            idle: { opacity: 0, y: -40, transition: { duration: REVEAL * 0.8, ease: easeQuart, delay: HOLD } },
          }}
        >
          <Mark tone="white" className="w-10 md:w-14" />
          <span className="display text-display-lg text-bone">{label}</span>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
