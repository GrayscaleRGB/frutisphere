// @vitest-environment jsdom

import { cleanup, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { LevelTwoExplorer } from './LevelTwoExplorer';

describe('LevelTwoExplorer', () => {
  beforeEach(() => {
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
  });

  afterEach(cleanup);

  it('uses the complete production artwork while keeping titles as separate text', () => {
    render(
      <MemoryRouter>
        <LevelTwoExplorer />
      </MemoryRouter>,
    );

    const expectedArtwork = {
      'Frutiger Aero': '/assets/level-2/frutiger-aero.png',
      Vectordelia: '/assets/level-2/vectordelia.png',
      More: '/assets/level-2/more.png',
    };

    Object.entries(expectedArtwork).forEach(([name, source]) => {
      const link = screen.getByRole('link', { name: `Explore ${name}` });
      expect(link.querySelector('img')?.getAttribute('src')).toContain(source);
      expect(link.querySelector('.tile-title')?.textContent).toBe(name);
    });
  });
});
