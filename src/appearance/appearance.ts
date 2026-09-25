export const THEME_OPTIONS = [
  { id: 'alba-aero', name: 'Alba Aero', colors: ['#f8fdff', '#bcebf3', '#0ea5c7'] },
  { id: 'classic-aero', name: 'Classic Aero', colors: ['#dff4ff', '#69b8e5', '#2477af'] },
  { id: 'dark-aero', name: 'Dark Aero', colors: ['#182a33', '#28505e', '#4bc4df'] },
  { id: 'vectordelia', name: 'Vectordelia', colors: ['#f5ffd4', '#b9ed38', '#ff4ea0'] },
] as const;

export const ACCENT_OPTIONS = [
  { id: 'default', name: 'Theme Default', color: 'linear-gradient(135deg, #0ea5c7, #b9ed38)' },
  { id: 'aqua', name: 'Aqua', color: '#0ea5c7' },
  { id: 'lime', name: 'Lime', color: '#72ad18' },
  { id: 'orange', name: 'Orange', color: '#dc7a16' },
  { id: 'pink', name: 'Pink', color: '#d84d8f' },
  { id: 'purple', name: 'Purple', color: '#8259ba' },
  { id: 'white', name: 'White', color: '#ffffff' },
  { id: 'gray', name: 'Gray', color: '#718087' },
  { id: 'dark', name: 'Dark', color: '#25363d' },
] as const;

export const SPECIAL_THEME_OPTIONS = [
  { id: 'eco-bloom', name: 'Eco Bloom', colors: ['#efffd8', '#8bcf37', '#0e8f78'] },
  { id: 'cyber-glacier', name: 'Cyber Glacier', colors: ['#f5fdff', '#78d8ed', '#596fd1'] },
] as const;

export type ThemeId = (typeof THEME_OPTIONS)[number]['id'];
export type AccentId = (typeof ACCENT_OPTIONS)[number]['id'];
export type SpecialThemeId = (typeof SPECIAL_THEME_OPTIONS)[number]['id'];

export interface AppearanceState {
  theme: ThemeId;
  accent: AccentId;
  activeSpecialTheme?: SpecialThemeId;
  recentSpecialThemes: SpecialThemeId[];
}

export const DEFAULT_APPEARANCE: AppearanceState = {
  theme: 'alba-aero',
  accent: 'default',
  recentSpecialThemes: [],
};

const themeIds = new Set<string>(THEME_OPTIONS.map((theme) => theme.id));
const accentIds = new Set<string>(ACCENT_OPTIONS.map((accent) => accent.id));
const specialThemeIds = new Set<string>(SPECIAL_THEME_OPTIONS.map((theme) => theme.id));

export function addRecentSpecialTheme<T extends string>(
  recent: T[],
  selected: T,
): T[] {
  return [selected, ...recent.filter((id) => id !== selected)].slice(0, 3);
}

export function parseAppearance(value: string | null): AppearanceState {
  if (!value) return DEFAULT_APPEARANCE;

  try {
    const candidate = JSON.parse(value) as Partial<AppearanceState>;
    const theme = typeof candidate.theme === 'string' && themeIds.has(candidate.theme)
      ? candidate.theme as ThemeId
      : DEFAULT_APPEARANCE.theme;
    const accent = typeof candidate.accent === 'string' && accentIds.has(candidate.accent)
      ? candidate.accent as AccentId
      : DEFAULT_APPEARANCE.accent;
    const recentSpecialThemes = Array.isArray(candidate.recentSpecialThemes)
      ? candidate.recentSpecialThemes
          .filter((id): id is SpecialThemeId => typeof id === 'string' && specialThemeIds.has(id))
          .filter((id, index, ids) => ids.indexOf(id) === index)
          .slice(0, 3)
      : [];
    const activeSpecialTheme = typeof candidate.activeSpecialTheme === 'string'
      && specialThemeIds.has(candidate.activeSpecialTheme)
      ? candidate.activeSpecialTheme as SpecialThemeId
      : undefined;

    return {
      theme,
      accent,
      activeSpecialTheme,
      recentSpecialThemes: activeSpecialTheme
        ? addRecentSpecialTheme(recentSpecialThemes, activeSpecialTheme)
        : recentSpecialThemes,
    };
  } catch {
    return DEFAULT_APPEARANCE;
  }
}

export function getSpecialTheme(id: string | undefined) {
  return SPECIAL_THEME_OPTIONS.find((theme) => theme.id === id);
}
