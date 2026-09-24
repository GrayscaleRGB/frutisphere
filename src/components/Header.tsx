import { Compass } from 'lucide-react';

export function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="#/" aria-label="Frutisphere explorer home">
        <span className="brand-mark" aria-hidden="true">
          <Compass size={18} strokeWidth={2.4} />
        </span>
        <span>Frutisphere</span>
      </a>
      <nav aria-label="Primary navigation">
        <a className="nav-link is-current" href="#/" aria-current="page">
          Explore
        </a>
      </nav>
      <span className="version-label">v0.1</span>
    </header>
  );
}
