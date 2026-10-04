import { ProjectVisual } from '@/components/ui/ProjectVisual'
import { Tag } from '@/components/ui/Tag'
import type { Project } from '@/content/types'
import { cn } from '@/lib/cn'

export function ProjectCard({ project, className }: { project: Project; className?: string }) {
  return (
    <article className={cn('group flex flex-col', className)}>
      <div className="relative overflow-hidden">
        <ProjectVisual
          kind={project.visual}
          image={project.image}
          alt={project.title}
          className="aspect-[4/3] transition-transform duration-[1.2s] ease-expo group-hover:scale-[1.035]"
        />
        <span
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-signal transition-transform duration-700 ease-expo group-hover:scale-x-100"
        />
        <span className="absolute top-4 left-4 bg-ink/85 px-2.5 py-1 font-mono text-[0.7rem] tracking-[0.08em] text-bone/85 uppercase backdrop-blur-sm">
          {project.sector}
        </span>
      </div>

      <div className="mt-6 flex items-baseline justify-between gap-6">
        <h3 className="display text-[clamp(1.05rem,1.55vw,1.45rem)] leading-tight">{project.title}</h3>
        <span className="shrink-0 font-mono text-sm text-ash">{project.year}</span>
      </div>

      <p className="mt-3 max-w-xl leading-relaxed text-ash">{project.summary}</p>

      <p className="mt-5 flex items-start gap-3 text-sm font-medium text-bone">
        <span aria-hidden className="mt-[0.55em] h-[2px] w-4 shrink-0 bg-signal" />
        {project.outcome}
      </p>

      <ul className="mt-5 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <li key={tech}>
            <Tag>{tech}</Tag>
          </li>
        ))}
      </ul>
    </article>
  )
}
