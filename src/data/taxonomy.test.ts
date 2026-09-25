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

  it('uses family and navigation terminology consistently', () => {
    expect(taxonomyById.get('frutiger-aero')?.kind).toBe('Family');
    expect(taxonomyById.get('vectordelia')?.kind).toBe('Family');
    expect(taxonomyById.get('more')?.kind).toBe('Navigation');

    const aeroChildren = getSectionChildren('frutiger-aero');
    const vectordeliaChildren = getSectionChildren('vectordelia');
    const moreChildren = getSectionChildren('more');

    expect(aeroChildren).toHaveLength(18);
    expect(aeroChildren.every((record) => record.kind === 'Subcategory')).toBe(true);
    expect(vectordeliaChildren).toHaveLength(5);
    expect(vectordeliaChildren.every((record) => record.kind === 'Subcategory')).toBe(true);
    expect(moreChildren).toHaveLength(10);
    expect(moreChildren.every((record) => record.kind === 'Category')).toBe(true);
  });

  it('preserves research aliases and relationship metadata', () => {
    expect(taxonomyById.get('helvetica-aqua-aero')?.aliases).toEqual([
      'Frutiger Aqua',
      'Helvetica Aqua',
    ]);
    expect(taxonomyById.get('dark-aero')?.aliases).toEqual([
      'Mata Nero',
      'Frutiger Ego',
      'Dark Frutiger Aero',
    ]);
    expect(taxonomyById.get('cleancore')?.aliases).toEqual(['Safetycore', 'Hygienicore']);
    expect(taxonomyById.get('renewable-corporate-utopia')?.aliases).toEqual([
      'Renewable Corporate Futurism',
      'Stock Eco Office',
      'Stecoffism',
      'Stecffism',
      'Solargraphic',
    ]);
    expect(taxonomyById.get('dorfic')?.relatedIds).toContain('abstract-tech');
    expect(taxonomyById.get('rave-metro')?.relatedIds).toEqual(['funky-metro', 'grungy-metro']);
  });

  it('keeps Vectordelia metadata and Musica Metro uncertainty explicit', () => {
    for (const id of ['vectordelia', 'vectorflourish', 'vectorbloom', 'vectorgarden', 'funky-metro', 'rave-metro', 'grungy-metro']) {
      expect(taxonomyById.get(id)).toMatchObject({ status: 'Established', origin: 'Historical' });
    }
    expect(taxonomyById.get('grungy-metro')?.aliases).toContain('Vector Grunge');
    expect(taxonomyById.get('musica-metro')).toMatchObject({
      status: 'Developing',
      origin: 'Historical',
    });
    expect(taxonomyById.get('musica-metro')?.classificationNotes).toContain('modern retrospective classification');
  });

  it('retains exactly the current v0.1 seed records', () => {
    expect(taxonomy).toHaveLength(41);
  });
});
