# Dezitech Engineering — Modern Redesign

A Next.js (App Router) project that rebuilds [Dezitech Engineering](https://www.dezitechengineering.com/) with a premium, motion-rich UI inspired by best-in-class engineering interfaces; visual references are used only to guide the motion language.

## Getting Started
```bash
npm install
npm run dev
```
Visit `http://localhost:3000` after running the dev server.

## Project Structure
- `app/` — App Router pages (`about`, `products`, `products/[slug]`, `services`, `quality`, `careers`, `contact`).
- `components/` — Reusable UI primitives (Header, Footer, Hero, Section, grids, motion helpers, forms).
- `public/assets/` — Placeholder imagery ready to be swapped with final art.
- `styleguide.md` — Living documentation for typography, color tokens, and spacing rules.

## Environment Variables
Copy `.env.example` to `.env.local` and adjust as needed for map embeds or API targets.

## Development Phases
1. **Phase 1** — Scaffold routes, components, and base layout (complete).
2. **Phase 2** — Apply the global design system (tokens, typography, header polish).
3. **Phase 3** — Build full UI sections with scroll reveals and product experiences.
4. **Phase 4** — Implement Framer Motion + IntersectionObserver motion system.
5. **Phase 5** — Final cleanup, asset swap instructions, and Lighthouse checklist.

## Scripts
- `npm run dev` — Start the development server.
- `npm run build` — Production build.
- `npm run start` — Serve the built app.
- `npm run lint` — Run ESLint checks.

## Notes
- Tailwind CSS is configured with the Dezitech palette in `tailwind.config.js`.
- Framer Motion + the `MotionReveal` utility power staggered reveals; respect `prefers-reduced-motion` when adding animations.
- Replace `public/assets` SVG placeholders with branded photography or renders during Phase 3.
