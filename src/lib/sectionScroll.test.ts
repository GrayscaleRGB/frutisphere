// @vitest-environment jsdom

import { beforeEach, describe, expect, it } from 'vitest';
import {
  getAestheticSection,
  getSectionSlug,
  readSectionScroll,
  shouldRestoreSectionScroll,
  writeSectionScroll,
} from './sectionScroll';

describe('section scroll helpers', () => {
  beforeEach(() => window.sessionStorage.clear());

  it('keeps saved positions separate for every Level 3 section', () => {
    writeSectionScroll('frutiger-aero', 720);
    writeSectionScroll('vectordelia', 260);
    writeSectionScroll('more', 410);

    expect(readSectionScroll('frutiger-aero')).toBe(720);
    expect(readSectionScroll('vectordelia')).toBe(260);
    expect(readSectionScroll('more')).toBe(410);
  });

  it('recognizes section and aesthetic ownership from canonical routes', () => {
    expect(getSectionSlug('/section/frutiger-aero')).toBe('frutiger-aero');
    expect(getAestheticSection('/aesthetic/frutiger-jolly')).toBe('frutiger-aero');
    expect(getAestheticSection('/aesthetic/y2k-futurism')).toBe('more');
  });

  it('restores for same-section returns and history navigation, but not fresh entry', () => {
    expect(shouldRestoreSectionScroll({
      destinationSection: 'frutiger-aero',
      previousPathname: '/aesthetic/frutiger-jolly',
      navigationType: 'PUSH',
    })).toBe(true);
    expect(shouldRestoreSectionScroll({
      destinationSection: 'frutiger-aero',
      previousPathname: '/aesthetic/y2k-futurism',
      navigationType: 'PUSH',
    })).toBe(false);
    expect(shouldRestoreSectionScroll({
      destinationSection: 'frutiger-aero',
      previousPathname: '/',
      navigationType: 'PUSH',
    })).toBe(false);
    expect(shouldRestoreSectionScroll({
      destinationSection: 'frutiger-aero',
      previousPathname: '/aesthetic/frutiger-jolly',
      navigationType: 'POP',
    })).toBe(true);
    expect(shouldRestoreSectionScroll({
      destinationSection: 'frutiger-aero',
      navigationType: 'POP',
    })).toBe(false);
  });
});
