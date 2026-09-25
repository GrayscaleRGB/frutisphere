// @vitest-environment jsdom

import { cleanup, fireEvent, render } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { AppearanceProvider } from '../appearance/AppearanceContext';
import { readSectionScroll } from '../lib/sectionScroll';
import { SectionPage } from './SectionPage';

describe('SectionPage scroll tracking', () => {
  let currentScrollY = 0;
  let pendingFrame: FrameRequestCallback | undefined;

  beforeEach(() => {
    currentScrollY = 0;
    pendingFrame = undefined;
    window.sessionStorage.clear();
    Object.defineProperty(window, 'scrollY', {
      configurable: true,
      get: () => currentScrollY,
    });
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((callback) => {
      pendingFrame = callback;
      return 1;
    });
    vi.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => undefined);
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it('records scrolling under the current section only', () => {
    render(
      <AppearanceProvider>
        <MemoryRouter initialEntries={['/section/frutiger-aero']}>
          <Routes>
            <Route path="/section/:sectionSlug" element={<SectionPage />} />
          </Routes>
        </MemoryRouter>
      </AppearanceProvider>,
    );

    currentScrollY = 684;
    fireEvent.scroll(window);
    pendingFrame?.(0);

    expect(readSectionScroll('frutiger-aero')).toBe(684);
    expect(readSectionScroll('vectordelia')).toBe(0);
    expect(readSectionScroll('more')).toBe(0);
  });
});
