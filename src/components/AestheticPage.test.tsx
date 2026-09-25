// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import {
  APPEARANCE_STORAGE_KEY,
  AppearanceProvider,
} from '../appearance/AppearanceContext';
import { taxonomyById } from '../data/taxonomy';
import { AestheticPage } from './AestheticPage';

function renderAesthetic(path: string) {
  return render(
    <AppearanceProvider>
      <MemoryRouter initialEntries={[path]}>
        <Routes>
          <Route path="/aesthetic/:aestheticSlug" element={<AestheticPage />} />
        </Routes>
      </MemoryRouter>
    </AppearanceProvider>,
  );
}

describe('AestheticPage', () => {
  beforeEach(() => {
    window.localStorage.clear();
    delete document.documentElement.dataset.theme;
    delete document.documentElement.dataset.accent;
    delete document.documentElement.dataset.specialTheme;
  });

  afterEach(cleanup);

  it('renders nested subcategories as navigable tiles', () => {
    renderAesthetic('/aesthetic/frutiger-eco');

    expect(screen.getByRole('heading', { level: 1, name: 'Frutiger Eco' })).toBeTruthy();
    expect(screen.getByRole('heading', { level: 2, name: 'Subcategories' })).toBeTruthy();
    expect(screen.getByRole('link', { name: 'Open Renewable Corporate Utopia' }).getAttribute('href')).toBe(
      '/aesthetic/renewable-corporate-utopia',
    );
  });

  it('hides empty authored-content sections', () => {
    renderAesthetic('/aesthetic/frutiger-eco');

    expect(screen.queryByRole('heading', { name: 'Overview' })).toBeNull();
    expect(screen.queryByRole('heading', { name: 'History' })).toBeNull();
    expect(screen.queryByRole('heading', { name: 'Historical Examples' })).toBeNull();
    expect(screen.queryByRole('heading', { name: 'Gallery' })).toBeNull();
    expect(screen.queryByRole('heading', { name: 'Sources' })).toBeNull();
  });

  it('renders optional history modules when their data is present', () => {
    const record = taxonomyById.get('y2k-futurism')!;
    record.history = 'Fixture history for the reusable page module.';
    record.historicalExamples = [{
      src: '/assets/placeholders/more-tile.svg',
      alt: 'Neutral historical example placeholder',
      placeholder: true,
    }];

    try {
      renderAesthetic('/aesthetic/y2k-futurism');

      expect(screen.getByRole('heading', { name: 'History' })).toBeTruthy();
      expect(screen.getByText('Fixture history for the reusable page module.')).toBeTruthy();
      expect(screen.getByRole('heading', { name: 'Historical Examples' })).toBeTruthy();
      expect(screen.getByAltText('Neutral historical example placeholder')).toBeTruthy();
    } finally {
      delete record.history;
      delete record.historicalExamples;
    }
  });

  it('renders parent navigation for a nested subcategory', () => {
    renderAesthetic('/aesthetic/renewable-corporate-utopia');

    expect(screen.getByRole('link', { name: /^Frutiger Eco$/ }).getAttribute('href')).toBe(
      '/aesthetic/frutiger-eco',
    );
    expect(screen.getByRole('link', { name: 'Back to Frutiger Eco' }).getAttribute('href')).toBe(
      '/aesthetic/frutiger-eco',
    );
  });

  it('offers both planned special themes only on their assigned pages', () => {
    const eco = renderAesthetic('/aesthetic/frutiger-eco');
    expect(screen.getByRole('button', { name: 'Use Eco Bloom theme' })).toBeTruthy();
    expect(document.documentElement.dataset.specialTheme).toBeUndefined();

    eco.unmount();
    const glacier = renderAesthetic('/aesthetic/cyber-glacier');
    expect(screen.getByRole('button', { name: 'Use Cyber Glacier theme' })).toBeTruthy();
    expect(document.documentElement.dataset.specialTheme).toBeUndefined();

    glacier.unmount();
    renderAesthetic('/aesthetic/y2k-futurism');
    expect(screen.queryByRole('button', { name: /theme$/i })).toBeNull();
  });

  it('activates special themes explicitly, newest first, and preserves them across navigation', () => {
    const eco = renderAesthetic('/aesthetic/frutiger-eco');
    fireEvent.click(screen.getByRole('button', { name: 'Use Eco Bloom theme' }));

    expect(document.documentElement.dataset.specialTheme).toBe('eco-bloom');
    fireEvent.click(screen.getByRole('button', { name: 'Appearance' }));
    expect(screen.getByRole('heading', { name: 'Recent' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Eco Bloom' })).toBeTruthy();

    eco.unmount();
    renderAesthetic('/aesthetic/cyber-glacier');
    expect(document.documentElement.dataset.specialTheme).toBe('eco-bloom');
    expect(screen.getByRole('button', { name: 'Use Cyber Glacier theme' }).getAttribute('aria-pressed')).toBe('false');

    fireEvent.click(screen.getByRole('button', { name: 'Use Cyber Glacier theme' }));
    expect(document.documentElement.dataset.specialTheme).toBe('cyber-glacier');
    expect(JSON.parse(window.localStorage.getItem(APPEARANCE_STORAGE_KEY)!)).toMatchObject({
      activeSpecialTheme: 'cyber-glacier',
      recentSpecialThemes: ['cyber-glacier', 'eco-bloom'],
    });
  });
});
