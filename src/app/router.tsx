import type { ComponentType } from 'react'
import { createBrowserRouter } from 'react-router'
import { RootLayout } from '@/components/layout/RootLayout'
import { RouteError } from '@/components/layout/RouteError'
import HomePage from '@/pages/HomePage'

const page = (load: () => Promise<{ default: ComponentType }>) => async () => ({
  Component: (await load()).default,
})

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <RouteError />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'about', lazy: page(() => import('@/pages/AboutPage')) },
      { path: 'services', lazy: page(() => import('@/pages/ServicesPage')) },
      { path: 'work', lazy: page(() => import('@/pages/WorkPage')) },
      { path: 'contact', lazy: page(() => import('@/pages/ContactPage')) },
      { path: '*', lazy: page(() => import('@/pages/NotFoundPage')) },
    ],
  },
])
