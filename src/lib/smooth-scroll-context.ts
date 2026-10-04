import { createContext, useContext } from 'react'

export type ScrollTarget = number | string | HTMLElement

export interface SmoothScrollApi {
  scrollTo: (target: ScrollTarget, options?: { offset?: number; immediate?: boolean }) => void
  lock: () => void
  unlock: () => void
}

export const SmoothScrollContext = createContext<SmoothScrollApi | null>(null)

export function useSmoothScroll() {
  const ctx = useContext(SmoothScrollContext)
  if (!ctx) throw new Error('useSmoothScroll must be used inside <SmoothScrollProvider>')
  return ctx
}
