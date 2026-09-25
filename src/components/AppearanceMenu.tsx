import { Check, Palette, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useAppearance } from '../appearance/AppearanceContext';
import {
  ACCENT_OPTIONS,
  getSpecialTheme,
  THEME_OPTIONS,
} from '../appearance/appearance';

export function AppearanceMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const {
    theme,
    accent,
    activeSpecialTheme,
    recentSpecialThemes,
    setTheme,
    setAccent,
    activateSpecialTheme,
  } = useAppearance();

  useEffect(() => {
    if (!open) return;

    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };

    document.addEventListener('pointerdown', closeOnOutsideClick);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('pointerdown', closeOnOutsideClick);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [open]);

  const recentThemes = recentSpecialThemes.flatMap((id) => {
    const option = getSpecialTheme(id);
    return option ? [option] : [];
  });

  return (
    <div className="appearance-control" ref={menuRef}>
      <button
        className="appearance-trigger"
        type="button"
        aria-expanded={open}
        aria-controls="appearance-panel"
        onClick={() => setOpen((current) => !current)}
      >
        <Palette size={17} aria-hidden="true" />
        <span>Appearance</span>
      </button>

      {open && (
        <div className="appearance-panel" id="appearance-panel" role="dialog" aria-label="Appearance settings">
          <div className="appearance-panel-heading">
            <div>
              <strong>Appearance</strong>
              <span>Theme and accent are independent.</span>
            </div>
            <button className="icon-button" type="button" aria-label="Close appearance settings" onClick={() => setOpen(false)}>
              <X size={17} aria-hidden="true" />
            </button>
          </div>

          <section className="appearance-section" aria-labelledby="quick-themes-heading">
            <h2 id="quick-themes-heading">Quick Access</h2>
            <div className="theme-options">
              {THEME_OPTIONS.map((option) => {
                const selected = theme === option.id && !activeSpecialTheme;
                return (
                  <button
                    className={`theme-option${selected ? ' is-active' : ''}`}
                    type="button"
                    key={option.id}
                    aria-pressed={selected}
                    onClick={() => setTheme(option.id)}
                  >
                    <span className="theme-preview" aria-hidden="true">
                      {option.colors.map((color) => <span key={color} style={{ background: color }} />)}
                    </span>
                    <span>{option.name}</span>
                    {selected && <Check className="selection-check" size={15} aria-hidden="true" />}
                  </button>
                );
              })}
            </div>
          </section>

          <section className="appearance-section" aria-labelledby="accent-heading">
            <h2 id="accent-heading">Accent</h2>
            <div className="accent-options">
              {ACCENT_OPTIONS.map((option) => (
                <button
                  className={`accent-option${accent === option.id ? ' is-active' : ''}`}
                  type="button"
                  key={option.id}
                  aria-label={option.name}
                  title={option.name}
                  aria-pressed={accent === option.id}
                  style={{ background: option.color }}
                  onClick={() => setAccent(option.id)}
                >
                  {accent === option.id && <Check size={14} aria-hidden="true" />}
                </button>
              ))}
            </div>
          </section>

          {recentThemes.length > 0 && (
            <section className="appearance-section" aria-labelledby="recent-themes-heading">
              <h2 id="recent-themes-heading">Recent</h2>
              <div className="recent-theme-options">
                {recentThemes.map((option) => (
                  <button
                    className={activeSpecialTheme === option.id ? 'is-active' : ''}
                    type="button"
                    key={option.id}
                    aria-pressed={activeSpecialTheme === option.id}
                    onClick={() => activateSpecialTheme(option.id)}
                  >
                    <span className="recent-theme-swatch" aria-hidden="true" style={{ background: `linear-gradient(135deg, ${option.colors.join(', ')})` }} />
                    <span>{option.name}</span>
                  </button>
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
