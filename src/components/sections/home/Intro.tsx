import { Link } from 'react-router'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { FadeIn } from '@/components/ui/FadeIn'
import { Icon } from '@/components/ui/Icon'
import { RollText } from '@/components/ui/RollText'
import { ScrollWords } from '@/components/ui/ScrollWords'

export function Intro() {
  return (
    <section className="container-page grid gap-10 section-y md:grid-cols-12">
      <FadeIn y={12} className="md:col-span-3">
        <Eyebrow>Who we are</Eyebrow>
      </FadeIn>
      <div className="md:col-span-9">
        <ScrollWords
          className="text-[clamp(1.45rem,3.1vw,2.75rem)] leading-[1.3] font-medium tracking-tight"
          text="We are a small team of engineers and designers. We take on a handful of projects at a time, so every client gets senior attention from the first workshop to the last deploy, and long after launch."
        />
        <FadeIn delay={0.1} className="mt-12">
          <Link to="/about" className="group inline-flex items-center gap-3 eyebrow text-bone">
            <RollText>More about us</RollText>
            <Icon
              name="fi-rs-arrow-right"
              className="text-signal transition-transform duration-500 ease-expo group-hover:translate-x-1.5"
            />
          </Link>
        </FadeIn>
      </div>
    </section>
  )
}
