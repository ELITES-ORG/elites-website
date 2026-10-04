import { AnimatePresence } from 'motion/react'
import { useCallback, useState } from 'react'
import { useLocation, useOutlet } from 'react-router'
import { routeLabels } from '@/content/site'
import { useSmoothScroll } from '@/lib/smooth-scroll-context'
import { Footer } from './Footer'
import { Header } from './Header'
import { MobileMenu } from './MobileMenu'
import { PageTransition } from './PageTransition'

export function RootLayout() {
  const location = useLocation()
  const outlet = useOutlet()
  const { scrollTo, lock, unlock } = useSmoothScroll()
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = useCallback(() => {
    setMenuOpen(false)
    unlock()
  }, [unlock])

  const toggleMenu = () => {
    if (menuOpen) {
      closeMenu()
    } else {
      setMenuOpen(true)
      lock()
    }
  }

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-signal focus:px-4 focus:py-2 focus:text-sm focus:text-bone"
      >
        Skip to content
      </a>

      <Header menuOpen={menuOpen} onMenuToggle={toggleMenu} />
      <MobileMenu open={menuOpen} onClose={closeMenu} />

      <AnimatePresence mode="wait" onExitComplete={() => scrollTo(0, { immediate: true })}>
        <PageTransition key={location.pathname} label={routeLabels[location.pathname] ?? 'Elites'}>
          <main id="main">{outlet}</main>
          <Footer showCta={location.pathname !== '/contact'} />
        </PageTransition>
      </AnimatePresence>
    </>
  )
}
