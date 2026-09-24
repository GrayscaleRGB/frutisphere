import { describe, expect, it } from 'vitest';
import { getLevelTwoRecords, getSectionChildren, taxonomy, taxonomyById } from './taxonomy';

describe('taxonomy foundation', () => {
  it('contains the three intentional Level 2 sections', () => {
    expect(getLevelTwoRecords().map((record) => record.id)).toEqual([
      'vectordelia',
      'frutiger-aero',
      'more',
    ]);
  });

  it('keeps aliases on canonical records instead of duplicating pages', () => {
    expect(taxonomyById.get('cyber-glacier')?.aliases).toEqual([
      'Frutiger Glacier',
      'Frutiger Winter',
    ]);
    expect(taxonomy.some((record) => record.slug === 'frutiger-winter')).toBe(false);
  });

  it('keeps nested subcategories out of the main Level 3 grids', () => {
    expect(getSectionChildren('frutiger-aero').some((record) => record.id === 'renewable-corporate-utopia')).toBe(false);
    expect(taxonomyById.get('frutiger-eco')?.childIds).toContain('renewable-corporate-utopia');
  });

  it('retains exactly the current v0.1 seed records', () => {
    expect(taxonomy).toHaveLength(41);
  });
});
