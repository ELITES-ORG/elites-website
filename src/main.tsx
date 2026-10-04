import '@flaticon/flaticon-uicons/css/regular/straight.css'
import '@flaticon/flaticon-uicons/css/brands/all.css'
import './styles/globals.css'

import { MotionConfig } from 'motion/react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import { router } from './app/router'
import { loadDisplayFont } from './lib/fonts'
import { SmoothScrollProvider } from './lib/smooth-scroll'

loadDisplayFont()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">
      <SmoothScrollProvider>
        <RouterProvider router={router} />
      </SmoothScrollProvider>
    </MotionConfig>
  </StrictMode>,
)
