import { motion, useMotionValueEvent, useScroll } from 'motion/react'
import { useState } from 'react'
import { Link, NavLink } from 'react-router'
import { ButtonLink } from '@/components/ui/Button'
import { Wordmark } from '@/components/ui/Logo'
import { RollText } from '@/components/ui/RollText'
import { navigation } from '@/content/site'
import { cn } from '@/lib/cn'
import { easeExpo } from '@/lib/motion'

interface HeaderProps {
  menuOpen: boolean
  onMenuToggle: () => void
}

export function Header({ menuOpen, onMenuToggle }: HeaderProps) {
  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useMotionValueEvent(scrollY, 'change', (current) => {
    const previous = scrollY.getPrevious() ?? 0
    setScrolled(current > 24)
    setHidden(current > 320 && current > previous + 2)
    if (current < previous - 2) setHidden(false)
  })

  const isHidden = hidden && !menuOpen

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50"
      initial={false}
      animate={{ y: isHidden ? '-100%' : '0%' }}
      transition={{ duration: 0.6, ease: easeExpo }}
    >
      <div
        className={cn(
          'absolute inset-0 -z-10 border-b transition-[background-color,border-color] duration-500',
          scrolled && !menuOpen ? 'border-graphite bg-ink/88 backdrop-blur-md' : 'border-transparent bg-transparent',
        )}
      />
      <div className="container-page flex h-(--header-h) items-center justify-between gap-8">
        <Link to="/" aria-label="Elites home" className="relative z-10 block shrink-0">
          <Wordmark className="w-[6.75rem] md:w-[7.75rem]" />
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-10">
            {navigation.slice(1).map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className="group relative flex items-center gap-2 py-2 text-[0.8rem] font-medium tracking-[0.12em] uppercase"
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <motion.span
                          layoutId="nav-active"
                          className="absolute -bottom-0.5 left-0 h-[2px] w-full bg-signal"
                          transition={{ duration: 0.6, ease: easeExpo }}
                        />
                      )}
                      <RollText className={cn(isActive ? 'text-bone' : 'text-bone/70 group-hover:text-bone')}>
                        {item.label}
                      </RollText>
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <ButtonLink to="/contact" className="hidden h-11 px-5 text-[0.72rem] sm:inline-flex">
            Start a project
          </ButtonLink>

          <button
            type="button"
            onClick={onMenuToggle}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="relative z-10 flex size-11 items-center justify-center border border-bone/20 transition-colors hover:border-bone/50 lg:hidden"
          >
            <span
              className={cn(
                'absolute h-[2px] w-5 bg-bone transition-transform duration-500 ease-expo',
                menuOpen ? 'rotate-45' : '-translate-y-[4px]',
              )}
            />
            <span
              className={cn(
                'absolute h-[2px] bg-bone transition-all duration-500 ease-expo',
                menuOpen ? 'w-5 -rotate-45' : 'w-3 translate-x-1 translate-y-[4px]',
              )}
            />
          </button>
        </div>
      </div>
    </motion.header>
  )
}
