// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { Link, MemoryRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { readSectionScroll, writeSectionScroll } from '../lib/sectionScroll';
import { ScrollToTop } from './ScrollToTop';

let currentScrollY = 0;

function HistoryBackButton() {
  const navigate = useNavigate();
  return <button type="button" onClick={() => navigate(-1)}>Browser back</button>;
}

function TestRoutes() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/explore" element={<Link to="/section/frutiger-aero">Open Frutiger Aero</Link>} />
        <Route path="/section/frutiger-aero" element={(
          <>
            <Link to="/aesthetic/frutiger-jolly">Open Frutiger Jolly</Link>
            <Link to="/aesthetic/frutiger-eco">Open Frutiger Eco</Link>
          </>
        )} />
        <Route path="/section/more" element={<span>More grid</span>} />
        <Route path="/aesthetic/frutiger-jolly" element={(
          <>
            <Link to="/section/frutiger-aero">Back to Frutiger Aero</Link>
            <HistoryBackButton />
          </>
        )} />
        <Route path="/aesthetic/y2k-futurism" element={<Link to="/section/more">Back to More</Link>} />
        <Route path="/aesthetic/frutiger-eco" element={(
          <>
            <Link to="/aesthetic/renewable-corporate-utopia">Open Renewable Corporate Utopia</Link>
            <Link to="/section/frutiger-aero">Back to Frutiger Aero</Link>
          </>
        )} />
        <Route
          path="/aesthetic/renewable-corporate-utopia"
          element={<Link to="/aesthetic/frutiger-eco">Back to Frutiger Eco</Link>}
        />
      </Routes>
    </>
  );
}

function renderAt(initialEntries: string[], initialIndex = initialEntries.length - 1) {
  return render(
    <MemoryRouter initialEntries={initialEntries} initialIndex={initialIndex}>
      <TestRoutes />
    </MemoryRouter>,
  );
}

describe('ScrollToTop section restoration', () => {
  beforeEach(() => {
    currentScrollY = 0;
    window.sessionStorage.clear();
    Object.defineProperty(window, 'scrollY', {
      configurable: true,
      get: () => currentScrollY,
    });
    vi.spyOn(window, 'scrollTo').mockImplementation(((optionsOrX?: ScrollToOptions | number, y?: number) => {
      currentScrollY = typeof optionsOrX === 'number'
        ? y ?? 0
        : optionsOrX?.top ?? 0;
    }) as typeof window.scrollTo);
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it('starts at the top when entering a section fresh from Level 2', () => {
    writeSectionScroll('frutiger-aero', 640);
    renderAt(['/explore']);
    fireEvent.click(screen.getByRole('link', { name: 'Open Frutiger Aero' }));

    expect(currentScrollY).toBe(0);
    expect(readSectionScroll('frutiger-aero')).toBe(0);
  });

  it('restores a section when using its normal Back link', () => {
    writeSectionScroll('frutiger-aero', 735);
    renderAt(['/aesthetic/frutiger-jolly']);
    fireEvent.click(screen.getByRole('link', { name: 'Back to Frutiger Aero' }));

    expect(currentScrollY).toBe(735);
  });

  it('restores the correct section-specific position', () => {
    writeSectionScroll('frutiger-aero', 735);
    writeSectionScroll('more', 315);
    renderAt(['/aesthetic/y2k-futurism']);
    fireEvent.click(screen.getByRole('link', { name: 'Back to More' }));

    expect(currentScrollY).toBe(315);
  });

  it('restores when returning with browser history', () => {
    writeSectionScroll('frutiger-aero', 880);
    renderAt(['/section/frutiger-aero', '/aesthetic/frutiger-jolly']);
    fireEvent.click(screen.getByRole('button', { name: 'Browser back' }));

    expect(currentScrollY).toBe(880);
  });

  it('retains the section position through nested Level 4 navigation', () => {
    renderAt(['/section/frutiger-aero']);
    writeSectionScroll('frutiger-aero', 925);

    fireEvent.click(screen.getByRole('link', { name: 'Open Frutiger Eco' }));
    fireEvent.click(screen.getByRole('link', { name: 'Open Renewable Corporate Utopia' }));
    fireEvent.click(screen.getByRole('link', { name: 'Back to Frutiger Eco' }));
    fireEvent.click(screen.getByRole('link', { name: 'Back to Frutiger Aero' }));

    expect(currentScrollY).toBe(925);
  });
});
