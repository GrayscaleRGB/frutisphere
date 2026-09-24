# Decision Log

## D-001: React and TypeScript

Status: Accepted for v0.1.

Use Vite, React, and TypeScript for a small static client application. This
supports reusable data-driven pages without introducing a backend or CMS.

## D-002: Hash routing

Status: Accepted for v0.1.

Use hash routes so direct links work on static hosts such as GitHub Pages
without rewrite configuration. Route structure may be revisited for a custom
host later.

## D-003: JSON taxonomy source

Status: Accepted for v0.1.

Keep canonical taxonomy records in JSON. The React app adds TypeScript types at
the import boundary, while a dependency-free Node script validates the same
file early in development and CI.

## D-004: Complete tile assets

Status: Locked product decision.

Level 2 and Level 3 tiles consume one complete image asset and render the title
separately. CSS may animate the whole image but may not construct a decorative
frame around an inner crop.

## D-005: Proximity interaction

Status: Accepted for initial testing.

Use pointer position and simple normalized distance weights to set each tile's
scale. Let flex layout distribute space and CSS transitions smooth the result.
Add requestAnimationFrame only to coalesce pointer updates if testing shows it
is needed; avoid a custom physics engine in the first pass.

## D-006: Appearance persistence

Status: Accepted for v0.1.

Persist theme, accent, and the last three unique special themes in localStorage.
Quick Access themes never populate Recent. Visiting a category never changes
appearance automatically.

## D-007: No AI-generated imagery

Status: Locked product decision.

Do not create, import, or display AI-generated imagery in Frutisphere. v0.1 uses
deliberately neutral structural placeholders that preserve dimensions and
behavior without imitating the documented aesthetics. Approved real or custom
human-created imagery may replace placeholders later. CSS interface styling is
allowed when it is clearly UI rather than synthetic aesthetic evidence.
