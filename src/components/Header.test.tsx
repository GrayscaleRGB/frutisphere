// @vitest-environment jsdom

import { cleanup, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { AppearanceProvider } from '../appearance/AppearanceContext';
import { Header } from './Header';

function renderHeader(path: string) {
  return render(
    <AppearanceProvider>
      <MemoryRouter initialEntries={[path]}>
        <Header />
      </MemoryRouter>
    </AppearanceProvider>,
  );
}

describe('Header', () => {
  beforeEach(() => window.localStorage.clear());
  afterEach(cleanup);

  it('marks Home as current only on the Home page', () => {
    renderHeader('/');
    expect(screen.getByRole('link', { name: /^Home$/i }).getAttribute('aria-current')).toBe('page');
    expect(screen.getByRole('link', { name: /^Explore$/i }).getAttribute('aria-current')).toBeNull();
  });

  it('keeps Explore current throughout section and aesthetic routes', () => {
    const section = renderHeader('/section/frutiger-aero');
    expect(screen.getByRole('link', { name: /^Explore$/i }).getAttribute('aria-current')).toBe('page');

    section.unmount();
    renderHeader('/aesthetic/frutiger-eco');
    expect(screen.getByRole('link', { name: /^Explore$/i }).getAttribute('aria-current')).toBe('page');
  });
});
