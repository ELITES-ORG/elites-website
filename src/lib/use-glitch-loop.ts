import { useReducedMotion } from 'motion/react'
import { useEffect, useRef } from 'react'

const BURST_MS = 420

/**
 * Glitches one random on-screen target at a time, every few seconds, by toggling `data-glitch` on it.
 * Pass `null` to keep the loop switched off.
 */
export function useGlitchLoop(startDelayMs: number | null) {
  const targets = useRef<(HTMLElement | null)[]>([])
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (reduceMotion || startDelayMs === null) return
    const elements = targets.current.filter((el): el is HTMLElement => el !== null)
    if (elements.length === 0) return

    let timer = 0
    let last: HTMLElement | null = null
    const visible = new Set<Element>()
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) visible.add(entry.target)
        else visible.delete(entry.target)
      }
    })
    elements.forEach((el) => observer.observe(el))

    const nextWait = () => 3000 + Math.random() * 2000

    const burst = (el: HTMLElement, done: () => void) => {
      el.setAttribute('data-glitch', '')
      timer = window.setTimeout(() => {
        el.removeAttribute('data-glitch')
        done()
      }, BURST_MS)
    }

    const schedule = (wait: number) => {
      timer = window.setTimeout(() => {
        const onScreen = elements.filter((el) => visible.has(el))
        const candidates = onScreen.length > 1 ? onScreen.filter((el) => el !== last) : onScreen
        if (document.hidden || candidates.length === 0) return schedule(1500)
        const el = candidates[Math.floor(Math.random() * candidates.length)]
        last = el
        burst(el, () => {
          if (Math.random() < 0.35) timer = window.setTimeout(() => burst(el, () => schedule(nextWait())), 90)
          else schedule(nextWait())
        })
      }, wait)
    }

    schedule(startDelayMs)
    return () => {
      window.clearTimeout(timer)
      observer.disconnect()
      elements.forEach((el) => el.removeAttribute('data-glitch'))
    }
  }, [reduceMotion, startDelayMs])

  return (index: number) => (el: HTMLElement | null) => {
    targets.current[index] = el
  }
}
