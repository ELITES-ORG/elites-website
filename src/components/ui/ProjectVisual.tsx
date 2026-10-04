import type { JSX, ReactNode } from 'react'
import type { ProjectVisualKind } from '@/content/types'
import { cn } from '@/lib/cn'

const panel = 'border border-graphite bg-ink'

function Dashboard() {
  return (
    <div className="absolute inset-[8%] flex gap-[3%]">
      <div className={cn(panel, 'flex w-[16%] flex-col gap-[6%] p-[3%]')}>
        <span className="h-[5%] w-[60%] bg-signal" />
        {[70, 55, 80, 50, 65].map((w, i) => (
          <span key={i} className="h-[3%] bg-smoke" style={{ width: `${w}%` }} />
        ))}
      </div>
      <div className="flex flex-1 flex-col gap-[4%]">
        <div className="grid h-[22%] grid-cols-3 gap-[4%]">
          {['$4.2M', '12.8%', '1,940'].map((v, i) => (
            <div key={v} className={cn(panel, 'flex flex-col justify-between p-[6%]')}>
              <span className="h-[10%] w-1/2 bg-smoke" />
              <span
                className={cn('font-mono text-[clamp(0.55rem,1.4vw,0.95rem)]', i === 1 ? 'text-signal' : 'text-bone')}
              >
                {v}
              </span>
            </div>
          ))}
        </div>
        <div className={cn(panel, 'relative flex-1 p-[4%]')}>
          <svg viewBox="0 0 300 120" preserveAspectRatio="none" className="size-full">
            {[30, 60, 90].map((y) => (
              <line key={y} x1="0" x2="300" y1={y} y2={y} stroke="var(--color-graphite)" strokeWidth="1" />
            ))}
            <polyline
              points="0,96 30,88 60,92 90,70 120,74 150,52 180,58 210,36 240,42 270,22 300,18"
              fill="none"
              stroke="var(--color-signal)"
              strokeWidth="2.5"
              vectorEffect="non-scaling-stroke"
            />
            <polyline
              points="0,104 30,100 60,98 90,92 120,94 150,84 180,80 210,76 240,70 270,66 300,60"
              fill="none"
              stroke="var(--color-smoke)"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}

function Phone({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div
      className={cn(
        'absolute aspect-[9/19] rounded-[1.6rem] border border-smoke bg-ink p-[3%] shadow-2xl shadow-black/60',
        className,
      )}
    >
      <div className="flex size-full flex-col gap-[5%] overflow-hidden rounded-[1.2rem] bg-carbon p-[8%]">
        {children}
      </div>
    </div>
  )
}

function Mobile() {
  return (
    <>
      <Phone className="top-[10%] left-[18%] w-[30%] -rotate-6">
        <span className="h-[3%] w-1/2 bg-smoke" />
        <div className="grid grid-cols-7 gap-[6%]">
          {Array.from({ length: 28 }, (_, i) => (
            <span key={i} className={cn('aspect-square', i === 17 ? 'bg-signal' : 'bg-graphite')} />
          ))}
        </div>
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex items-center gap-[8%] border-t border-graphite pt-[6%]">
            <span className="aspect-square w-[18%] rounded-full bg-smoke" />
            <span className="h-[30%] flex-1 bg-graphite" />
          </div>
        ))}
      </Phone>
      <Phone className="top-[16%] right-[18%] w-[30%] rotate-3">
        <span className="h-[3%] w-2/5 bg-smoke" />
        <span className="aspect-[4/3] w-full bg-graphite" />
        <span className="h-[2.5%] w-4/5 bg-smoke" />
        <span className="h-[2.5%] w-3/5 bg-graphite" />
        <span className="mt-auto flex h-[9%] w-full items-center justify-center bg-signal font-mono text-[clamp(0.4rem,0.9vw,0.65rem)] tracking-widest text-bone uppercase">
          Book visit
        </span>
      </Phone>
    </>
  )
}

function Commerce() {
  return (
    <div className="absolute inset-[8%] flex gap-[3%]">
      <div className="grid flex-1 grid-cols-3 grid-rows-2 gap-[4%]">
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className={cn(panel, 'flex flex-col p-[6%]')}>
            <span className={cn('flex-1', i === 1 ? 'bg-signal' : 'bg-graphite')} />
            <span className="mt-[8%] h-[6%] w-3/4 bg-smoke" />
            <span className="mt-[5%] h-[6%] w-1/3 bg-graphite" />
          </div>
        ))}
      </div>
      <div className={cn(panel, 'flex w-[28%] flex-col gap-[4%] p-[4%]')}>
        <span className="h-[4%] w-1/2 bg-bone/80" />
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex items-center gap-[8%] border-b border-graphite pb-[6%]">
            <span className="aspect-square w-[28%] bg-graphite" />
            <span className="h-[8%] flex-1 bg-smoke" />
          </div>
        ))}
        <span className="mt-auto h-[10%] w-full bg-signal" />
      </div>
    </div>
  )
}

