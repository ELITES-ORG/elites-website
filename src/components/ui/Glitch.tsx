import type { ReactNode, Ref } from 'react'

export function Glitch({ children, ref }: { children: ReactNode; ref?: Ref<HTMLSpanElement> }) {
  return (
    <span ref={ref} className="glitch">
      <span className="glitch-base">{children}</span>
      <span aria-hidden className="glitch-layer glitch-layer-b">
        {children}
      </span>
      <span aria-hidden className="glitch-layer glitch-layer-a">
        {children}
      </span>
    </span>
  )
}
