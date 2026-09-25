import { ImageIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Header } from './Header';
import { SiteFooter } from './SiteFooter';

const futureMetrics = [
  'Site visits',
  'Accounts created',
  'Users online',
];

export function HomePage() {
  return (
    <div className="app-shell home-shell">
      <div className="aero-ribbon aero-ribbon-one" aria-hidden="true" />
      <div className="aero-ribbon aero-ribbon-two" aria-hidden="true" />
      <Header />
      <main className="home-page">
        <section className="home-portal-frame" aria-labelledby="home-heading">
          <header className="home-portal-titlebar">
            <span className="panel-status-light" aria-hidden="true" />
            <span>Frutisphere Home Console</span>
            <span className="panel-code">v0.1</span>
          </header>
          <div className="home-portal-body">
            <section className="home-hero">
              <div className="home-logo-placeholder" aria-label="Temporary Frutisphere logo placeholder">
                <ImageIcon size={38} strokeWidth={1.8} aria-hidden="true" />
                <span>Logo placeholder</span>
              </div>
              <div className="home-title-console">
                <span className="console-label">Frutisphere portal</span>
                <p className="eyebrow">Visual atlas and future community</p>
                <h1 id="home-heading">Frutisphere</h1>
                <p className="home-lead">
                  Explore and document the connected visual world around Frutiger Aero.
                </p>
                <Link className="primary-action" to="/explore">
                  <span aria-hidden="true">&#9654;</span>
                  Open the atlas
                </Link>
              </div>
            </section>

            <div className="portal-workspace">
              <section className="portal-panel welcome-panel" aria-labelledby="welcome-heading">
                <div className="portal-section-heading">
                  <span className="compact-label">Welcome</span>
                  <h2 id="welcome-heading">Welcome to Frutisphere</h2>
                </div>
                <div className="portal-panel-body welcome-panel-body">
                  <strong>Atlas terminal ready.</strong>
                  <p>
                    Begin with Explore to browse Frutiger Aero, Vectordelia, and related categories,
                    or use Search to jump directly to a known name or alias.
                  </p>
                </div>
              </section>

              <section className="portal-panel atlas-panel" aria-labelledby="purpose-heading">
                <div className="portal-section-heading">
                  <span className="compact-label">Information</span>
                  <h2 id="purpose-heading">What is Frutisphere?</h2>
                </div>
                <div className="portal-panel-body">
                  <h3>Visual and documentation atlas</h3>
                  <p>
                    Frutisphere organizes families, categories, subcategories, aliases, and
                    relationships into a browsable visual taxonomy. It is designed as an interactive
                    reference for navigating the wider Frutiger ecosystem.
                  </p>
                  <dl className="portal-facts">
                    <div><dt>Mode</dt><dd>Visual reference</dd></div>
                    <div><dt>Archive</dt><dd>Pending review</dd></div>
                    <div><dt>Version</dt><dd>v0.1</dd></div>
                  </dl>
                </div>
              </section>

              <section className="portal-panel community-panel" aria-labelledby="community-heading">
                <div className="portal-section-heading">
                  <span className="compact-label">Planned</span>
                  <h2 id="community-heading">Future community space</h2>
                </div>
                <div className="portal-panel-body">
                  <p>
                    Frutisphere is intended to grow into a community-oriented space around the atlas.
                    Accounts and participation are planned for a later phase and are not active in
                    this prototype.
                  </p>
                  <p className="system-message"><strong>System status:</strong> Community features offline</p>
                </div>
              </section>

              <section className="portal-panel status-panel" aria-labelledby="stats-heading">
                <div className="portal-section-heading status-section-heading">
                  <div>
                    <span className="compact-label">Status</span>
                    <h2 id="stats-heading">Site status / future metrics</h2>
                  </div>
                  <span className="status-readout"><span className="panel-status-light is-standby" aria-hidden="true" /> No data</span>
                </div>
                <div className="portal-panel-body status-panel-body">
                  <p className="status-notice">No live account, traffic, or presence data is connected in v0.1.</p>
                  <div className="stats-grid">
                    {futureMetrics.map((label) => (
                      <div className="stat-placeholder" key={label}>
                        <span>{label}</span>
                        <strong aria-label={`${label}: not available`}>--</strong>
                        <small>Future metric</small>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
