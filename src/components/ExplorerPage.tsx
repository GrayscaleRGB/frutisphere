import { Header } from './Header';
import { LevelTwoExplorer } from './LevelTwoExplorer';

export function ExplorerPage() {
  return (
    <div className="app-shell">
      <div className="aero-ribbon aero-ribbon-one" aria-hidden="true" />
      <div className="aero-ribbon aero-ribbon-two" aria-hidden="true" />
      <Header />
      <main>
        <LevelTwoExplorer />
      </main>
      <footer className="site-footer">
        <span>Explorer prototype</span>
        <span aria-hidden="true">&#183;</span>
        <span>Archive imagery pending review</span>
      </footer>
    </div>
  );
}
