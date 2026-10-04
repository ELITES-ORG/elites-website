import { motion } from 'motion/react'
import { Link } from 'react-router'
import { SectionHeader } from '@/components/sections/SectionHeader'
import { Icon } from '@/components/ui/Icon'
import { services } from '@/content/services'
import { easeExpo, viewportOnce } from '@/lib/motion'

export function ServicesList() {
  return (
    <section className="container-page pb-[clamp(5rem,11vw,10rem)]">
      <SectionHeader
        eyebrow="Services"
        lines={['From first sketch', 'to production']}
        outlineLine={1}
        aside={
          <p className="leading-relaxed text-ash">
            One team for strategy, design, engineering and support. Bring us in for a single piece or the whole build.
          </p>
        }
      />

      <ul className="mt-16 border-t border-graphite md:mt-20">
        {services.map((service, i) => (
          <motion.li
            key={service.slug}
            className="border-b border-graphite"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.9, ease: easeExpo, delay: i * 0.05 }}
          >
            <Link
              to={`/services#${service.slug}`}
              className="group relative isolate grid grid-cols-[auto_1fr_auto] items-center gap-x-5 gap-y-2 py-7 md:grid-cols-[3rem_minmax(0,1.1fr)_minmax(0,1fr)_auto] md:gap-x-8 md:py-9"
            >
              <span
                aria-hidden
                className="absolute inset-y-0 -right-[clamp(1.25rem,4vw,3.5rem)] -left-[clamp(1.25rem,4vw,3.5rem)] -z-10 origin-left scale-x-0 bg-signal transition-transform duration-700 ease-expo group-hover:scale-x-100"
              />
              <Icon
                name={service.icon}
                className="col-start-1 row-start-1 justify-self-start text-xl text-signal transition-colors duration-500 group-hover:text-bone md:text-2xl"
              />
              <h3 className="col-start-2 row-start-1 display text-[clamp(1.05rem,2.2vw,2rem)] leading-tight">
                {service.title}
              </h3>
              <p className="col-span-3 col-start-1 row-start-2 text-ash transition-colors duration-500 group-hover:text-bone md:col-span-1 md:col-start-3 md:row-start-1">
                {service.summary}
              </p>
              <span className="col-start-3 row-start-1 flex size-11 items-center justify-center border border-smoke transition-all duration-500 ease-expo group-hover:border-bone group-hover:bg-bone group-hover:text-ink md:col-start-4 md:size-12">
                <Icon
                  name="fi-rs-arrow-up-right"
                  className="text-sm transition-transform duration-500 ease-expo group-hover:rotate-45"
                />
              </span>
            </Link>
          </motion.li>
        ))}
      </ul>
    </section>
  )
}
