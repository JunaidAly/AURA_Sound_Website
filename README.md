# AURA — Next.js audio showcase
A fictional premium audio concept by Junaid Ali, migrated to Next.js App Router and React with Framer Motion.

## Run
`npm ci`
`npm run dev`

## Validate and deploy
`npm run build` creates a static Next.js export in `out/`. Vercel uses the checked-in configuration. No backend or environment variables are required.

## Structure
- app/: App Router layout, SEO metadata, page and responsive styling
- components/Showroom.jsx: React-managed finishes, moods, selection and motion controls
- components/ProductDialog.jsx: accessible native dialog with React state and Framer Motion
- components/Cursor.jsx: spring-follow cursor with cleanup and reduced-motion support

All interactions are implemented in React; no legacy HTML injection or DOM event scripts. Products and pricing are illustrative. Selections reset on refresh. Google Fonts falls back to system fonts if unavailable.
