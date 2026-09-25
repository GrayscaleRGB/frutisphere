# Frutisphere

An interactive visual atlas of the Frutiger aesthetic ecosystem.

Frutisphere v0.1 is an explorer prototype: a visual-first, data-driven site for
Frutiger Aero, Vectordelia, and a small curated group of related aesthetics.

## Local development

```powershell
pnpm install
pnpm validate:data
pnpm dev
```

Create a production build with `pnpm build`. The app uses hash routing so the
static output can be hosted on GitHub Pages without server-side route rewrites.

## Deployment

- Canonical repository: [frutisphere/frutisphere.github.io](https://github.com/frutisphere/frutisphere.github.io)
- Public site: [https://frutisphere.github.io/](https://frutisphere.github.io/)

Pushes to `main` deploy automatically through the GitHub Pages workflow in
`.github/workflows/deploy-pages.yml`. The production build is hosted at the
domain root with Vite's base path set to `/`; HashRouter owns client-side routes.

## Project map

- `AGENTS.md` - working rules for Codex and future contributors
- `docs/product-spec.md` - v0.1 product and interaction requirements
- `docs/taxonomy.md` - data model and initial classification
- `docs/asset-policy.md` - image and copyright rules
- `docs/roadmap.md` - incremental delivery plan
- `docs/decisions.md` - lightweight architecture decision log
- `src/data/taxonomy.json` - canonical taxonomy records
- `scripts/validate-taxonomy.mjs` - taxonomy integrity checks

## Commands

- `pnpm dev` - run the local development server
- `pnpm build` - type-check and build the static site
- `pnpm preview` - preview the production build
- `pnpm validate:data` - validate taxonomy references and values
- `pnpm test` - run the automated tests
