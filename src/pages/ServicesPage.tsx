import { motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import { PAGE_REVEAL_DELAY } from '@/components/layout/PageTransition'
import { Seo } from '@/components/layout/Seo'
import { PageHero } from '@/components/sections/PageHero'
import { SectionHeader } from '@/components/sections/SectionHeader'
import { Accordion } from '@/components/ui/Accordion'
import { FadeIn } from '@/components/ui/FadeIn'
import { Icon } from '@/components/ui/Icon'
import { Tag } from '@/components/ui/Tag'
import { engagementModels, faqs, services } from '@/content/services'
import type { Service } from '@/content/types'
import { cn } from '@/lib/cn'
import { easeExpo, viewportOnce } from '@/lib/motion'
import { useSmoothScroll } from '@/lib/smooth-scroll-context'

const HEADER_OFFSET = -110

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length > 0) setActive(visible[0].target.id)
      },
      { rootMargin: '-35% 0px -60% 0px' },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [ids])

  return active
}

function ServiceDetail({ service }: { service: Service }) {
  return (
    <article
      id={service.slug}
      className="scroll-mt-32 border-t border-graphite py-14 first:border-t-0 first:pt-0 md:py-20"
    >
      <FadeIn className="flex items-center gap-4">
        <span className="flex size-12 items-center justify-center bg-signal">
          <Icon name={service.icon} className="text-lg text-bone" />
        </span>
        <h2 className="display text-display-md">{service.title}</h2>
      </FadeIn>

      <FadeIn delay={0.05}>
        <p className="mt-8 max-w-3xl text-lede text-bone/85">{service.description}</p>
      </FadeIn>

      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-16">
        <FadeIn delay={0.1}>
          <h3 className="mb-5 eyebrow text-ash">What you get</h3>
          <ul className="grid gap-x-8 gap-y-3.5 sm:grid-cols-2">
            {service.deliverables.map((item) => (
              <li key={item} className="flex items-start gap-3 text-bone/85">
                <Icon name="fi-rs-check" className="mt-1 text-xs text-signal" />
                {item}
              </li>
            ))}
          </ul>
        </FadeIn>
        <FadeIn delay={0.15}>
          <h3 className="mb-5 eyebrow text-ash">Typical stack</h3>
          <ul className="flex flex-wrap gap-2 lg:max-w-56">
            {service.stack.map((tech) => (
              <li key={tech}>
                <Tag>{tech}</Tag>
              </li>
            ))}
          </ul>
        </FadeIn>
      </div>
    </article>
  )
}

export default function ServicesPage() {
  const { hash } = useLocation()
  const { scrollTo } = useSmoothScroll()
  const [ids] = useState(() => services.map((s) => s.slug))
  const active = useActiveSection(ids)

  useEffect(() => {
    if (!hash) return
    const timer = window.setTimeout(() => scrollTo(hash, { offset: HEADER_OFFSET }), PAGE_REVEAL_DELAY * 1000 + 250)
    return () => window.clearTimeout(timer)
  }, [hash, scrollTo])

  return (
    <>
      <Seo
        title="Services"
        description="Web platforms, mobile apps, cloud infrastructure, product design, integrations and ongoing support from Elites."
      />
      <PageHero
        eyebrow="Services"
        lines={['Software,', 'end to end']}
        outlineLine={1}
        intro="Strategy, design, engineering and support under one roof. Hire us for a single discipline or hand us the whole product. Either way you deal with the same senior team."
      />

      <section className="container-page pb-[clamp(5rem,11vw,10rem)]">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <aside className="hidden lg:col-span-3 lg:block">
            <nav aria-label="Services" className="sticky top-[calc(var(--header-h)+2.5rem)]">
              <p className="mb-6 eyebrow text-ash">On this page</p>
              <ul className="flex flex-col border-l border-graphite">
                {services.map((s) => (
                  <li key={s.slug}>
                    <a
                      href={`#${s.slug}`}
                      onClick={(e) => {
                        e.preventDefault()
                        scrollTo(`#${s.slug}`, { offset: HEADER_OFFSET })
                        history.replaceState(null, '', `#${s.slug}`)
                      }}
                      className={cn(
                        'relative -ml-px block border-l py-2.5 pl-5 text-sm transition-colors duration-300',
                        active === s.slug ? 'border-signal text-bone' : 'border-transparent text-ash hover:text-bone',
                      )}
                    >
                      {s.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          <div className="lg:col-span-9">
            {services.map((s) => (
              <ServiceDetail key={s.slug} service={s} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-carbon">
        <div className="container-page section-y">
          <SectionHeader
            eyebrow="Engagement models"
            lines={['Ways to', 'work together']}
            outlineLine={0}
            aside={
              <p className="leading-relaxed text-ash">
                Pick the model that fits where your product is today. You can switch as it grows.
              </p>
            }
          />
          <ul className="mt-16 grid gap-px bg-graphite md:mt-24 md:grid-cols-3">
            {engagementModels.map((model, i) => (
              <motion.li
                key={model.title}
                className="group relative flex flex-col bg-carbon p-8 md:p-10"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 1, ease: easeExpo, delay: i * 0.1 }}
              >
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-signal transition-transform duration-700 ease-expo group-hover:scale-x-100"
                />
                <p className="eyebrow text-signal">{model.bestFor}</p>
                <h3 className="mt-5 display text-display-md">{model.title}</h3>
                <p className="mt-5 leading-relaxed text-ash">{model.description}</p>
                <ul className="mt-8 flex flex-col gap-3 border-t border-graphite pt-6">
                  {model.points.map((point) => (
                    <li key={point} className="flex items-center gap-3 text-sm text-bone/85">
                      <span aria-hidden className="size-1.5 bg-signal" />
                      {point}
                    </li>
                  ))}
                </ul>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-page grid gap-12 section-y lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <SectionHeader eyebrow="FAQ" lines={['Common', 'questions']} outlineLine={1} />
        </div>
        <FadeIn className="lg:col-span-8">
          <Accordion items={faqs} />
        </FadeIn>
      </section>
    </>
  )
}
