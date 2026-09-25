// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, useLocation } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { SearchDialog } from './SearchDialog';

function LocationProbe() {
  return <div data-testid="location">{useLocation().pathname}</div>;
}

function renderSearch() {
  return render(
    <MemoryRouter>
      <SearchDialog />
      <LocationProbe />
    </MemoryRouter>,
  );
}

describe('SearchDialog', () => {
  beforeEach(() => {
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((callback) => {
      callback(0);
      return 1;
    });
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it('finds aliases and supports keyboard navigation into a result', () => {
    renderSearch();
    fireEvent.click(screen.getByRole('button', { name: 'Search' }));

    const input = screen.getByRole('searchbox', { name: 'Search names and aliases' });
    expect(document.activeElement).toBe(input);
    fireEvent.change(input, { target: { value: 'mata nero' } });

    const result = screen.getByRole('link', { name: /Dark Aero/i });
    expect(result.textContent).toContain('Mata Nero');
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    expect(document.activeElement).toBe(result);

    fireEvent.click(result);
    expect(screen.getByTestId('location').textContent).toBe('/aesthetic/dark-aero');
  });

  it('routes Level 2 search results to their section pages', () => {
    renderSearch();
    fireEvent.click(screen.getByRole('button', { name: 'Search' }));
    fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'vectordelia' } });
    fireEvent.click(screen.getByRole('link', { name: /Vectordelia/i }));

    expect(screen.getByTestId('location').textContent).toBe('/section/vectordelia');
  });

  it('opens from the keyboard shortcut and restores trigger focus on Escape', () => {
    renderSearch();
    const trigger = screen.getByRole('button', { name: 'Search' });

    fireEvent.keyDown(document, { key: 'k', ctrlKey: true });
    expect(screen.getByRole('dialog', { name: 'Search Frutisphere' })).toBeTruthy();
    fireEvent.keyDown(document, { key: 'Escape' });

    expect(screen.queryByRole('dialog', { name: 'Search Frutisphere' })).toBeNull();
    expect(document.activeElement).toBe(trigger);
  });

  it('announces an empty result set', () => {
    renderSearch();
    fireEvent.click(screen.getByRole('button', { name: 'Search' }));
    fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'not an aesthetic' } });

    expect(screen.getByRole('status').textContent).toContain('0 results');
    expect(screen.getByText('No matching names or aliases.')).toBeTruthy();
  });
});
