import type { EngagementModel, Faq, Service } from './types'

export const services: Service[] = [
  {
    slug: 'web-platforms',
    title: 'Web platforms',
    icon: 'fi-rs-browser',
    summary: 'Customer portals, internal tools and SaaS products built to handle real traffic.',
    description:
      'We build web applications that stay fast as your user base grows. Clean architecture, typed end to end, and tested before anything reaches production.',
    deliverables: [
      'Product and technical scoping',
      'Responsive front-end in React and TypeScript',
      'APIs, authentication and role-based access',
      'Admin dashboards and reporting',
      'Automated testing and CI pipelines',
    ],
    stack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
  },
  {
    slug: 'mobile-apps',
    title: 'Mobile apps',
    icon: 'fi-rs-mobile-notch',
    summary: 'iOS and Android apps from a single codebase, with native performance where it counts.',
    description:
      'From the first prototype to the App Store and Play Store listing. We handle offline support, push notifications, payments and the release process.',
    deliverables: [
      'Cross-platform apps for iOS and Android',
      'Offline-first data sync',
      'Push notifications and deep links',
      'In-app payments and subscriptions',
      'Store submission and release management',
    ],
    stack: ['React Native', 'Swift', 'Kotlin', 'Firebase'],
  },
  {
    slug: 'cloud-devops',
    title: 'Cloud and DevOps',
    icon: 'fi-rs-cloud',
    summary: 'Infrastructure that deploys in minutes, scales on demand and tells you when something breaks.',
    description:
      'We set up the plumbing most teams put off: reproducible infrastructure, zero-downtime deploys, monitoring and backups you have actually tested.',
    deliverables: [
      'Cloud architecture on AWS, GCP or Azure',
      'Infrastructure as code',
      'Container orchestration and CI/CD',
      'Logging, monitoring and alerting',
      'Cost reviews and performance tuning',
    ],
    stack: ['Docker', 'Terraform', 'AWS', 'GitHub Actions'],
  },
  {
    slug: 'product-design',
    title: 'Product design',
    icon: 'fi-rs-palette',
    summary: 'Interfaces your users understand on the first visit, designed alongside the engineers who build them.',
    description:
      'Research, flows, wireframes and a design system that maps one to one with the components in code. No handoff gap, no pixel debates later.',
    deliverables: [
      'User research and journey mapping',
      'Wireframes and clickable prototypes',
      'Visual design and brand application',
      'Design systems in Figma and code',
      'Usability testing',
    ],
    stack: ['Figma', 'Storybook', 'Framer', 'Maze'],
  },
  {
    slug: 'integrations',
    title: 'Integrations and automation',
    icon: 'fi-rs-workflow',
    summary: 'Connect the tools you already pay for and remove the manual work between them.',
    description:
      'Payment gateways, ERPs, CRMs, accounting software and AI services. We wire systems together so data moves on its own and people stop copying spreadsheets.',
    deliverables: [
      'Third-party API integrations',
      'Payment gateway setup',
      'Workflow automation',
      'Data migration from legacy systems',
      'AI features built on your own data',
    ],
    stack: ['REST', 'GraphQL', 'Webhooks', 'Python'],
  },
  {
    slug: 'support',
    title: 'Maintenance and support',
    icon: 'fi-rs-shield-check',
    summary: 'Ongoing care for software we built, or software someone else left behind.',
    description:
      'Security patches, dependency updates, uptime monitoring and a team that already knows your codebase when something needs to change.',
    deliverables: [
      'Codebase audits and handover reviews',
      'Security patching and dependency updates',
      'Uptime monitoring with response times',
      'Monthly improvement hours',
      'Documentation for your internal team',
    ],
    stack: ['Sentry', 'Grafana', 'Dependabot', 'Playwright'],
  },
]

export const engagementModels: EngagementModel[] = [
  {
    title: 'Fixed scope',
    bestFor: 'A defined product or feature set',
    description: 'We agree on scope, timeline and price up front, then deliver in fortnightly milestones.',
    points: ['Fixed price per milestone', 'Weekly demos', 'Full source code ownership'],
  },
  {
    title: 'Dedicated team',
    bestFor: 'Products that keep evolving',
    description: 'A cross-functional team that works as an extension of yours, on your roadmap and your tools.',
    points: ['Monthly retainer', 'Scale the team up or down', 'Joins your standups and rituals'],
  },
  {
    title: 'Support plan',
    bestFor: 'Software already in production',
    description: 'Monitoring, maintenance and a set number of improvement hours every month.',
    points: ['Agreed response times', 'Monthly health report', 'Rollover hours'],
  },
]

export const faqs: Faq[] = [
  {
    question: 'How much does a project cost?',
    answer:
      'It depends on scope. Most of our builds fall between a few weeks and a few months of work. After a short discovery call we send a written estimate with a breakdown, so you know exactly what you are paying for.',
  },
  {
    question: 'How long until we can launch?',
    answer:
      'A focused MVP usually takes 8 to 12 weeks. Larger platforms are delivered in phases, with something usable in your hands early and new features shipped every two weeks.',
  },
  {
    question: 'Who owns the code?',
    answer:
      'You do. All source code, designs and infrastructure accounts are yours from day one. We work in repositories you control.',
  },
  {
    question: 'Can you take over an existing project?',
    answer:
      'Yes. We start with a paid code audit so we can tell you honestly what is worth keeping, what needs fixing, and what it will take.',
  },
  {
    question: 'Do you work with clients outside the Philippines?',
    answer:
      'Most of our clients are overseas. We overlap working hours with Australia, Asia and the US West Coast, and keep communication async-friendly for everyone else.',
  },
]
