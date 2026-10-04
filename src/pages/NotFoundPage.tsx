import { PAGE_REVEAL_DELAY } from '@/components/layout/PageTransition'
import { Seo } from '@/components/layout/Seo'
import { ButtonLink } from '@/components/ui/Button'
import { FadeIn } from '@/components/ui/FadeIn'
import { RevealText } from '@/components/ui/RevealText'

export default function NotFoundPage() {
  return (
    <>
      <Seo title="Page not found" />
      <section className="container-page flex min-h-[85svh] flex-col justify-center pt-(--header-h) pb-20">
        <RevealText
          as="h1"
          trigger="mount"
          delay={PAGE_REVEAL_DELAY}
          className="display text-[clamp(5rem,22vw,18rem)] leading-none"
          lines={[
            <>
              4<span className="text-outline [--outline-width:2px]">0</span>4
            </>,
          ]}
        />
        <FadeIn
          trigger="mount"
          delay={PAGE_REVEAL_DELAY + 0.3}
          className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between"
        >
          <p className="max-w-md text-lede text-bone/80">
            This page does not exist. It may have moved, or the link may be mistyped.
          </p>
          <ButtonLink to="/">Back to home</ButtonLink>
        </FadeIn>
      </section>
    </>
  )
}
