import { motion, useInView } from 'motion/react'
import { useRef, type ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { easeExpo, viewportOnce } from '@/lib/motion'

interface RevealTextProps {
  lines: ReactNode[]
  as?: 'h1' | 'h2' | 'h3' | 'p'
  className?: string
  lineClassName?: string | ((index: number) => string)
  delay?: number
  stagger?: number
  /** `mount` animates immediately, `view` waits until scrolled into view */
  trigger?: 'mount' | 'view'
}

export function RevealText({
  lines,
  as: Tag = 'h2',
  className,
  lineClassName,
  delay = 0,
  stagger = 0.09,
  trigger = 'view',
}: RevealTextProps) {
  const ref = useRef<HTMLHeadingElement>(null)
  const inView = useInView(ref, viewportOnce)
  const shown = trigger === 'mount' || inView

  return (
    <Tag ref={ref} className={className}>
      {lines.map((line, i) => (
        <span key={i} className="-mb-[0.08em] block overflow-hidden pb-[0.08em]">
          <motion.span
            className={cn(
              'block will-change-transform',
              typeof lineClassName === 'function' ? lineClassName(i) : lineClassName,
            )}
            initial={{ y: '108%' }}
            animate={{ y: shown ? '0%' : '108%' }}
            transition={{ duration: 1.1, ease: easeExpo, delay: delay + i * stagger }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}
