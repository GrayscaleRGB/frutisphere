import {
  createContext,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {
  addRecentSpecialTheme,
  DEFAULT_APPEARANCE,
  parseAppearance,
  type AccentId,
  type AppearanceState,
  type SpecialThemeId,
  type ThemeId,
} from './appearance';

export const APPEARANCE_STORAGE_KEY = 'frutisphere.appearance.v1';

interface AppearanceContextValue extends AppearanceState {
  setTheme: (theme: ThemeId) => void;
  setAccent: (accent: AccentId) => void;
  activateSpecialTheme: (theme: SpecialThemeId) => void;
}

const AppearanceContext = createContext<AppearanceContextValue | undefined>(undefined);

function readStoredAppearance() {
  if (typeof window === 'undefined') return DEFAULT_APPEARANCE;
  return parseAppearance(window.localStorage.getItem(APPEARANCE_STORAGE_KEY));
}

export function AppearanceProvider({ children }: { children: ReactNode }) {
  const [appearance, setAppearance] = useState<AppearanceState>(readStoredAppearance);

  useLayoutEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = appearance.theme;
    root.dataset.accent = appearance.accent;
    if (appearance.activeSpecialTheme) root.dataset.specialTheme = appearance.activeSpecialTheme;
    else delete root.dataset.specialTheme;
    window.localStorage.setItem(APPEARANCE_STORAGE_KEY, JSON.stringify(appearance));
  }, [appearance]);

  const value = useMemo<AppearanceContextValue>(() => ({
    ...appearance,
    setTheme: (theme) => setAppearance((current) => ({
      ...current,
      theme,
      activeSpecialTheme: undefined,
    })),
    setAccent: (accent) => setAppearance((current) => ({ ...current, accent })),
    activateSpecialTheme: (activeSpecialTheme) => setAppearance((current) => ({
      ...current,
      activeSpecialTheme,
      recentSpecialThemes: addRecentSpecialTheme(current.recentSpecialThemes, activeSpecialTheme),
    })),
  }), [appearance]);

  return <AppearanceContext.Provider value={value}>{children}</AppearanceContext.Provider>;
}

export function useAppearance() {
  const context = useContext(AppearanceContext);
  if (!context) throw new Error('useAppearance must be used inside AppearanceProvider.');
  return context;
}
