// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, useLocation } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { AppearanceProvider } from '../appearance/AppearanceContext';
import { HomePage } from './HomePage';

function LocationProbe() {
  return <div data-testid="location">{useLocation().pathname}</div>;
}

function renderHome() {
  return render(
    <AppearanceProvider>
      <MemoryRouter>
        <HomePage />
        <LocationProbe />
      </MemoryRouter>
    </AppearanceProvider>,
  );
}

describe('HomePage', () => {
  beforeEach(() => window.localStorage.clear());
  afterEach(cleanup);

  it('presents the atlas, future community scope, and explicit placeholder metrics', () => {
    renderHome();

    expect(screen.getByRole('heading', { level: 1, name: 'Frutisphere' })).toBeTruthy();
    expect(screen.getByRole('img', { name: 'Frutisphere' }).getAttribute('src')).toContain(
      '/assets/branding/frutisphere-logo.png',
    );
    expect(screen.getByRole('heading', { name: 'Visual and documentation atlas' })).toBeTruthy();
    expect(screen.getByRole('heading', { name: 'Future community space' })).toBeTruthy();
    expect(screen.getByText('No live account, traffic, or presence data is connected in v0.1.')).toBeTruthy();
    expect(screen.getAllByText('Future metric')).toHaveLength(3);
  });

  it('separates Home from the Explore route', () => {
    renderHome();

    expect(screen.getByRole('link', { name: /^Home$/i }).getAttribute('href')).toBe('/');
    expect(screen.getByRole('link', { name: /^Explore$/i }).getAttribute('href')).toBe('/explore');
    fireEvent.click(screen.getByRole('link', { name: 'Open the atlas' }));
    expect(screen.getByTestId('location').textContent).toBe('/explore');
  });
});
