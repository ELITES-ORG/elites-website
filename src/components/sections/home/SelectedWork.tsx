import { Link } from 'react-router'
import { ProjectCard } from '@/components/sections/ProjectCard'
import { SectionHeader } from '@/components/sections/SectionHeader'
import { FadeIn } from '@/components/ui/FadeIn'
import { Icon } from '@/components/ui/Icon'
import { RollText } from '@/components/ui/RollText'
import { projects } from '@/content/projects'
import { cn } from '@/lib/cn'

export function SelectedWork() {
  const featured = projects.filter((p) => p.featured)

  return (
    <section className="bg-carbon">
      <div className="container-page section-y">
        <SectionHeader
          eyebrow="Selected work"
          lines={['Recent', 'projects']}
          outlineLine={0}
          aside={
            <Link to="/work" className="group inline-flex items-center gap-3 eyebrow text-bone">
              <RollText>All projects</RollText>
              <Icon
                name="fi-rs-arrow-right"
                className="text-signal transition-transform duration-500 ease-expo group-hover:translate-x-1.5"
              />
            </Link>
          }
        />

        <div className="mt-16 grid gap-16 md:mt-24 md:grid-cols-2 md:gap-x-10 md:gap-y-24 lg:gap-x-16">
          {featured.map((project, i) => (
            <FadeIn key={project.slug} className={cn(i % 2 === 1 && 'md:mt-40')} delay={i % 2 === 1 ? 0.12 : 0}>
              <ProjectCard project={project} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
