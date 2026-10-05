import type { ReactNode } from 'react'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { FadeIn } from '@/components/ui/FadeIn'
import { RevealText } from '@/components/ui/RevealText'
import { cn } from '@/lib/cn'

interface SectionHeaderProps {
  eyebrow: string
  lines: string[]
  outlineLine?: number
  aside?: ReactNode
  className?: string
}

export function SectionHeader({ eyebrow, lines, outlineLine, aside, className }: SectionHeaderProps) {
  return (
    <div className={cn('flex flex-col gap-8 md:flex-row md:items-end md:justify-between', className)}>
      <div>
        <FadeIn y={12}>
          <Eyebrow>{eyebrow}</Eyebrow>
        </FadeIn>
        <RevealText
          glitch
          className="mt-6 display text-display-lg"
          lines={lines}
          lineClassName={(i) => (i === outlineLine ? 'text-outline' : '')}
        />
      </div>
      {aside && (
        <FadeIn delay={0.2} className="md:max-w-sm md:pb-1">
          {aside}
        </FadeIn>
      )}
    </div>
  )
}
