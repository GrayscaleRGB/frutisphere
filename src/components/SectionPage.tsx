import { ArrowLeft } from 'lucide-react';
import { Link, Navigate, useParams } from 'react-router-dom';
import {
  getRecords,
  taxonomyBySlug,
  type TaxonomyRecord,
} from '../data/taxonomy';
import { Header } from './Header';

function GridTile({ record }: { record: TaxonomyRecord }) {
  return (
    <article className="grid-tile">
      <img
        className="grid-tile-image"
        src={record.tileImage.src}
        alt={record.tileImage.alt}
        draggable="false"
      />
      <h2>{record.name}</h2>
    </article>
  );
}

export function SectionPage() {
  const { sectionSlug } = useParams();
  const section = sectionSlug ? taxonomyBySlug.get(sectionSlug) : undefined;

  if (!section || section.level !== 2) return <Navigate to="/" replace />;

  const children = getRecords(section.childIds).filter((record) => record.level === 3);

  return (
    <div className="app-shell section-shell">
      <div className="aero-ribbon aero-ribbon-one" aria-hidden="true" />
      <div className="aero-ribbon aero-ribbon-two" aria-hidden="true" />
      <Header />
      <main className="section-page">
        <Link className="back-link" to="/">
          <ArrowLeft size={17} aria-hidden="true" />
          Back to explorer
        </Link>
        <header className="section-heading">
          <p className="eyebrow">{section.kind}</p>
          <h1>{section.name}</h1>
          {section.summary && <p>{section.summary}</p>}
          <span className="result-count">{children.length} categories</span>
        </header>
        <div className="aesthetic-grid">
          {children.map((record) => (
            <GridTile key={record.id} record={record} />
          ))}
        </div>
      </main>
    </div>
  );
}
