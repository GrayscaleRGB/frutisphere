import { Compass, Home } from 'lucide-react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { getAssetUrl } from '../lib/assets';
import { AppearanceMenu } from './AppearanceMenu';
import { SearchDialog } from './SearchDialog';

export function Header() {
  const { pathname } = useLocation();
  const exploreArea = pathname === '/explore'
    || pathname.startsWith('/section/')
    || pathname.startsWith('/aesthetic/');

  return (
    <header className="site-header">
      <Link className="brand" to="/" aria-label="Frutisphere home">
        <img
          className="brand-logo"
          src={getAssetUrl('/assets/branding/frutisphere-logo.png')}
          alt=""
          aria-hidden="true"
        />
        <span className="brand-name">Frutisphere</span>
      </Link>
      <nav className="header-tabs" aria-label="Primary navigation">
        <NavLink className={({ isActive }) => `nav-link${isActive ? ' is-current' : ''}`} to="/" end>
          <Home size={16} aria-hidden="true" />
          <span>Home</span>
        </NavLink>
        <Link
          className={`nav-link${exploreArea ? ' is-current' : ''}`}
          to="/explore"
          aria-current={exploreArea ? 'page' : undefined}
        >
          <Compass size={16} aria-hidden="true" />
          Explore
        </Link>
        <SearchDialog />
        <AppearanceMenu />
      </nav>
      <span className="version-label">v0.1</span>
    </header>
  );
}
