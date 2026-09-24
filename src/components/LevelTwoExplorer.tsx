import { useLayoutEffect, useRef, useState, type RefObject } from 'react';
import { getLevelTwoRecords, type TaxonomyRecord } from '../data/taxonomy';

const preferredOrder = ['vectordelia', 'frutiger-aero', 'more'];
const sections = getLevelTwoRecords().sort(
  (a, b) => preferredOrder.indexOf(a.id) - preferredOrder.indexOf(b.id),
);

interface LevelTwoTileProps {
  record: TaxonomyRecord;
  selected: boolean;
  onSelect: (id: string) => void;
  tileRef?: RefObject<HTMLButtonElement | null>;
}

function LevelTwoTile({ record, selected, onSelect, tileRef }: LevelTwoTileProps) {
  return (
    <button
      ref={tileRef}
      className={`level-two-tile${selected ? ' is-selected' : ''}`}
      type="button"
      aria-pressed={selected}
      onClick={() => onSelect(record.id)}
      onFocus={() => onSelect(record.id)}
    >
      <img
        className="tile-image"
        src={record.tileImage.src}
        alt={record.tileImage.alt}
        draggable="false"
      />
      <span className="tile-title">{record.name}</span>
    </button>
  );
}

export function LevelTwoExplorer() {
  const [selectedId, setSelectedId] = useState('frutiger-aero');
  const carouselRef = useRef<HTMLDivElement>(null);
  const centerTileRef = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    const carousel = carouselRef.current;
    const centerTile = centerTileRef.current;
    if (!carousel || !centerTile || window.matchMedia('(min-width: 761px)').matches) return;

    carousel.scrollLeft = centerTile.offsetLeft - (carousel.clientWidth - centerTile.clientWidth) / 2;
  }, []);

  return (
    <section className="explorer" aria-labelledby="explorer-heading">
      <div className="explorer-intro">
        <p className="eyebrow">Interactive visual atlas</p>
        <h1 id="explorer-heading">Choose a path to explore</h1>
        <p className="intro-copy">
          Three paths into the connected visual world around Frutiger Aero.
        </p>
      </div>

      <div className="level-two-carousel" ref={carouselRef}>
        {sections.map((record) => (
          <LevelTwoTile
            key={record.id}
            record={record}
            selected={record.id === selectedId}
            onSelect={setSelectedId}
            tileRef={record.id === 'frutiger-aero' ? centerTileRef : undefined}
          />
        ))}
      </div>
      <div className="carousel-dots" aria-hidden="true">
        {sections.map((record) => (
          <span key={record.id} className={record.id === selectedId ? 'is-active' : ''} />
        ))}
      </div>
    </section>
  );
}
