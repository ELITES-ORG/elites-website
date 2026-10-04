import { Seo } from '@/components/layout/Seo'
import { ProcessSteps } from '@/components/sections/ProcessSteps'
import { SectionHeader } from '@/components/sections/SectionHeader'
import { Hero } from '@/components/sections/home/Hero'
import { Intro } from '@/components/sections/home/Intro'
import { SelectedWork } from '@/components/sections/home/SelectedWork'
import { ServicesList } from '@/components/sections/home/ServicesList'
import { StackMarquee } from '@/components/sections/home/StackMarquee'

export default function HomePage() {
  return (
    <>
      <Seo />
      <Hero />
      <StackMarquee />
      <Intro />
      <ServicesList />
      <SelectedWork />
      <section className="container-page section-y">
        <SectionHeader
          eyebrow="How we work"
          lines={['A process', 'you can follow']}
          outlineLine={1}
          aside={
            <p className="leading-relaxed text-ash">
              Every engagement runs on the same rhythm, so you always know what happens next and what it costs.
            </p>
          }
        />
        <div className="mt-16 md:mt-24">
          <ProcessSteps />
        </div>
      </section>
    </>
  )
}
