import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { Link } from 'react-router'
import { cn } from '@/lib/cn'
import { Icon } from './Icon'
import { RollText } from './RollText'

type Variant = 'primary' | 'outline' | 'ink'

const base =
  'group relative isolate inline-flex h-13 items-center justify-center gap-4 overflow-hidden px-7 text-[0.8rem] font-semibold uppercase tracking-[0.12em] transition-colors duration-500 ease-expo disabled:pointer-events-none disabled:opacity-50'

const variants: Record<Variant, { root: string; fill: string }> = {
  primary: {
    root: 'bg-signal text-bone hover:text-ink',
    fill: 'bg-bone',
  },
  outline: {
    root: 'border border-bone/25 text-bone hover:border-signal',
    fill: 'bg-signal',
  },
  ink: {
    root: 'bg-ink text-bone hover:text-ink',
    fill: 'bg-bone',
  },
}

function ButtonInner({ children, variant, arrow }: { children: ReactNode; variant: Variant; arrow: boolean }) {
  return (
    <>
      <span
        aria-hidden
        className={cn(
          'absolute inset-0 -z-10 origin-bottom scale-y-0 transition-transform duration-500 ease-expo group-hover:scale-y-100',
          variants[variant].fill,
        )}
      />
      <RollText>{children}</RollText>
      {arrow && (
        <span className="relative flex size-4 overflow-hidden">
          <Icon
            name="fi-rs-arrow-right"
            className="absolute inset-0 text-sm transition-transform duration-500 ease-expo group-hover:translate-x-full"
          />
          <Icon
            name="fi-rs-arrow-right"
            className="absolute inset-0 -translate-x-full text-sm transition-transform duration-500 ease-expo group-hover:translate-x-0"
          />
        </span>
      )}
    </>
  )
}

interface CommonProps {
  variant?: Variant
  arrow?: boolean
  className?: string
  children: ReactNode
}

type ButtonLinkProps = CommonProps & { to: string } & Omit<ComponentPropsWithoutRef<'a'>, 'href'>

export function ButtonLink({ to, variant = 'primary', arrow = true, className, children, ...rest }: ButtonLinkProps) {
  const classes = cn(base, variants[variant].root, className)
  const isExternal = /^(https?:|mailto:|tel:)/.test(to)

  if (isExternal) {
    return (
      <a href={to} className={classes} {...rest}>
        <ButtonInner variant={variant} arrow={arrow}>
          {children}
        </ButtonInner>
      </a>
    )
  }

  return (
    <Link to={to} className={classes} {...rest}>
      <ButtonInner variant={variant} arrow={arrow}>
        {children}
      </ButtonInner>
    </Link>
  )
}

type ButtonProps = CommonProps & ComponentPropsWithoutRef<'button'>

export function Button({
  variant = 'primary',
  arrow = true,
  className,
  children,
  type = 'button',
  ...rest
}: ButtonProps) {
  return (
    <button type={type} className={cn(base, variants[variant].root, className)} {...rest}>
      <ButtonInner variant={variant} arrow={arrow}>
        {children}
      </ButtonInner>
    </button>
  )
}
