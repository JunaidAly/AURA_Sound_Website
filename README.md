# AURA — Next.js audio showcase
Fictional premium audio concept by Junaid Ali. Next.js App Router, React, Framer Motion, Tailwind CSS v4, Radix Slot and Lucide icons.

## Run and validate
- `npm ci`
- `npm run dev`
- `npm run build`

Vercel uses the Next.js adapter and `.next` manifest directory. Next also creates `out/` for standalone static hosting. No environment variables are required.

## Architecture
- `app/`: routing and SEO metadata; imports the central stylesheet once.
- `styles/index.css`: all brand colors, illustration palette, finish themes, fonts and Tailwind theme mappings. Change brand tokens here.
- `styles/showroom.css`: responsive layouts, glass surfaces and CSS 3D artwork. References centralized tokens.
- `components/ui/`: reusable Button (Radix Slot + Framer Motion), Typography, Icon (Lucide), Section and Card.
- `components/layout/`: Header and Footer.
- `components/sections/`: Hero, Collection, Philosophy, Details, Listening, Craft, Questions and Closing.
- `components/Showroom.jsx`: composes the page and passes feature state to sections.
- `hooks/useShowroom.js`: selection, finishes, motion preference, pointer rotation and lifecycle cleanup.
- `data/catalog.js`: product descriptions, prices and listening mood copy.
- `lib/utils.js`: shared `cn` utility (clsx + tailwind-merge).

## Conventions
Use Typography for headings/body copy and Icon by semantic name. Use Button with `asChild` to compose links via Radix Slot; standard buttons use Framer Motion. Add colors in index.css, never in feature JSX. Preserve native dialog keyboard/focus behavior and reduced-motion support. Tailwind theme/utilities are enabled without Preflight to preserve the existing custom illustration/layout reset.

## Demo scope
Products and prices are fictional. No checkout or backend. Selections reset on refresh. Google Fonts has system fallbacks.
