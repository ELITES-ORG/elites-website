import { cn } from '@/lib/cn'

interface IconProps {
  /** Flaticon UIcons class, e.g. `fi-rs-arrow-right` or `fi-brands-github` */
  name: string
  label?: string
  className?: string
}

export function Icon({ name, label, className }: IconProps) {
  return (
    <i
      className={cn('fi', name, 'inline-flex shrink-0 items-center justify-center leading-none', className)}
      aria-hidden={label ? undefined : true}
      aria-label={label}
      role={label ? 'img' : undefined}
    />
  )
}
