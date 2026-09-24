import { describe, expect, it } from 'vitest';
import { getNearestIndex, getProximityWeights } from './proximity';

const centers = [
  { x: 100, y: 100 },
  { x: 300, y: 100 },
  { x: 500, y: 100 },
];

describe('Level 2 proximity math', () => {
  it('gives the closest tile the strongest emphasis', () => {
    const weights = getProximityWeights({ x: 120, y: 110 }, centers, 360);

    expect(weights[0]).toBeGreaterThan(weights[1]);
    expect(weights[1]).toBeGreaterThan(weights[2]);
  });

  it('keeps a small stable emphasis floor for distant tiles', () => {
    expect(getProximityWeights({ x: 1500, y: 900 }, centers, 360)).toEqual([
      0.08,
      0.08,
      0.08,
    ]);
  });

  it('finds the nearest tile for visual selection', () => {
    expect(getNearestIndex({ x: 420, y: 120 }, centers)).toBe(2);
  });
});
