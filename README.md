# Elites Website

Marketing site for Elites, a software development studio.

Built with React 19, TypeScript, Vite, Tailwind CSS v4, React Router, Motion and Lenis.

## Getting started

Requires Node.js 20.19 or newer.

```bash
npm install
npm run dev
```

The dev server runs at http://localhost:5173.

| Script              | Description                                  |
| ------------------- | -------------------------------------------- |
| `npm run dev`       | Start the dev server                         |
| `npm run build`     | Type-check and build for production (`dist`) |
| `npm run preview`   | Serve the production build locally           |
| `npm run typecheck` | Run the TypeScript compiler                  |
| `npm run lint`      | Lint with oxlint                             |
| `npm run format`    | Format with Prettier                         |

## Project structure

```
src/
  app/            Router and route definitions
  assets/
    brand/        Logo mark and wordmark
    fonts/akira/  Licensed display font files (see below)
  components/
    layout/       Header, footer, mobile menu, page transition, SEO
    sections/     Page sections shared across routes
    ui/           Buttons, icons, text reveals and other primitives
  content/        All site copy and data (services, projects, company info)
  lib/            Utilities: API client, smooth scroll, motion presets, fonts
  pages/          One component per route
  services/       Data operations (contact inquiries)
  styles/         Tailwind theme and global styles
```

### Content

Every piece of copy lives in `src/content`. Contact details, social links and availability are in `src/content/site.ts`. Services, engagement models and FAQs are in `services.ts`, case studies in `projects.ts`, and the process and principles in `company.ts`.

Projects render an illustrated preview by default. Add an `image` path to a project to show a real screenshot instead.

## Brand

| Token    | Value     | Usage                          |
| -------- | --------- | ------------------------------ |
| `ink`    | `#0D0D0D` | Page background                |
| `carbon` | `#141414` | Raised sections                |
| `signal` | `#DD2B37` | Brand red, accents and actions |
| `bone`   | `#F4F4F2` | Primary text                   |
| `ash`    | `#8F8F8F` | Secondary text                 |

Typefaces:

- **Akira Expanded** for display headings (uppercase only)
- **Montserrat** for body copy
- **JetBrains Mono** for labels and metadata

### Display font

Akira Expanded is a commercial typeface and is not included in the repository. Place the licensed font file (`.woff2` preferred, `.otf` or `.ttf` also work) in `src/assets/fonts/akira/` and it is loaded automatically. Until then, headings fall back to Archivo Expanded.

## Icons

Icons come from [Flaticon UIcons](https://www.flaticon.com/uicons) via `@flaticon/flaticon-uicons`, using the Regular Straight set and Brands.

```tsx
<Icon name="fi-rs-arrow-right" />
<Icon name="fi-brands-github" label="GitHub" />
```

Browse available names at [flaticon.com/uicons](https://www.flaticon.com/uicons). To use another style (for example Bold Rounded), import its stylesheet in `src/main.tsx`.

## Backend integration

The app is frontend-only for now. API calls go through `src/lib/api.ts`, which reads its base URL from `VITE_API_URL`.

```bash
cp .env.example .env.local
```

The contact form calls `submitInquiry` in `src/services/inquiries.ts`. With `VITE_API_URL` set, it sends a `POST` to `/inquiries` with this JSON body:

```json
{
  "name": "string",
  "email": "string",
  "company": "string",
  "budget": "string",
  "services": ["string"],
  "message": "string"
}
```

Without an API URL, the form opens the visitor's email client with the inquiry prefilled.

## Deployment

The build output in `dist` is a static single-page app. Configure the host to serve `index.html` for unknown paths so client-side routes such as `/services` resolve on refresh.
