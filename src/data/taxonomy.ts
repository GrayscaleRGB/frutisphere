import records from './taxonomy.json';

export const SECTION_IDS = ['vectordelia', 'frutiger-aero', 'more'] as const;
export const STATUS_VALUES = ['Established', 'Developing', 'Emerging'] as const;
export const ORIGIN_VALUES = ['Historical', 'Community', 'Fan-made'] as const;

export type SectionId = (typeof SECTION_IDS)[number];
export type Status = (typeof STATUS_VALUES)[number];
export type Origin = (typeof ORIGIN_VALUES)[number];
export type TaxonomyKind = 'Realm' | 'Family' | 'Category' | 'Subcategory' | 'Navigation';

export interface TileImage {
  src: string;
  alt: string;
  placeholder: boolean;
}

export interface TaxonomyRecord {
  id: string;
  slug: string;
  name: string;
  aliases: string[];
  section: SectionId;
  level: 2 | 3 | 4;
  kind: TaxonomyKind;
  parentIds: string[];
  childIds: string[];
  relatedIds: string[];
  status?: Status;
  origin?: Origin;
  era?: string;
  summary?: string;
  overview?: string;
  colors?: string[];
  motifs?: string[];
  tileImage: TileImage;
  heroImage?: TileImage;
  galleryImages?: TileImage[];
  sources: string[];
  specialTheme?: string;
  tags: string[];
  lastReviewed?: string;
  classificationNotes?: string;
}

export const taxonomy = records as TaxonomyRecord[];
export const taxonomyById = new Map(taxonomy.map((record) => [record.id, record]));
export const taxonomyBySlug = new Map(taxonomy.map((record) => [record.slug, record]));

export function getLevelTwoRecords() {
  return taxonomy.filter((record) => record.level === 2);
}

export function getSectionChildren(section: SectionId) {
  return taxonomy.filter((record) => record.section === section && record.level === 3);
}

export function getRecords(ids: string[]) {
  return ids.flatMap((id) => {
    const record = taxonomyById.get(id);
    return record ? [record] : [];
  });
}
