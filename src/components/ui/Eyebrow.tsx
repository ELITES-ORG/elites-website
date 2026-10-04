import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn('flex items-center gap-3 eyebrow text-ash', className)}>
      <span aria-hidden className="h-[3px] w-7 bg-signal" />
      {children}
    </p>
  )
}
