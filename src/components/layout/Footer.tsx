import { motion } from 'motion/react'
import { Link } from 'react-router'
import { ButtonLink } from '@/components/ui/Button'
import { Glitch } from '@/components/ui/Glitch'
import { Icon } from '@/components/ui/Icon'
import { Wordmark } from '@/components/ui/Logo'
import { RevealText } from '@/components/ui/RevealText'
import { RollText } from '@/components/ui/RollText'
import { navigation, site, socials } from '@/content/site'
import { services } from '@/content/services'
import { useSmoothScroll } from '@/lib/smooth-scroll-context'
import { easeExpo, viewportOnce } from '@/lib/motion'
import { useGlitchLoop } from '@/lib/use-glitch-loop'

const currentYear = new Date().getFullYear()

function FooterCta() {
  const glitchTarget = useGlitchLoop(2500)

  return (
    <section className="bg-signal text-ink">
      <div className="container-page flex flex-col gap-10 py-20 md:gap-14 md:py-28">
        <div>
          <p className="mb-6 flex items-center gap-3 eyebrow text-ink/70">
            <span aria-hidden className="h-[3px] w-7 bg-ink" />
            Start a project
          </p>
          <RevealText
            className="display text-display-xl [--glitch-a:var(--color-bone)] [--glitch-b:var(--color-ink)] [--outline-color:var(--color-ink)]"
            lines={[
              <Glitch key="have" ref={glitchTarget(0)}>
                Have something
              </Glitch>,
              <Glitch key="worth" ref={glitchTarget(1)}>
                <span className="text-outline [--outline-width:2px]">worth building?</span>
              </Glitch>,
            ]}
          />
        </div>
        <div className="flex flex-col gap-6 border-t border-ink/20 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="max-w-md text-base leading-relaxed text-ink/80">
            Tell us what you have in mind. We reply within one business day with next steps and honest feedback.
          </p>
          <ButtonLink to="/contact" variant="ink">
            Book a discovery call
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}

export function Footer({ showCta = true }: { showCta?: boolean }) {
  const { scrollTo } = useSmoothScroll()

  return (
    <footer className="relative">
      {showCta && <FooterCta />}

      <div className="container-page pt-20 pb-10 md:pt-24">
        <div className="grid gap-14 md:grid-cols-2 xl:grid-cols-12 xl:gap-8">
          <div className="flex flex-col gap-6 xl:col-span-4">
            <Link to="/" aria-label="Elites home" className="w-fit">
              <Wordmark className="w-36" />
            </Link>
            <p className="max-w-xs leading-relaxed text-ash">{site.description}</p>
            <p className="flex items-center gap-2.5 eyebrow text-bone/80">
              <span className="size-2 animate-pulse-dot rounded-full bg-signal" />
              {site.availability}
            </p>
          </div>

          <nav aria-label="Footer" className="xl:col-span-2">
            <h2 className="mb-6 eyebrow text-ash">Company</h2>
            <ul className="flex flex-col gap-3">
              {navigation.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="group inline-flex text-bone/85 hover:text-bone">
                    <RollText>{item.label}</RollText>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="xl:col-span-3">
            <h2 className="mb-6 eyebrow text-ash">Services</h2>
            <ul className="flex flex-col gap-3">
              {services.slice(0, 5).map((s) => (
                <li key={s.slug}>
                  <Link to={`/services#${s.slug}`} className="group inline-flex text-bone/85 hover:text-bone">
                    <RollText>{s.title}</RollText>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="xl:col-span-3">
            <h2 className="mb-6 eyebrow text-ash">Contact</h2>
            <ul className="flex flex-col gap-3 [overflow-wrap:anywhere] text-bone/85">
              <li>
                <a href={`mailto:${site.email}`} className="transition-colors hover:text-signal">
                  {site.email}
                </a>
              </li>
              <li>
                <a href={`tel:${site.phone.replace(/\s/g, '')}`} className="transition-colors hover:text-signal">
                  {site.phone}
                </a>
              </li>
              <li className="text-ash">{site.location}</li>
            </ul>
          </div>
        </div>

        <motion.div
          className="mt-20 md:mt-28"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 1.4, ease: easeExpo }}
        >
          <Wordmark className="w-full" />
        </motion.div>

        <div className="mt-10 flex flex-col-reverse gap-6 border-t border-graphite pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-ash">
            &copy; {currentYear} {site.legalName}. All rights reserved.
          </p>
          <div className="flex items-center justify-between gap-6 md:justify-end">
            <ul className="flex gap-2">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="flex size-10 items-center justify-center border border-graphite text-bone/75 transition-colors duration-300 hover:border-signal hover:text-signal"
                  >
                    <Icon name={s.icon} className="text-sm" />
                  </a>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => scrollTo(0)}
              className="group flex items-center gap-2.5 eyebrow text-bone/80 hover:text-bone"
            >
              <RollText>Back to top</RollText>
              <Icon
                name="fi-rs-arrow-up"
                className="text-xs transition-transform duration-500 ease-expo group-hover:-translate-y-1"
              />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
