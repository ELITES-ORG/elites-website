export interface NavItem {
  label: string
  to: string
}

export interface SocialLink {
  label: string
  href: string
  icon: string
}

export interface Service {
  slug: string
  title: string
  icon: string
  summary: string
  description: string
  deliverables: string[]
  stack: string[]
}

export type ProjectCategory = 'Web' | 'Mobile' | 'Cloud' | 'Product'

export type ProjectVisualKind = 'dashboard' | 'mobile' | 'commerce' | 'map' | 'terminal'

export interface Project {
  slug: string
  title: string
  sector: string
  year: number
  categories: ProjectCategory[]
  summary: string
  outcome: string
  stack: string[]
  visual: ProjectVisualKind
  image?: string
  featured?: boolean
}

export interface ProcessStep {
  title: string
  duration: string
  description: string
}

export interface Principle {
  title: string
  icon: string
  description: string
}

export interface EngagementModel {
  title: string
  bestFor: string
  description: string
  points: string[]
}

export interface Faq {
  question: string
  answer: string
}
