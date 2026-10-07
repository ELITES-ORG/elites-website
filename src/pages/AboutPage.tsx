import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { Seo } from '@/components/layout/Seo'
import { PageHero } from '@/components/sections/PageHero'
import { SectionHeader } from '@/components/sections/SectionHeader'
import { StackMarquee } from '@/components/sections/home/StackMarquee'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { FadeIn } from '@/components/ui/FadeIn'
import { Icon } from '@/components/ui/Icon'
import { Mark } from '@/components/ui/Logo'
import { principles } from '@/content/company'
import { site } from '@/content/site'
import { easeExpo, viewportOnce } from '@/lib/motion'

function Story() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['12%', '-12%'])

  return (
    <section ref={ref} className="container-page grid gap-16 section-y md:grid-cols-12 md:gap-10">
      <div className="relative md:col-span-5">
        <div className="sticky top-[calc(var(--header-h)+3rem)] flex aspect-square items-center justify-center overflow-hidden border border-graphite bg-carbon">
          <motion.div style={{ y }} className="w-[46%]">
            <Mark className="w-full" />
          </motion.div>
          <span className="absolute bottom-5 left-5 eyebrow text-ash">Based in {site.location}</span>
          <span className="absolute right-5 bottom-5 eyebrow text-ash">{site.timezone}</span>
        </div>
      </div>

      <div className="flex flex-col gap-8 md:col-span-6 md:col-start-7">
        <FadeIn y={12}>
          <Eyebrow>Our story</Eyebrow>
        </FadeIn>
        <FadeIn>
          <p className="text-lede text-bone">
            Elites started with a simple frustration: good products kept getting slowed down by agencies that pitched
            their best people, then staffed junior teams.
          </p>
        </FadeIn>
        <FadeIn>
          <p className="leading-relaxed text-ash">
            So we built the studio we would want to hire. A tight group of engineers and designers who talk to clients
            directly, write code that other developers can read, and stay accountable for what they ship. We keep the
            team small on purpose. It means fewer handoffs, faster decisions and nobody on your project who is learning
            on your budget.
          </p>
        </FadeIn>
        <FadeIn>
          <p className="leading-relaxed text-ash">
            Today we work with startups shipping their first product, agencies that need a reliable engineering partner,
            and established businesses replacing systems they have outgrown. Most of our clients are overseas, and most
            of them come to us through referrals.
          </p>
        </FadeIn>
      </div>
    </section>
  )
}

function Principles() {
  return (
    <section className="bg-carbon">
      <div className="container-page section-y">
        <SectionHeader eyebrow="How we operate" lines={['What you can', 'expect from us']} outlineLine={1} />

        <ul className="mt-16 grid border-t border-l border-graphite sm:grid-cols-2 md:mt-24">
          {principles.map((p, i) => (
            <motion.li
              key={p.title}
              className="group relative flex flex-col gap-6 border-r border-b border-graphite p-8 md:p-12"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 1, ease: easeExpo, delay: (i % 2) * 0.1 }}
            >
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-signal transition-transform duration-700 ease-expo group-hover:scale-x-100"
              />
              <Icon name={p.icon} className="self-start text-3xl text-signal" />
              <h3 className="display text-[clamp(1.1rem,1.8vw,1.6rem)] leading-tight">{p.title}</h3>
              <p className="max-w-md leading-relaxed text-ash">{p.description}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default function AboutPage() {
  return (
    <>
      <Seo
        title="About"
        description="Elites is a small software development studio of skilled engineers and designers. Learn how we work and what to expect."
      />
      <PageHero
        eyebrow="About Elites"
        lines={['Small team.', 'Skilled work.']}
        outlineLine={0}
        intro="We are a software development studio of engineers and designers who have shipped products for startups, agencies and established businesses. We keep the team small so the people you meet are the people who build."
      />
      <Story />
      <Principles />
      <div className="py-[clamp(4rem,8vw,7rem)]">
        <StackMarquee />
      </div>
    </>
  )
}
