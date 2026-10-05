import { useReducedMotion } from 'motion/react'
import { useEffect, useRef } from 'react'

const BURST_MS = 420

/** Glitches one random target at a time, every few seconds, by toggling `data-glitch` on it. */
export function useGlitchLoop(startDelayMs: number) {
  const targets = useRef<(HTMLElement | null)[]>([])
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (reduceMotion) return
    const elements = targets.current
    let timer = 0
    let last = -1

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
        const candidates = elements.map((_, i) => i).filter((i) => i !== last && elements[i])
        if (document.hidden || candidates.length === 0) return schedule(1500)
        last = candidates[Math.floor(Math.random() * candidates.length)]
        const el = elements[last]!
        burst(el, () => {
          if (Math.random() < 0.35) timer = window.setTimeout(() => burst(el, () => schedule(nextWait())), 90)
          else schedule(nextWait())
        })
      }, wait)
    }

    schedule(startDelayMs)
    return () => {
      window.clearTimeout(timer)
      elements.forEach((el) => el?.removeAttribute('data-glitch'))
    }
  }, [reduceMotion, startDelayMs])

  return (index: number) => (el: HTMLElement | null) => {
    targets.current[index] = el
  }
}
