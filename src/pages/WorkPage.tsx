import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { Seo } from '@/components/layout/Seo'
import { PageHero } from '@/components/sections/PageHero'
import { ProjectCard } from '@/components/sections/ProjectCard'
import { FadeIn } from '@/components/ui/FadeIn'
import { projectCategories, projects } from '@/content/projects'
import type { ProjectCategory } from '@/content/types'
import { cn } from '@/lib/cn'
import { easeExpo } from '@/lib/motion'

type Filter = 'All' | ProjectCategory

export default function WorkPage() {
  const [filter, setFilter] = useState<Filter>('All')
  const filters: Filter[] = ['All', ...projectCategories]
  const visible = filter === 'All' ? projects : projects.filter((p) => p.categories.includes(filter))

  return (
    <>
      <Seo
        title="Work"
        description="Selected software projects by Elites across logistics, healthcare, retail, finance and SaaS."
      />
      <PageHero
        eyebrow="Work"
        lines={['Selected', 'projects']}
        outlineLine={1}
        intro="A sample of what we have shipped recently. Some clients prefer to stay unnamed, so we describe the problem and the result instead."
      />

      <section className="container-page pb-[clamp(5rem,11vw,10rem)]">
        <FadeIn className="flex flex-wrap items-center justify-between gap-6 border-b border-graphite pb-6">
          <div role="group" aria-label="Filter projects" className="flex flex-wrap gap-2">
            {filters.map((f) => {
              const isActive = filter === f
              const count = f === 'All' ? projects.length : projects.filter((p) => p.categories.includes(f)).length
              return (
                <button
                  key={f}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setFilter(f)}
                  className={cn(
                    'relative isolate flex h-10 items-center gap-2 border px-4 text-[0.78rem] font-medium tracking-[0.1em] uppercase transition-colors duration-300',
                    isActive
                      ? 'border-signal text-bone'
                      : 'border-graphite text-ash hover:border-smoke hover:text-bone',
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="work-filter"
                      className="absolute inset-0 -z-10 bg-signal"
                      transition={{ duration: 0.5, ease: easeExpo }}
                    />
                  )}
                  {f}
                  <span className={cn('font-mono text-[0.68rem]', isActive ? 'text-bone/80' : 'text-smoke')}>
                    {count}
                  </span>
                </button>
              )
            })}
          </div>
          <p className="font-mono text-sm text-ash">
            Showing {visible.length} of {projects.length}
          </p>
        </FadeIn>

        <motion.ul layout className="mt-14 grid gap-x-10 gap-y-20 md:mt-20 md:grid-cols-2 lg:gap-x-16">
          <AnimatePresence mode="popLayout">
            {visible.map((project) => (
              <motion.li
                key={project.slug}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.7, ease: easeExpo }}
              >
                <ProjectCard project={project} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </section>
    </>
  )
}
