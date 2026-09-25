import { describe, expect, it } from 'vitest';
import { getRecordRoute, searchTaxonomy } from './search';

describe('taxonomy search', () => {
  it('finds canonical names and prioritizes exact matches', () => {
    expect(searchTaxonomy('dark aero')[0]?.id).toBe('dark-aero');
    expect(searchTaxonomy('metro').map((record) => record.id)).toContain('rave-metro');
  });

  it('finds aliases without creating duplicate pages', () => {
    expect(searchTaxonomy('mata nero').map((record) => record.id)).toEqual(['dark-aero']);
    expect(searchTaxonomy('hygienicore').map((record) => record.id)).toEqual(['cleancore']);
    expect(searchTaxonomy('stecffism').map((record) => record.id)).toEqual([
      'renewable-corporate-utopia',
    ]);
  });

  it('routes Level 2 records to sections and other records to aesthetic pages', () => {
    expect(getRecordRoute(searchTaxonomy('vectordelia')[0]!)).toBe('/section/vectordelia');
    expect(getRecordRoute(searchTaxonomy('vectorflourish')[0]!)).toBe('/aesthetic/vectorflourish');
  });
});
