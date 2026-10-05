import { motion, useInView } from 'motion/react'
import { useRef, type ReactNode } from 'react'
import { Glitch } from '@/components/ui/Glitch'
import { cn } from '@/lib/cn'
import { easeExpo, viewportOnce } from '@/lib/motion'
import { useGlitchLoop } from '@/lib/use-glitch-loop'

interface RevealTextProps {
  lines: ReactNode[]
  as?: 'h1' | 'h2' | 'h3' | 'p'
  className?: string
  lineClassName?: string | ((index: number) => string)
  delay?: number
  stagger?: number
  /** `mount` animates immediately, `view` waits until scrolled into view */
  trigger?: 'mount' | 'view'
  /** Periodically glitch one line at a time while the text is on screen */
  glitch?: boolean
}

export function RevealText({
  lines,
  as: Tag = 'h2',
  className,
  lineClassName,
  delay = 0,
  stagger = 0.09,
  trigger = 'view',
  glitch = false,
}: RevealTextProps) {
  const ref = useRef<HTMLHeadingElement>(null)
  const inView = useInView(ref, viewportOnce)
  const shown = trigger === 'mount' || inView
  const glitchTarget = useGlitchLoop(glitch ? (delay + 2) * 1000 : null)

  return (
    <Tag ref={ref} className={className}>
      {lines.map((line, i) => {
        const lineClass = typeof lineClassName === 'function' ? lineClassName(i) : lineClassName
        return (
          <span key={i} className="-mb-[0.08em] block overflow-hidden pb-[0.08em]">
            <motion.span
              className={cn('block will-change-transform', !glitch && lineClass)}
              initial={{ y: '108%' }}
              animate={{ y: shown ? '0%' : '108%' }}
              transition={{ duration: 1.1, ease: easeExpo, delay: delay + i * stagger }}
            >
              {glitch ? (
                <Glitch ref={glitchTarget(i)}>
                  <span className={lineClass}>{line}</span>
                </Glitch>
              ) : (
                line
              )}
            </motion.span>
          </span>
        )
      })}
    </Tag>
  )
}
