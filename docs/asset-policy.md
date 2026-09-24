# Asset and Copyright Policy

## Default rule

Reference images, archive pages, search results, social posts, and wiki images
are research inputs, not automatic production assets. Do not scrape or import
them into the repository. A supplied image is a design reference unless the
owner explicitly approves it for production use.

AI-generated imagery is prohibited throughout Frutisphere. This includes Level
2 and Level 3 tiles, heroes, galleries, historical examples, decorative
examples, and temporary stand-ins. Synthetic representative imagery conflicts
with the project's archival and reference purpose.

## Allowed in v0.1

- Original human-created assets made for Frutisphere
- Owner-created assets explicitly approved for production use
- Properly licensed assets with recorded provenance and terms
- Deliberately neutral structural placeholder image assets
- CSS-created site atmosphere and interface effects

## Tile assets

Each Level 2 and Level 3 `tileImage` is a complete artwork file. It can include
its own frame, border, and internal composition. The UI must not place a second
decorative frame around a cropped source image. Titles remain HTML text below.

Placeholders should preserve the target aspect ratio and layout behavior. They
must be visually neutral: a muted rectangle or gradient, subtle empty-state
pattern, generic image icon, or plain placeholder label. They must not imitate
the documented aesthetic or be mistaken for an authentic example. They must be
replaceable by changing the data reference only.

CSS may provide the Alba Aero-inspired environment, glass panels, highlights,
shadows, controls, and motion. That styling is interface design and must remain
clearly distinct from aesthetic evidence or archive imagery.

## Future metadata

Image records should support title, creator, original source, source URL, year,
role, copyright status, license, permission status, aesthetic IDs, visual tags,
description, and source confidence. Roles include Hero, Historical Example,
Reference Gallery, and Community Gallery.

Historical material must be distinguishable from modern recreation and
community artwork. Unclear rights mean the asset stays out of production.
