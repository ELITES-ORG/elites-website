import { Fragment } from 'react'
import { Marquee } from '@/components/ui/Marquee'
import { techStack } from '@/content/company'
import { cn } from '@/lib/cn'

export function StackMarquee() {
  return (
    <section aria-label="Technologies we work with" className="border-y border-graphite py-7 md:py-9">
      <Marquee duration={45}>
        {techStack.map((tech, i) => (
          <Fragment key={tech}>
            <span
              className={cn(
                'px-6 display text-[clamp(1.4rem,3vw,2.6rem)] leading-none whitespace-nowrap md:px-10',
                i % 2 === 0 ? 'text-signal' : 'text-outline',
              )}
            >
              {tech}
            </span>
            <span aria-hidden className="size-2 shrink-0 bg-smoke" />
          </Fragment>
        ))}
      </Marquee>
    </section>
  )
}
