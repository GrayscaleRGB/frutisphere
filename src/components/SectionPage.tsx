import { ArrowLeft } from 'lucide-react';
import { useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { getRecords, taxonomyBySlug } from '../data/taxonomy';
import { writeSectionScroll } from '../lib/sectionScroll';
import { AestheticTile } from './AestheticTile';
import { Header } from './Header';

function useSectionScrollTracking(sectionSlug: string | undefined) {
  useEffect(() => {
    if (!sectionSlug) return;

    let frame: number | undefined;
    let pendingScrollY = window.scrollY;

    const saveScroll = () => {
      pendingScrollY = window.scrollY;
      if (frame !== undefined) return;
      frame = window.requestAnimationFrame(() => {
        writeSectionScroll(sectionSlug, pendingScrollY);
        frame = undefined;
      });
    };

    window.addEventListener('scroll', saveScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', saveScroll);
      if (frame !== undefined) window.cancelAnimationFrame(frame);
      writeSectionScroll(sectionSlug, pendingScrollY);
    };
  }, [sectionSlug]);
}

export function SectionPage() {
  const { sectionSlug } = useParams();
  const section = sectionSlug ? taxonomyBySlug.get(sectionSlug) : undefined;
  useSectionScrollTracking(section?.level === 2 ? section.slug : undefined);

  if (!section || section.level !== 2) return <Navigate to="/" replace />;

  const children = getRecords(section.childIds).filter((record) => record.level === 3);
  const childLabel = section.kind === 'Family' ? 'subcategories' : 'categories';

  return (
    <div className="app-shell section-shell">
      <div className="aero-ribbon aero-ribbon-one" aria-hidden="true" />
      <div className="aero-ribbon aero-ribbon-two" aria-hidden="true" />
      <Header />
      <main className="section-page">
        <Link className="back-link" to="/explore">
          <ArrowLeft size={17} aria-hidden="true" />
          Back to explorer
        </Link>
        <header className="section-heading">
          <p className="eyebrow">{section.kind}</p>
          <h1>{section.name}</h1>
          {section.summary && <p>{section.summary}</p>}
          <span className="result-count">{children.length} {childLabel}</span>
        </header>
        <div className="aesthetic-grid">
          {children.map((record) => (
            <AestheticTile key={record.id} record={record} />
          ))}
        </div>
      </main>
    </div>
  );
}
