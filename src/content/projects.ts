import type { Project, ProjectCategory } from './types'

export const projectCategories: ProjectCategory[] = ['Web', 'Mobile', 'Cloud', 'Product']

export const projects: Project[] = [
  {
    slug: 'freight-operations-platform',
    title: 'Freight operations platform',
    sector: 'Logistics',
    year: 2026,
    categories: ['Web', 'Cloud'],
    summary:
      'A dispatch and tracking system that replaced spreadsheets and phone calls for a regional freight operator running 140 trucks.',
    outcome: 'Dispatch time cut from hours to minutes',
    stack: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
    visual: 'map',
    featured: true,
  },
  {
    slug: 'clinic-booking-app',
    title: 'Clinic booking app',
    sector: 'Healthcare',
    year: 2026,
    categories: ['Mobile', 'Product'],
    summary:
      'Patient-facing booking, reminders and teleconsults for a network of outpatient clinics, with a staff app for schedules.',
    outcome: 'No-shows down by a third in the first quarter',
    stack: ['React Native', 'TypeScript', 'Firebase'],
    visual: 'mobile',
    featured: true,
  },
  {
    slug: 'retail-commerce-rebuild',
    title: 'Retail commerce rebuild',
    sector: 'Retail',
    year: 2025,
    categories: ['Web', 'Product'],
    summary:
      'A headless storefront and inventory sync for a fashion retailer selling across physical stores and two marketplaces.',
    outcome: 'Page loads under one second on mobile',
    stack: ['React', 'TypeScript', 'Stripe', 'Redis'],
    visual: 'commerce',
    featured: true,
  },
  {
    slug: 'lending-analytics-dashboard',
    title: 'Lending analytics dashboard',
    sector: 'Finance',
    year: 2025,
    categories: ['Web'],
    summary:
      'Real-time portfolio reporting for a lending company, pulling from their core banking system and credit bureau feeds.',
    outcome: 'Month-end reports generated automatically',
    stack: ['React', 'Python', 'PostgreSQL'],
    visual: 'dashboard',
    featured: true,
  },
  {
    slug: 'infrastructure-migration',
    title: 'Infrastructure migration',
    sector: 'SaaS',
    year: 2025,
    categories: ['Cloud'],
    summary:
      'Moved a growing SaaS product from a single server to containerised infrastructure with automated deploys and monitoring.',
    outcome: 'Zero-downtime releases, hosting costs down 28%',
    stack: ['Docker', 'Terraform', 'AWS', 'Grafana'],
    visual: 'terminal',
  },
]
