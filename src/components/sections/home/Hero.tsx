import { motion, useScroll, useTransform } from 'motion/react'
import { useRef, type ReactNode } from 'react'
import { PAGE_REVEAL_DELAY } from '@/components/layout/PageTransition'
import { ButtonLink } from '@/components/ui/Button'
import { FadeIn } from '@/components/ui/FadeIn'
import { Icon } from '@/components/ui/Icon'
import { site } from '@/content/site'
import { easeExpo } from '@/lib/motion'

function Line({ children, delay }: { children: ReactNode; delay: number }) {
  return (
    <span className="-mb-[0.06em] block overflow-hidden pb-[0.06em]">
      <motion.span
        className="block"
        initial={{ y: '108%' }}
        animate={{ y: '0%' }}
        transition={{ duration: 1.2, ease: easeExpo, delay }}
      >
        {children}
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

  return (
    <section
      ref={ref}
      className="relative flex flex-col justify-end overflow-hidden pt-[calc(var(--header-h)+6rem)] pb-12 md:min-h-[100svh] md:pt-[calc(var(--header-h)+3rem)]"
    >
      <div className="container-page">
        <h1 className="display text-hero">
          <span className="sr-only">We build software that lasts.</span>
          <span aria-hidden>
            <motion.span className="block" style={{ x: driftLeft }}>
              <Line delay={d}>We build</Line>
            </motion.span>

            <motion.span className="block pl-[1.6em]" style={{ x: driftRight }}>
              <Line delay={d + 0.08}>
                <span className="relative inline-block">
                  <span className="text-outline [--outline-width:1px] md:[--outline-width:2px]">Software</span>
                  <motion.span className="absolute inset-0 text-signal" style={{ clipPath: fill }}>
                    Software
                  </motion.span>
                </span>
              </Line>
            </motion.span>

            <motion.span className="block" style={{ x: driftLeft }}>
              <Line delay={d + 0.16}>
                That lasts<span className="text-signal">.</span>
              </Line>
            </motion.span>
          </span>
        </h1>

        <motion.div
          style={{ opacity: fade }}
          className="mt-12 grid gap-10 border-t border-graphite pt-8 md:mt-16 md:grid-cols-12 md:items-end"
        >
          <FadeIn trigger="mount" delay={d + 0.45} className="md:col-span-6 lg:col-span-5">
            <p className="text-lede text-bone/80">
              Elites is a software development studio. We design, build and maintain web platforms, mobile apps and
              cloud systems for companies that cannot afford downtime.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink to="/contact">Start a project</ButtonLink>
              <ButtonLink to="/work" variant="outline" arrow={false}>
                See our work
              </ButtonLink>
            </div>
          </FadeIn>

          <FadeIn
            trigger="mount"
            delay={d + 0.6}
            className="flex items-end justify-between gap-6 md:col-span-6 md:col-start-7 lg:col-span-5 lg:col-start-8"
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
