import { Compass } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { AppearanceMenu } from './AppearanceMenu';
import { SearchDialog } from './SearchDialog';

export function Header() {
  return (
    <header className="site-header">
      <NavLink className="brand" to="/" aria-label="Frutisphere explorer home">
        <span className="brand-mark" aria-hidden="true">
          <Compass size={18} strokeWidth={2.4} />
        </span>
        <span>Frutisphere</span>
      </NavLink>
      <nav aria-label="Primary navigation">
        <NavLink className={({ isActive }) => `nav-link${isActive ? ' is-current' : ''}`} to="/" end>
          Explore
        </NavLink>
      </nav>
      <SearchDialog />
      <AppearanceMenu />
      <span className="version-label">v0.1</span>
    </header>
  );
}
