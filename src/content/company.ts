import type { Principle, ProcessStep } from './types'

export const processSteps: ProcessStep[] = [
  {
    title: 'Discovery',
    duration: '1 to 2 weeks',
    description:
      'Workshops with your team to pin down goals, users and constraints. You leave with a scope, a timeline and a fixed estimate.',
  },
  {
    title: 'Design',
    duration: '2 to 4 weeks',
    description:
      'Flows, wireframes and a clickable prototype you can put in front of real users before any production code is written.',
  },
  {
    title: 'Build',
    duration: 'Fortnightly sprints',
    description:
      'Working software every two weeks, deployed to a staging environment you can log into. Weekly demos, no surprises.',
  },
  {
    title: 'Launch and support',
    duration: 'Ongoing',
    description:
      'We handle the release, monitor it closely through the first weeks, and stay on for improvements as your users give feedback.',
  },
]

export const principles: Principle[] = [
  {
    title: 'Skilled people on every project',
    icon: 'fi-rs-users-alt',
    description:
      'The engineers in the sales call are the engineers who build your product. No bait and switch to a junior bench.',
  },
  {
    title: 'You can see the work',
    icon: 'fi-rs-display-code',
    description:
      'Shared repositories, a live staging link and a weekly demo. You always know what was shipped and what is next.',
  },
  {
    title: 'Built to be handed over',
    icon: 'fi-rs-file-code',
    description:
      'Readable code, written documentation and tests. If you hire an internal team later, they can pick it up on day one.',
  },
  {
    title: 'Plain answers',
    icon: 'fi-rs-comment-alt',
    description:
      'If a feature is a bad idea or a deadline is unrealistic, we say so early, with options, instead of finding out at launch.',
  },
]

export const techStack = [
  'React',
  'TypeScript',
  'Node.js',
  'React Native',
  'PostgreSQL',
  'Python',
  'AWS',
  'Docker',
  'Figma',
  'Swift',
  'Kotlin',
  'Terraform',
]
