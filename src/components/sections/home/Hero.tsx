import { motion, useScroll, useTransform } from 'motion/react'
import { useRef, type ReactNode, type Ref } from 'react'
import { PAGE_REVEAL_DELAY } from '@/components/layout/PageTransition'
import { ButtonLink } from '@/components/ui/Button'
import { FadeIn } from '@/components/ui/FadeIn'
import { Glitch } from '@/components/ui/Glitch'
import { Icon } from '@/components/ui/Icon'
import { site } from '@/content/site'
import { easeExpo } from '@/lib/motion'
import { useGlitchLoop } from '@/lib/use-glitch-loop'

function Line({ children, delay, glitchRef }: { children: ReactNode; delay: number; glitchRef: Ref<HTMLSpanElement> }) {
  return (
    <span className="-mb-[0.06em] block overflow-hidden pb-[0.06em]">
      <motion.span
        className="block"
        initial={{ y: '108%' }}
        animate={{ y: '0%' }}
        transition={{ duration: 1.2, ease: easeExpo, delay }}
      >
        <Glitch ref={glitchRef}>{children}</Glitch>
      </motion.span>
    </span>
  )
}

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  const driftLeft = useTransform(scrollYProgress, [0, 1], ['0%', '-10%'])
  const driftRight = useTransform(scrollYProgress, [0, 1], ['0%', '8%'])
  const fill = useTransform(scrollYProgress, [0.02, 0.45], ['inset(0% 100% 0% 0%)', 'inset(0% 0% 0% 0%)'])
  const fade = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  const d = PAGE_REVEAL_DELAY
  const glitchTarget = useGlitchLoop((d + 2.4) * 1000)

  return (
    <section
      ref={ref}
      className="relative flex flex-col justify-end overflow-hidden pt-[calc(var(--header-h)+2.5rem)] pb-12 md:min-h-[100svh] md:pt-[calc(var(--header-h)+clamp(1.5rem,4vh,3rem))]"
    >
      <div className="container-page">
        <h1 className="display text-hero max-md:text-[length:min(calc((100vw_-_2*max(1.25rem,4vw))/8.6),4.5rem)]">
          <span className="sr-only">We build software that lasts.</span>
          <span aria-hidden>
            <motion.span className="block" style={{ x: driftLeft }}>
              <Line delay={d} glitchRef={glitchTarget(0)}>
                We build
              </Line>
            </motion.span>

            <motion.span className="block pl-[0.6em] md:pl-[1.6em]" style={{ x: driftRight }}>
              <Line delay={d + 0.08} glitchRef={glitchTarget(1)}>
                <span className="relative inline-block">
                  <span className="text-outline [--outline-width:1px] md:[--outline-width:2px]">Software</span>
                  <motion.span className="absolute inset-0 text-signal" style={{ clipPath: fill }}>
                    Software
                  </motion.span>
                </span>
              </Line>
            </motion.span>

            <motion.span className="block" style={{ x: driftLeft }}>
              <Line delay={d + 0.16} glitchRef={glitchTarget(2)}>
                That lasts<span className="text-signal">.</span>
              </Line>
            </motion.span>
          </span>
        </h1>

        <motion.div
          style={{ opacity: fade }}
          className="mt-12 grid gap-10 border-t border-graphite pt-8 md:mt-[clamp(2.5rem,7vh,4rem)] md:grid-cols-12 md:items-end"
        >
          <FadeIn trigger="mount" delay={d + 0.45} className="md:col-span-8 xl:col-span-9">
            <p className="text-lede text-bone/80 max-md:text-[length:1.05rem]">
              Elites is a software development studio. We design, build and maintain web platforms, mobile apps and
              cloud systems for companies that cannot afford downtime.
            </p>
            <div className="mt-8 inline-grid gap-3 sm:flex sm:flex-wrap">
              <ButtonLink to="/contact">Start a project</ButtonLink>
              <ButtonLink to="/work" variant="outline" arrow={false}>
                See our work
              </ButtonLink>
            </div>
          </FadeIn>

          <FadeIn
            trigger="mount"
            delay={d + 0.6}
            className="flex items-end justify-between gap-6 md:col-span-4 md:col-start-9 md:flex-col md:items-end xl:col-span-3 xl:col-start-10"
          >
            <p className="flex items-center gap-2.5 eyebrow text-bone/80">
              <span className="size-2 animate-pulse-dot rounded-full bg-signal" />
              {site.availability}
            </p>
            <p className="hidden items-center gap-3 eyebrow text-ash md:flex">
              Scroll
              <span className="relative flex h-10 w-px overflow-hidden bg-graphite">
                <motion.span
                  className="absolute inset-x-0 top-0 h-1/2 bg-bone"
                  animate={{ y: ['-100%', '200%'] }}
                  transition={{ duration: 1.8, ease: 'easeInOut', repeat: Infinity, repeatDelay: 0.4 }}
                />
              </span>
            </p>
            <Icon name="fi-rs-arrow-down" className="text-ash md:hidden" />
          </FadeIn>
        </motion.div>
      </div>
    </section>
  )
}
