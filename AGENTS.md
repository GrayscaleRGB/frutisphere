# Frutisphere Agent Guide

## Purpose

Frutisphere is an interactive visual atlas of the Frutiger aesthetic ecosystem.
It is visual exploration first, documentation second, and community features
later. The explorer is the homepage; do not turn it into a marketing landing
page or a general aesthetics encyclopedia.

## Product authority

The project owner makes final product, taxonomy, content, and visual decisions.
When implementation exposes a significant product choice, document the issue
and present options instead of silently redesigning the product.

## Non-negotiable tile rule

Level 2 and Level 3 tile artwork is one complete image asset. The future image
will contain its own frame, border, and composition. Components may position,
scale, shadow, and animate that whole asset, but must not add a decorative CSS
frame around an inner cropped image. Titles are separate semantic HTML below
the image. Until approved final artwork exists, use explicit placeholder image
assets.

## Architecture

- Vite, React, and TypeScript; no backend.
- Hash routing for static hosting compatibility.
- `src/data/taxonomy.json` is the canonical taxonomy source.
- Run `pnpm validate:data` after taxonomy edits.
- Themes and accents are separate concepts and persist in `localStorage`.
- Keep routes and pages data-driven; do not create one component per aesthetic.

## Scope boundaries

Do not add accounts, authentication, chat, comments, forums, uploads,
moderation, profiles, a database, or a full relationship-map UI in v0.1. Do
not add Vaporwave, Dreamcore, Weirdcore, or Flat Metro. Use `Subcategory`, not
`Variant`.

## Assets and content

Treat supplied references as design references unless the owner explicitly
approves production use. Do not scrape or import copyrighted aesthetic imagery.
Do not use AI-generated imagery anywhere in Frutisphere, including temporary
tile artwork, heroes, galleries, historical examples, or decorative aesthetic
examples. Placeholders must be deliberately neutral structural UI: muted blocks,
subtle empty states, generic image icons, or plain labels. Approved real or
custom human-created imagery may replace them later. CSS may style the interface
but must not imitate evidence or representative archival imagery. Do not
fabricate historical claims or sources to fill empty sections.

## Quality bar

Keep the app runnable after each major milestone. Preserve keyboard access,
visible focus, touch targets, responsive layouts, and reduced-motion behavior.
Level 3 grids use equal-size tiles. Avoid generic SaaS styling and dead links.
