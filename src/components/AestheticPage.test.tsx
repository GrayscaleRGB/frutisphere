// @vitest-environment jsdom

import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { AestheticPage } from './AestheticPage';

function renderAesthetic(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/aesthetic/:aestheticSlug" element={<AestheticPage />} />
      </Routes>
    </MemoryRouter>,
  );
}

describe('AestheticPage', () => {
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
    expect(screen.queryByRole('heading', { name: 'Gallery' })).toBeNull();
    expect(screen.queryByRole('heading', { name: 'Sources' })).toBeNull();
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
});
