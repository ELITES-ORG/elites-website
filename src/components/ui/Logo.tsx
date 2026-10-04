import mark from '@/assets/brand/mark.webp'
import markWhite from '@/assets/brand/mark-white.webp'
import wordmark from '@/assets/brand/wordmark.webp'
import { cn } from '@/lib/cn'

export function Wordmark({ className }: { className?: string }) {
  return (
    <img src={wordmark} alt="Elites" width={1400} height={293} className={cn('h-auto', className)} draggable={false} />
  )
}

export function Mark({ className, tone = 'red' }: { className?: string; tone?: 'red' | 'white' }) {
  return (
    <img
      src={tone === 'white' ? markWhite : mark}
      alt=""
      aria-hidden
      width={515}
      height={640}
      className={cn('h-auto', className)}
      draggable={false}
    />
  )
}
