# Dezitech Engineering Styleguide

This document tracks the key system decisions that will guide the modernized UI. Values can be expanded as the build matures.

## Typography
- **Display / Headings:** Space Grotesk (via `--font-space-grotesk`)
- **Body / UI:** Inter (via `--font-inter`)
- Letter-spacing kept tight for a premium feel, with plenty of line-height for readability.

## Color Tokens
| Token | Hex | Usage |
| --- | --- | --- |
| `brand.red` | `#C8102E` | Primary call-to-action, accents |
| `brand.dark` | `#8A0B25` | Hover states, deep accents |
| `brand.soft` | `#F5E3E7` | Light fills, backgrounds |
| `neutral.50` | `#FAFAFA` | Page background |
| `neutral.100` | `#F4F4F5` | Cards, dividers |
| `neutral.200` | `#E4E4E7` | Borders |
| `neutral.300` | `#D4D4D8` | Muted lines, icons |
| `neutral.600` | `#52525B` | Secondary text |
| `neutral.800` | `#27272A` | Headlines |
| `neutral.900` | `#18181B` | Body text |

## Sizing & Spacing
- Base spacing rhythm: **8px** multiples, with **24px–32px** as the primary section padding.
- Extended tokens (defined in Tailwind): `18 => 4.5rem`, `22 => 5.5rem`, `26 => 6.5rem` for generous breathing room.
- Rounded corners default to `1.25rem` for cards, `2rem+` for hero visuals.
- Soft drop shadows (`shadow-soft`) keep depth subtle.

## Motion & Interaction
- Motion primitives rely on opacity + transform (Framer Motion + Intersection Observer wrappers already scaffolded).
- Respect `prefers-reduced-motion` when implementing in Phase 4.

## Assets
Placeholder SVGs live in `public/assets`. Replace with photography/3D renders when final assets are approved.
