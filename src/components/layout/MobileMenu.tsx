import { AnimatePresence, motion } from 'motion/react'
import { useEffect } from 'react'
import { NavLink } from 'react-router'
import { Icon } from '@/components/ui/Icon'
import { navigation, site, socials } from '@/content/site'
import { cn } from '@/lib/cn'
import { easeExpo, easeQuart } from '@/lib/motion'

interface MobileMenuProps {
  open: boolean
  onClose: () => void
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 z-40 flex flex-col bg-ink pt-(--header-h) lg:hidden"
          initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
          animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          exit={{ clipPath: 'inset(0% 0% 100% 0%)', transition: { duration: 0.6, ease: easeQuart, delay: 0.1 } }}
          transition={{ duration: 0.75, ease: easeQuart }}
          data-lenis-prevent
        >
          <nav aria-label="Mobile" className="container-page flex flex-1 flex-col justify-center overflow-y-auto py-8">
            <ul className="flex flex-col gap-1">
              {navigation.map((item, i) => (
                <li key={item.to} className="overflow-hidden">
                  <motion.div
                    initial={{ y: '105%' }}
                    animate={{ y: '0%', transition: { duration: 0.9, ease: easeExpo, delay: 0.25 + i * 0.06 } }}
                    exit={{ y: '-105%', transition: { duration: 0.45, ease: easeQuart } }}
                  >
                    <NavLink
                      to={item.to}
                      onClick={onClose}
                      className={({ isActive }) =>
                        cn(
                          'group flex items-center justify-between gap-4 py-2 display text-[clamp(2rem,9vw,3.75rem)] leading-none transition-colors',
                          isActive ? 'text-signal' : 'text-bone',
                        )
                      }
                    >
                      {item.label}
                      <Icon
                        name="fi-rs-arrow-up-right"
                        className="text-xl text-ash transition-transform duration-500 ease-expo group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-signal"
                      />
                    </NavLink>
                  </motion.div>
                </li>
              ))}
            </ul>
          </nav>

          <motion.div
            className="container-page flex flex-col gap-6 border-t border-graphite py-7 sm:flex-row sm:items-end sm:justify-between"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.8, ease: easeExpo, delay: 0.55 } }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
          >
            <div className="flex flex-col gap-1.5">
              <span className="eyebrow text-ash">Say hello</span>
              <a href={`mailto:${site.email}`} className="text-lg font-medium text-bone">
                {site.email}
              </a>
            </div>
            <ul className="flex gap-2">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="flex size-11 items-center justify-center border border-graphite text-bone/80 transition-colors hover:border-signal hover:text-signal"
                  >
                    <Icon name={s.icon} className="text-base" />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
