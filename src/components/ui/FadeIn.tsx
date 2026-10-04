import { motion, type HTMLMotionProps } from 'motion/react'
import { easeExpo, viewportOnce } from '@/lib/motion'

interface FadeInProps extends HTMLMotionProps<'div'> {
  delay?: number
  y?: number
  trigger?: 'mount' | 'view'
}

export function FadeIn({ delay = 0, y = 28, trigger = 'view', children, ...rest }: FadeInProps) {
  const target = { opacity: 1, y: 0 }

  return (
    <motion.div
      initial={{ opacity: 0, y }}
      {...(trigger === 'mount' ? { animate: target } : { whileInView: target, viewport: viewportOnce })}
      transition={{ duration: 1, ease: easeExpo, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}
