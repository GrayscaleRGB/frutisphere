// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  APPEARANCE_STORAGE_KEY,
  AppearanceProvider,
} from '../appearance/AppearanceContext';
import { ACCENT_OPTIONS, THEME_OPTIONS } from '../appearance/appearance';
import { AppearanceMenu } from './AppearanceMenu';

function renderMenu() {
  return render(
    <AppearanceProvider>
      <AppearanceMenu />
    </AppearanceProvider>,
  );
}

describe('AppearanceMenu', () => {
  beforeEach(() => {
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((callback) => {
      callback(0);
      return 1;
    });
    window.localStorage.clear();
    delete document.documentElement.dataset.theme;
    delete document.documentElement.dataset.accent;
    delete document.documentElement.dataset.specialTheme;
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it('exposes every Quick Access theme and accent while keeping Recent hidden', () => {
    renderMenu();
    fireEvent.click(screen.getByRole('button', { name: 'Appearance' }));

    for (const option of THEME_OPTIONS) {
      expect(screen.getByRole('button', { name: option.name })).toBeTruthy();
    }
    for (const option of ACCENT_OPTIONS) {
      expect(screen.getByRole('button', { name: option.name })).toBeTruthy();
    }
    expect(screen.queryByRole('heading', { name: 'Recent' })).toBeNull();
  });

  it('persists independent theme and accent choices without populating Recent', () => {
    const firstRender = renderMenu();
    fireEvent.click(screen.getByRole('button', { name: 'Appearance' }));
    fireEvent.click(screen.getByRole('button', { name: 'Dark Aero' }));
    fireEvent.click(screen.getByRole('button', { name: 'Purple' }));

    expect(document.documentElement.dataset.theme).toBe('dark-aero');
    expect(document.documentElement.dataset.accent).toBe('purple');
    expect(screen.queryByRole('heading', { name: 'Recent' })).toBeNull();
    expect(JSON.parse(window.localStorage.getItem(APPEARANCE_STORAGE_KEY)!)).toMatchObject({
      theme: 'dark-aero',
      accent: 'purple',
      recentSpecialThemes: [],
    });

    firstRender.unmount();
    renderMenu();
    fireEvent.click(screen.getByRole('button', { name: 'Appearance' }));
    expect(screen.getByRole('button', { name: 'Dark Aero' }).getAttribute('aria-pressed')).toBe('true');
    expect(screen.getByRole('button', { name: 'Purple' }).getAttribute('aria-pressed')).toBe('true');
  });

  it('identifies the active special theme and returns focus when dismissed', () => {
    window.localStorage.setItem(APPEARANCE_STORAGE_KEY, JSON.stringify({
      theme: 'alba-aero',
      accent: 'default',
      activeSpecialTheme: 'eco-bloom',
      recentSpecialThemes: ['eco-bloom'],
    }));
    renderMenu();

    const trigger = screen.getByRole('button', { name: 'Appearance' });
    fireEvent.click(trigger);
    expect(screen.getByText('Active special theme: Eco Bloom')).toBeTruthy();

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('dialog', { name: 'Appearance settings' })).toBeNull();
    expect(document.activeElement).toBe(trigger);
  });
});
