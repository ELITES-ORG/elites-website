import Lenis from 'lenis'
import { useEffect, useMemo, useRef, type ReactNode } from 'react'
import { SmoothScrollContext, type ScrollTarget, type SmoothScrollApi } from './smooth-scroll-context'

function nativeScrollTo(target: ScrollTarget, offset = 0, immediate = false) {
  const behavior: ScrollBehavior = immediate ? 'instant' : 'smooth'
  if (typeof target === 'number') {
    window.scrollTo({ top: target + offset, behavior })
    return
  }
  const el = typeof target === 'string' ? document.querySelector<HTMLElement>(target) : target
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY + offset
  window.scrollTo({ top, behavior })
}

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const instance = new Lenis({
      autoRaf: true,
      lerp: 0.11,
      wheelMultiplier: 0.95,
      anchors: false,
    })
    lenisRef.current = instance

    return () => {
      instance.destroy()
      lenisRef.current = null
    }
  }, [])

  const api = useMemo<SmoothScrollApi>(
    () => ({
      scrollTo: (target, options = {}) => {
        const { offset = 0, immediate = false } = options
        const lenis = lenisRef.current
        if (lenis) {
          lenis.scrollTo(target, { offset, immediate, force: true, duration: 1.4 })
        } else {
          nativeScrollTo(target, offset, immediate)
        }
      },
      lock: () => {
        lenisRef.current?.stop()
        document.documentElement.style.overflow = 'hidden'
      },
      unlock: () => {
        lenisRef.current?.start()
        document.documentElement.style.overflow = ''
      },
    }),
    [],
  )

  return <SmoothScrollContext value={api}>{children}</SmoothScrollContext>
}
