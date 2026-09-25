# Taxonomy

## Model

Navigation looks tree-like, but classification is a graph. Records support
multiple `parentIds`, `childIds`, and `relatedIds`. Relationships do not force
an aesthetic into one strict hierarchy.

Preferred vocabulary: Realm, Family, Category, Subcategory, Parent, Children,
Related, Status, Origin, Era, and Aliases. Use `Subcategory`; do not use
`Variant`.

Frutiger Aero and Vectordelia are Families, and their direct Level 3 children
are Subcategories. More is a navigation section rather than a Family, and its
direct Level 3 children are Categories. Those Categories may contain their own
Subcategories.

## Record fields

The canonical source is `src/data/taxonomy.json`. A record may contain:

- identity: `id`, `slug`, `name`, `aliases`
- placement: `section`, `level`, `kind`
- graph: `parentIds`, `childIds`, `relatedIds`
- classification: `status`, `origin`, `era`, `classificationNotes`
- presentation: `summary`, `overview`, `colors`, `motifs`, `tileImage`,
  `heroImage`, `galleryImages`, `specialTheme`
- maintenance: `sources`, `tags`, `lastReviewed`

`tileImage` always identifies the complete tile artwork. `placeholder: true`
means the asset reserves that contract and may be replaced without component
changes.

## Controlled values

- Status: `Established`, `Developing`, `Emerging`
- Origin: `Historical`, `Community`, `Fan-made`
- Section: `vectordelia`, `frutiger-aero`, `more`
- Kind: `Realm`, `Family`, `Category`, `Subcategory`, `Navigation`

Status measures classification maturity, not popularity or quality. Origin is
separate from status.

## Key nesting

- Frutiger Eco -> Renewable Corporate Utopia
- Vectorflourish -> Vectorbloom, Vectorgarden
- Cleancore -> High Cleancore, Low Cleancore

Vectorgarden also relates to Frutiger Aero. Aliases resolve to canonical records
and never create duplicate pages.

## Validation

Run `pnpm validate:data`. The validator rejects duplicate IDs or slugs, unknown
references, self-references, invalid controlled values, repeated aliases within
a record, and aliases that collide with another canonical name, slug, or alias.
It also checks that declared parent/child and related links are reciprocal.
Direct children of Families must be Subcategories, while direct children of
Navigation records must be Categories.