function RouteMap() {
  return (
    <>
      <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full">
        {[40, 95, 150, 210, 260].map((y) => (
          <line key={`h${y}`} x1="0" x2="400" y1={y} y2={y + 12} stroke="var(--color-graphite)" strokeWidth="5" />
        ))}
        {[60, 140, 230, 320].map((x) => (
          <line key={`v${x}`} x1={x} x2={x - 20} y1="0" y2="300" stroke="var(--color-graphite)" strokeWidth="5" />
        ))}
        <path
          d="M52 250 L58 160 L135 152 L140 98 L226 104 L222 44 L316 50"
          fill="none"
          stroke="var(--color-signal)"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        {[
          [52, 250],
          [135, 152],
          [226, 104],
          [316, 50],
        ].map(([cx, cy], i) => (
          <g key={i}>
            <circle cx={cx} cy={cy} r="10" fill="var(--color-signal)" opacity="0.18" />
            <circle cx={cx} cy={cy} r="4.5" fill={i === 3 ? 'var(--color-bone)' : 'var(--color-signal)'} />
          </g>
        ))}
      </svg>
      <div className={cn(panel, 'absolute right-[6%] bottom-[8%] flex w-[34%] flex-col gap-[10%] p-[3%]')}>
        {['TRK-0142', 'TRK-0087', 'TRK-0119'].map((id, i) => (
          <div key={id} className="flex items-center justify-between gap-2">
            <span className="font-mono text-[clamp(0.45rem,1vw,0.7rem)] text-bone/80">{id}</span>
            <span className={cn('size-1.5 rounded-full', i === 0 ? 'bg-signal' : 'bg-smoke')} />
          </div>
        ))}
      </div>
    </>
  )
}

function Terminal() {
  const lines: [string, string][] = [
    ['$', 'terraform apply -auto-approve'],
    ['+', 'aws_ecs_service.api: created'],
    ['+', 'aws_rds_cluster.primary: created'],
    ['$', 'deploy --env production'],
    ['>', 'health checks passing (3/3)'],
    ['>', 'traffic shifted 100% to v2.14.0'],
  ]

  return (
    <div className={cn(panel, 'absolute inset-[9%] flex flex-col')}>
      <div className="flex items-center gap-1.5 border-b border-graphite px-[3%] py-[2.5%]">
        <span className="size-2 rounded-full bg-signal" />
        <span className="size-2 rounded-full bg-smoke" />
        <span className="size-2 rounded-full bg-smoke" />
      </div>
      <div className="flex flex-1 flex-col justify-center gap-[3.5%] px-[5%] font-mono text-[clamp(0.5rem,1.15vw,0.8rem)]">
        {lines.map(([prefix, text], i) => (
          <p key={i} className="truncate">
            <span className={prefix === '$' ? 'text-signal' : 'text-smoke'}>{prefix}</span>{' '}
            <span className={prefix === '$' ? 'text-bone' : 'text-ash'}>{text}</span>
          </p>
        ))}
        <span className="h-[1.1em] w-[0.6em] animate-pulse bg-bone" />
      </div>
    </div>
  )
}

const visuals: Record<ProjectVisualKind, () => JSX.Element> = {
  dashboard: Dashboard,
  mobile: Mobile,
  commerce: Commerce,
  map: RouteMap,
  terminal: Terminal,
}

interface ProjectVisualProps {
  kind: ProjectVisualKind
  image?: string
  alt?: string
  className?: string
}

export function ProjectVisual({ kind, image, alt = '', className }: ProjectVisualProps) {
  const Visual = visuals[kind]

  return (
    <div
      className={cn(
        'relative overflow-hidden bg-carbon [background-image:linear-gradient(var(--color-graphite)_1px,transparent_1px),linear-gradient(90deg,var(--color-graphite)_1px,transparent_1px)] [background-size:2.5rem_2.5rem] [background-position:-1px_-1px]',
        className,
      )}
    >
      {image ? (
        <img src={image} alt={alt} loading="lazy" className="absolute inset-0 size-full object-cover" />
      ) : (
        <div aria-hidden className="absolute inset-0">
          <Visual />
        </div>
      )}
    </div>
  )
}
