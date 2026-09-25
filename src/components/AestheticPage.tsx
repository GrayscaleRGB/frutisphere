import { ArrowLeft, ChevronRight } from 'lucide-react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { getRecords, taxonomyById, taxonomyBySlug } from '../data/taxonomy';
import { AestheticTile } from './AestheticTile';
import { Header } from './Header';

export function AestheticPage() {
  const { aestheticSlug } = useParams();
  const record = aestheticSlug ? taxonomyBySlug.get(aestheticSlug) : undefined;

  if (!record || record.level === 2) return <Navigate to="/" replace />;

  const section = taxonomyById.get(record.section);
  const parents = getRecords(record.parentIds).filter((parent) => parent.level !== 2);
  const children = getRecords(record.childIds);
  const related = getRecords(record.relatedIds);
  const backTarget = parents[0] ?? section;
  const hasAtAGlance = Boolean(
    record.kind || record.status || record.origin || record.era || record.aliases.length,
  );

  return (
    <div className="app-shell aesthetic-shell">
      <div className="aero-ribbon aero-ribbon-one" aria-hidden="true" />
      <div className="aero-ribbon aero-ribbon-two" aria-hidden="true" />
      <Header />
      <main className="aesthetic-page">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <ol>
            <li>
              <Link to="/">Explorer</Link>
            </li>
            {section && (
              <li>
                <ChevronRight size={14} aria-hidden="true" />
                <Link to={`/section/${section.slug}`}>{section.name}</Link>
              </li>
            )}
            {parents.map((parent) => (
              <li key={parent.id}>
                <ChevronRight size={14} aria-hidden="true" />
                <Link to={`/aesthetic/${parent.slug}`}>{parent.name}</Link>
              </li>
            ))}
            <li aria-current="page">
              <ChevronRight size={14} aria-hidden="true" />
              <span>{record.name}</span>
            </li>
          </ol>
        </nav>

        {backTarget && (
          <Link
            className="back-link"
            to={
              backTarget.level === 2
                ? `/section/${backTarget.slug}`
                : `/aesthetic/${backTarget.slug}`
            }
          >
            <ArrowLeft size={17} aria-hidden="true" />
            Back to {backTarget.name}
          </Link>
        )}

        <header className="identity-header">
          <img
            className="identity-placeholder"
            src={(record.heroImage ?? record.tileImage).src}
            alt={(record.heroImage ?? record.tileImage).alt}
            draggable="false"
          />
          <div className="identity-copy">
            <p className="eyebrow">{record.kind}</p>
            <h1>{record.name}</h1>
            {record.aliases.length > 0 && (
              <p className="alias-line">Also known as {record.aliases.join(', ')}</p>
            )}
            {record.summary && <p className="identity-summary">{record.summary}</p>}
          </div>
        </header>

        <div className="aesthetic-content">
          {record.overview && (
            <section className="content-section" aria-labelledby="overview-heading">
              <h2 id="overview-heading">Overview</h2>
              <p>{record.overview}</p>
            </section>
          )}

          {hasAtAGlance && (
            <section className="content-section" aria-labelledby="glance-heading">
              <h2 id="glance-heading">At a Glance</h2>
              <dl className="fact-list">
                <div>
                  <dt>Classification</dt>
                  <dd>{record.kind}</dd>
                </div>
                {record.status && (
                  <div>
                    <dt>Status</dt>
                    <dd>{record.status}</dd>
                  </div>
                )}
                {record.origin && (
                  <div>
                    <dt>Origin</dt>
                    <dd>{record.origin}</dd>
                  </div>
                )}
                {record.era && (
                  <div>
                    <dt>Era</dt>
                    <dd>{record.era}</dd>
                  </div>
                )}
                {record.aliases.length > 0 && (
                  <div>
                    <dt>Aliases</dt>
                    <dd>{record.aliases.join(', ')}</dd>
                  </div>
                )}
              </dl>
            </section>
          )}

          {record.motifs && record.motifs.length > 0 && (
            <section className="content-section" aria-labelledby="characteristics-heading">
              <h2 id="characteristics-heading">Defining Characteristics</h2>
              <ul className="characteristic-list">
                {record.motifs.map((motif) => (
                  <li key={motif}>{motif}</li>
                ))}
              </ul>
            </section>
          )}

          {record.classificationNotes && (
            <section className="content-section" aria-labelledby="classification-heading">
              <h2 id="classification-heading">Classification Notes</h2>
              <p>{record.classificationNotes}</p>
            </section>
          )}

          {children.length > 0 && (
            <section className="content-section" aria-labelledby="subcategories-heading">
              <h2 id="subcategories-heading">Subcategories</h2>
              <div className="subcategory-grid">
                {children.map((child) => (
                  <AestheticTile key={child.id} record={child} />
                ))}
              </div>
            </section>
          )}

          {related.length > 0 && (
            <section className="content-section" aria-labelledby="relationships-heading">
              <h2 id="relationships-heading">Relationships</h2>
              <ul className="relationship-list">
                {related.map((relation) => (
                  <li key={relation.id}>
                    {relation.level === 2 ? (
                      <Link to={`/section/${relation.slug}`}>{relation.name}</Link>
                    ) : (
                      <Link to={`/aesthetic/${relation.slug}`}>{relation.name}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {record.galleryImages && record.galleryImages.length > 0 && (
            <section className="content-section" aria-labelledby="gallery-heading">
              <h2 id="gallery-heading">Gallery</h2>
              <div className="gallery-grid">
                {record.galleryImages.map((image) => (
                  <img key={image.src} src={image.src} alt={image.alt} />
                ))}
              </div>
            </section>
          )}

          {record.sources.length > 0 && (
            <section className="content-section" aria-labelledby="sources-heading">
              <h2 id="sources-heading">Sources</h2>
              <ul className="source-list">
                {record.sources.map((source) => (
                  <li key={source}>{source}</li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}
