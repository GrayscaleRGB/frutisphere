import { Header } from './Header';
import { LevelTwoExplorer } from './LevelTwoExplorer';
import { SiteFooter } from './SiteFooter';

export function ExplorerPage() {
  return (
    <div className="app-shell">
      <div className="aero-ribbon aero-ribbon-one" aria-hidden="true" />
      <div className="aero-ribbon aero-ribbon-two" aria-hidden="true" />
      <Header />
      <main>
        <LevelTwoExplorer />
      </main>
      <SiteFooter />
    </div>
  );
}
