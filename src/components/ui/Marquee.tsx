import type { CSSProperties, ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface MarqueeProps {
  children: ReactNode
  duration?: number
  reverse?: boolean
  className?: string
}

export function Marquee({ children, duration = 40, reverse = false, className }: MarqueeProps) {
  return (
    <div className={cn('group flex overflow-hidden', className)}>
      <div
        className={cn(
          'flex w-max shrink-0 animate-marquee group-hover:[animation-play-state:paused]',
          reverse && '[animation-direction:reverse]',
        )}
        style={{ '--marquee-duration': `${duration}s` } as CSSProperties}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  )
}
