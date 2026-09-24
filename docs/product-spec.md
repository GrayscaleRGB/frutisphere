# Product Specification

## v0.1 objective

Frutisphere v0.1 is an explorer prototype for testing visual identity,
navigation depth, responsive interaction, taxonomy architecture, appearance
controls, and placeholder-asset replacement. It is not the final public site.

The design principle is "2007 visual philosophy, 2026 usability": glossy,
bright, tactile, and expressive while remaining legible, responsive, and
accessible.

## Navigation levels

1. Level 1: the Alba Aero site environment and compact global header.
2. Level 2: exactly three primary choices: Vectordelia, Frutiger Aero, More.
3. Level 3: an equal-size grid of categories within the selected section.
4. Level 4: a reusable, data-driven category or aesthetic page.

The explorer is the homepage. It opens with Frutiger Aero emphasized.

## Tile contract

Level 2 and Level 3 render a complete image asset plus a separate HTML title.
The image may later contain its own decorative frame and internal composition.
The site must not build an additional frame around a cropped photograph. v0.1
uses complete placeholder image files and swaps them only through data.

## Interaction

On pointer-capable layouts, Level 2 emphasis follows cursor proximity. The
nearest tile grows while its neighbors yield space. Keyboard focus produces
equivalent emphasis. Motion must remain smooth without overlap.

On touch layouts, Level 2 becomes a centered horizontal snap carousel. The
centered tile is selected and enlarged; neighboring tiles remain partially
visible. Frutiger Aero is initially centered.

Level 3 uses equal-size responsive tiles with modest whole-image lift and glow
on hover or focus. Grid geometry must not reflow during emphasis.

Reduced-motion mode removes continuous or sweeping motion and uses immediate or
short transitions. No action may require hover.

## Level 4 template

The template can render Hero/Identity, Overview, At a Glance, Defining
Characteristics, History, Historical Examples, Gallery, Subcategories,
Relationships, Sources, and later Community. Empty content sections do not
render. v0.1 should not invent historical material.

## Appearance

Quick Access themes are Alba Aero, Classic Aero, Dark Aero, and Vectordelia.
Theme and accent are independent. Accent options are Theme Default, Aqua, Lime,
Orange, Pink, Purple, White, Gray, and Dark. One or two category pages may offer
an optional special theme. Activating one adds it to Recent; Recent stores the
latest three unique special themes and stays hidden until populated.

## Search

Local search covers names and aliases. Selecting a Level 2 result opens its
section; selecting any other result opens its Level 4 page.

## Explicit exclusions

No accounts, sign-in, chat, direct messages, comments, forums, uploads, polls,
moderation, profiles, backend, database, CMS, full graph UI, or broad unrelated
aesthetic coverage. Vaporwave, Dreamcore, Weirdcore, and Flat Metro are absent.
