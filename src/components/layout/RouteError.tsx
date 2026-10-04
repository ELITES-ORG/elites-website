import { isRouteErrorResponse, Link, useRouteError } from 'react-router'
import { ButtonLink } from '@/components/ui/Button'
import { Wordmark } from '@/components/ui/Logo'

export function RouteError() {
  const error = useRouteError()
  const status = isRouteErrorResponse(error) ? error.status : 500
  const message = isRouteErrorResponse(error)
    ? error.statusText || 'This page could not be loaded.'
    : 'Something went wrong while loading this page.'

  if (import.meta.env.DEV) console.error(error)

  return (
    <div className="container-page flex min-h-svh flex-col py-8">
      <Link to="/" aria-label="Elites home" className="w-fit">
        <Wordmark className="w-28" />
      </Link>
      <div className="flex flex-1 flex-col justify-center gap-8">
        <p className="display text-[clamp(4rem,16vw,12rem)] leading-none text-outline">{status}</p>
        <p className="max-w-md text-lede text-bone/80">{message} Try reloading, or head back to the home page.</p>
        <div className="flex flex-wrap gap-3">
          <ButtonLink to="/">Back to home</ButtonLink>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="h-13 border border-bone/25 px-7 text-[0.8rem] font-semibold tracking-[0.12em] uppercase transition-colors hover:border-signal"
          >
            Reload
          </button>
        </div>
      </div>
    </div>
  )
}
