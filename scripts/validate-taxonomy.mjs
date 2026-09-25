import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const fileUrl = new URL('../src/data/taxonomy.json', import.meta.url);
const records = JSON.parse(await readFile(fileUrl, 'utf8'));

const allowed = {
  section: new Set(['vectordelia', 'frutiger-aero', 'more']),
  level: new Set([2, 3, 4]),
  kind: new Set(['Realm', 'Family', 'Category', 'Subcategory', 'Navigation']),
  status: new Set(['Established', 'Developing', 'Emerging']),
  origin: new Set(['Historical', 'Community', 'Fan-made']),
};

const errors = [];
const byId = new Map();
const slugs = new Map();
const identityTerms = new Map();

const normalize = (value) => value.trim().toLocaleLowerCase('en-US');
const isValidImage = (image) => Boolean(
  image
  && typeof image.src === 'string'
  && image.src.trim()
  && typeof image.alt === 'string'
  && image.alt.trim()
  && typeof image.placeholder === 'boolean',
);
const noteDuplicate = (map, value, owner, label) => {
  const key = normalize(value);
  const previous = map.get(key);
  if (previous && previous !== owner) {
    errors.push(`${label} "${value}" is shared by ${previous} and ${owner}.`);
  }
  else map.set(key, owner);
};

for (const record of records) {
  if (!record.id || !record.slug || !record.name) {
    errors.push(`A record is missing id, slug, or name: ${JSON.stringify(record)}`);
    continue;
  }

  noteDuplicate(byId, record.id, record.id, 'ID');
  noteDuplicate(slugs, record.slug, record.id, 'Slug');
  noteDuplicate(identityTerms, record.name, record.id, 'Name/alias');
  noteDuplicate(identityTerms, record.slug, record.id, 'Name/alias');

  const localAliases = new Set();
  for (const alias of record.aliases ?? []) {
    const key = normalize(alias);
    if (localAliases.has(key)) errors.push(`${record.id} repeats alias "${alias}".`);
    localAliases.add(key);
    noteDuplicate(identityTerms, alias, record.id, 'Name/alias');
  }

  for (const field of ['section', 'level', 'kind']) {
    if (!allowed[field].has(record[field])) {
      errors.push(`${record.id} has invalid ${field} "${record[field]}".`);
    }
  }
  for (const field of ['status', 'origin']) {
    if (record[field] !== undefined && !allowed[field].has(record[field])) {
      errors.push(`${record.id} has invalid ${field} "${record[field]}".`);
    }
  }

  if (!isValidImage(record.tileImage)) {
    errors.push(`${record.id} has an invalid tileImage contract.`);
  }
  if (record.heroImage !== undefined && !isValidImage(record.heroImage)) {
    errors.push(`${record.id} has an invalid heroImage contract.`);
  }
  for (const field of ['historicalExamples', 'galleryImages']) {
    if (record[field] !== undefined && !Array.isArray(record[field])) {
      errors.push(`${record.id}.${field} must be an array when present.`);
      continue;
    }
    for (const image of record[field] ?? []) {
      if (!isValidImage(image)) errors.push(`${record.id}.${field} contains an invalid image contract.`);
    }
  }
}

const knownIds = new Set(records.map((record) => record.id));

for (const record of records) {
  for (const field of ['parentIds', 'childIds', 'relatedIds']) {
    const references = record[field] ?? [];
    if (new Set(references).size !== references.length) {
      errors.push(`${record.id}.${field} contains a duplicate reference.`);
    }
    for (const reference of references) {
      if (reference === record.id) errors.push(`${record.id}.${field} self-references.`);
      if (!knownIds.has(reference)) errors.push(`${record.id}.${field} references missing ID "${reference}".`);
    }
  }
}

const recordsById = new Map(records.map((record) => [record.id, record]));
for (const record of records) {
  for (const childId of record.childIds ?? []) {
    const child = recordsById.get(childId);
    if (child && !child.parentIds?.includes(record.id)) {
      errors.push(`${record.id} declares child ${childId}, but the child does not declare that parent.`);
    }
  }
  for (const parentId of record.parentIds ?? []) {
    const parent = recordsById.get(parentId);
    if (parent && !parent.childIds?.includes(record.id)) {
      errors.push(`${record.id} declares parent ${parentId}, but the parent does not declare that child.`);
    }
  }
  for (const relatedId of record.relatedIds ?? []) {
    const related = recordsById.get(relatedId);
    if (related && !related.relatedIds?.includes(record.id)) {
      errors.push(`${record.id} relates to ${relatedId}, but that relationship is not reciprocal.`);
    }
  }

  if (record.level === 2) {
    const expectedChildKind = record.kind === 'Family'
      ? 'Subcategory'
      : record.kind === 'Navigation'
        ? 'Category'
        : undefined;

    if (expectedChildKind) {
      for (const childId of record.childIds ?? []) {
        const child = recordsById.get(childId);
        if (child && child.kind !== expectedChildKind) {
          errors.push(`${record.id} is a ${record.kind} and requires direct children to be ${expectedChildKind}; ${childId} is ${child.kind}.`);
        }
      }
    }
  }
}

if (errors.length) {
  console.error(`Taxonomy validation failed with ${errors.length} error(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log(`Taxonomy validation passed: ${records.length} records checked (${fileURLToPath(fileUrl)}).`);
}
