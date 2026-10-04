import type { ReactNode } from 'react'
import { PAGE_REVEAL_DELAY } from '@/components/layout/PageTransition'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { FadeIn } from '@/components/ui/FadeIn'
import { RevealText } from '@/components/ui/RevealText'

interface PageHeroProps {
  eyebrow: string
  lines: string[]
  /** Index of the line rendered in outline type */
  outlineLine?: number
  intro: string
  aside?: ReactNode
}

export function PageHero({ eyebrow, lines, outlineLine, intro, aside }: PageHeroProps) {
  return (
    <section className="container-page pt-[calc(var(--header-h)+clamp(4rem,11vw,10rem))] pb-16 md:pb-24">
      <FadeIn trigger="mount" delay={PAGE_REVEAL_DELAY} y={12}>
        <Eyebrow>{eyebrow}</Eyebrow>
      </FadeIn>

      <RevealText
        as="h1"
        trigger="mount"
        delay={PAGE_REVEAL_DELAY + 0.05}
        className="mt-8 display text-display-xl md:mt-10"
        lines={lines}
        lineClassName={(i) => (i === outlineLine ? 'text-outline md:[--outline-width:2px]' : '')}
      />

      <FadeIn
        trigger="mount"
        delay={PAGE_REVEAL_DELAY + 0.35}
        className="mt-14 grid gap-8 border-t border-graphite pt-8 md:mt-20 md:grid-cols-12 md:pt-10"
      >
        <div className="md:col-span-5">{aside}</div>
        <p className="text-lede text-bone/80 md:col-span-7">{intro}</p>
      </FadeIn>
    </section>
  )
}
