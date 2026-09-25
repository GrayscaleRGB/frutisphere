import { BarChart3, BookOpen, ImageIcon, Radio, UserRoundPlus, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Header } from './Header';
import { SiteFooter } from './SiteFooter';

const futureMetrics = [
  { label: 'Site visits', icon: BarChart3 },
  { label: 'Accounts created', icon: UserRoundPlus },
  { label: 'Users online', icon: Radio },
];

export function HomePage() {
  return (
    <div className="app-shell home-shell">
      <div className="aero-ribbon aero-ribbon-one" aria-hidden="true" />
      <div className="aero-ribbon aero-ribbon-two" aria-hidden="true" />
      <Header />
      <main className="home-page">
        <section className="home-hero" aria-labelledby="home-heading">
          <div className="home-logo-placeholder" aria-label="Temporary Frutisphere logo placeholder">
            <ImageIcon size={38} strokeWidth={1.8} aria-hidden="true" />
            <span>Logo placeholder</span>
          </div>
          <p className="eyebrow">Visual atlas and future community</p>
          <h1 id="home-heading">Frutisphere</h1>
          <p className="home-lead">
            An interactive home for exploring and documenting the connected visual world around
            Frutiger Aero.
          </p>
          <Link className="primary-action" to="/explore">
            <BookOpen size={18} aria-hidden="true" />
            Open the atlas
          </Link>
        </section>

        <section className="home-band home-purpose" aria-labelledby="purpose-heading">
          <div className="home-section-heading">
            <p className="eyebrow">Purpose</p>
            <h2 id="purpose-heading">A connected reference, built to grow</h2>
          </div>
          <div className="purpose-columns">
            <article>
              <BookOpen size={22} aria-hidden="true" />
              <h3>Visual and documentation atlas</h3>
              <p>
                Frutisphere organizes families, categories, subcategories, aliases, and
                relationships into a browsable visual taxonomy.
              </p>
            </article>
            <article>
              <Users size={22} aria-hidden="true" />
              <h3>Future community space</h3>
              <p>
                Later phases may add accounts and community participation around the atlas.
                Those systems are planned, not active in this prototype.
              </p>
            </article>
          </div>
        </section>

        <section className="home-band home-stats" aria-labelledby="stats-heading">
          <div className="home-section-heading">
            <p className="eyebrow">Community systems</p>
            <h2 id="stats-heading">Future metrics</h2>
            <p>No live account, traffic, or presence data is connected in v0.1.</p>
          </div>
          <div className="stats-grid">
            {futureMetrics.map(({ label, icon: Icon }) => (
              <div className="stat-placeholder" key={label}>
                <Icon size={20} aria-hidden="true" />
                <strong aria-label={`${label}: not available`}>--</strong>
                <span>{label}</span>
                <small>Future metric</small>
              </div>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
