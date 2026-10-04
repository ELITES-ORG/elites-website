import type { NavItem, SocialLink } from './types'

export const site = {
  name: 'Elites',
  legalName: 'Elites Software Development',
  tagline: 'Software development studio',
  description:
    'Elites designs, builds and maintains web platforms, mobile apps and cloud systems for companies that need software they can rely on.',
  url: 'https://elites.dev',
  email: 'connect.with.elites@gmail.com',
  phone: '+63 954 449 8779',
  location: 'Philippines',
  timezone: 'GMT+8',
  hours: 'Mon to Fri, 9:00 to 18:00',
  availability: 'Booking new projects',
} as const

export const navigation: NavItem[] = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Work', to: '/work' },
  { label: 'Contact', to: '/contact' },
]

export const socials: SocialLink[] = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/', icon: 'fi-brands-linkedin' },
  { label: 'GitHub', href: 'https://github.com/', icon: 'fi-brands-github' },
  { label: 'Facebook', href: 'https://www.facebook.com/', icon: 'fi-brands-facebook' },
  { label: 'Instagram', href: 'https://www.instagram.com/', icon: 'fi-brands-instagram' },
]

export const routeLabels: Record<string, string> = {
  '/': 'Elites',
  '/about': 'About',
  '/services': 'Services',
  '/work': 'Work',
  '/contact': 'Contact',
}
