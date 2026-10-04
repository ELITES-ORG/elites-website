import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center border border-graphite px-2.5 py-1 font-mono text-[0.7rem] tracking-[0.08em] text-ash uppercase',
        className,
      )}
    >
      {children}
    </span>
  )
}
