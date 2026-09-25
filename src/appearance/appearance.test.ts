import { describe, expect, it } from 'vitest';
import { addRecentSpecialTheme, DEFAULT_APPEARANCE, parseAppearance } from './appearance';

describe('appearance state', () => {
  it('keeps the three latest unique special themes', () => {
    expect(addRecentSpecialTheme(['cyber-glacier', 'eco-bloom'], 'eco-bloom')).toEqual([
      'eco-bloom',
      'cyber-glacier',
    ]);
  });

  it('falls back safely when stored appearance is malformed', () => {
    expect(parseAppearance('{broken')).toEqual(DEFAULT_APPEARANCE);
    expect(parseAppearance(JSON.stringify({ theme: 'unknown', accent: 'aqua' }))).toMatchObject({
      theme: 'alba-aero',
      accent: 'aqua',
    });
  });

  it('filters unknown and duplicate recent themes', () => {
    expect(parseAppearance(JSON.stringify({
      theme: 'dark-aero',
      accent: 'lime',
      activeSpecialTheme: 'eco-bloom',
      recentSpecialThemes: ['eco-bloom', 'unknown', 'eco-bloom', 'cyber-glacier'],
    }))).toEqual({
      theme: 'dark-aero',
      accent: 'lime',
      activeSpecialTheme: 'eco-bloom',
      recentSpecialThemes: ['eco-bloom', 'cyber-glacier'],
    });
  });
});
