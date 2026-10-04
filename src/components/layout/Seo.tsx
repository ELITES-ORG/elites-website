import { site } from '@/content/site'

interface SeoProps {
  title?: string
  description?: string
}

export function Seo({ title, description = site.description }: SeoProps) {
  const fullTitle = title ? `${title} | ${site.name}` : `${site.name} | ${site.tagline}`

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
    </>
  )
}
