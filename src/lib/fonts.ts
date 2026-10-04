import '@fontsource-variable/archivo/wdth.css'
import '@fontsource/montserrat/300.css'
import '@fontsource/montserrat/400.css'
import '@fontsource/montserrat/500.css'
import '@fontsource/montserrat/600.css'
import '@fontsource/jetbrains-mono/400.css'
import '@fontsource/jetbrains-mono/500.css'

/**
 * Akira Expanded is a licensed typeface and is not bundled from npm.
 * Drop the licensed files into `src/assets/fonts/akira/` (woff2 preferred, otf/ttf accepted)
 * and they are picked up automatically. Until then the display stack falls back to Archivo Expanded.
 */
const akiraFiles = import.meta.glob<string>('../assets/fonts/akira/*.{woff2,woff,otf,ttf}', {
  eager: true,
  query: '?url',
  import: 'default',
})

const formatPriority = ['woff2', 'woff', 'otf', 'ttf']

export function loadDisplayFont() {
  const urls = Object.values(akiraFiles)
  if (urls.length === 0 || typeof FontFace === 'undefined') return

  const ordered = [...urls].sort(
    (a, b) => formatPriority.indexOf(a.split('.').pop() ?? '') - formatPriority.indexOf(b.split('.').pop() ?? ''),
  )

  const face = new FontFace('Akira Expanded', `url(${ordered[0]})`, {
    weight: '100 900',
    stretch: '50% 200%',
    display: 'swap',
  })

  face
    .load()
    .then((loaded) => document.fonts.add(loaded))
    .catch(() => {})
}
