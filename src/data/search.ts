import { taxonomy, type TaxonomyRecord } from './taxonomy';

function normalize(value: string) {
  return value.trim().toLocaleLowerCase('en-US');
}

function scoreRecord(record: TaxonomyRecord, query: string) {
  const name = normalize(record.name);
  const aliases = record.aliases.map(normalize);

  if (name === query) return 0;
  if (aliases.includes(query)) return 1;
  if (name.startsWith(query)) return 2;
  if (aliases.some((alias) => alias.startsWith(query))) return 3;
  if (name.includes(query)) return 4;
  if (aliases.some((alias) => alias.includes(query))) return 5;
  return undefined;
}

export function searchTaxonomy(query: string, limit = 10) {
  const normalizedQuery = normalize(query);
  if (!normalizedQuery) return [];

  return taxonomy
    .flatMap((record) => {
      const score = scoreRecord(record, normalizedQuery);
      return score === undefined ? [] : [{ record, score }];
    })
    .sort((a, b) => a.score - b.score || a.record.name.localeCompare(b.record.name))
    .slice(0, limit)
    .map(({ record }) => record);
}

export function getRecordRoute(record: TaxonomyRecord) {
  return record.level === 2
    ? `/section/${record.slug}`
    : `/aesthetic/${record.slug}`;
}
