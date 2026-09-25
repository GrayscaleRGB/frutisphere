import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from 'react';
import { Link } from 'react-router-dom';
import { getLevelTwoRecords, type TaxonomyRecord } from '../data/taxonomy';
import { getAssetUrl } from '../lib/assets';
import { getNearestIndex, getProximityWeights } from '../lib/proximity';

const preferredOrder = ['vectordelia', 'frutiger-aero', 'more'];
const sections = getLevelTwoRecords().sort(
  (a, b) => preferredOrder.indexOf(a.id) - preferredOrder.indexOf(b.id),
);

interface LevelTwoTileProps {
  record: TaxonomyRecord;
  selected: boolean;
  onFocus: (id: string) => void;
  setTileRef: (element: HTMLAnchorElement | null) => void;
}

function LevelTwoTile({ record, selected, onFocus, setTileRef }: LevelTwoTileProps) {
  return (
    <Link
      ref={setTileRef}
      className={`level-two-tile${selected ? ' is-selected' : ''}`}
      to={`/section/${record.slug}`}
      aria-label={`Explore ${record.name}`}
      onFocus={() => onFocus(record.id)}
    >
      <img
        className="tile-image"
        src={getAssetUrl(record.tileImage.src)}
        alt={record.tileImage.alt}
        draggable="false"
      />
      <span className="tile-title">{record.name}</span>
    </Link>
  );
}

export function LevelTwoExplorer() {
  const [selectedId, setSelectedId] = useState('frutiger-aero');
  const carouselRef = useRef<HTMLDivElement>(null);
  const tileRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const pointerFrameRef = useRef<number | null>(null);
  const scrollFrameRef = useRef<number | null>(null);

  const setTileSizes = useCallback((weights: number[]) => {
    tileRefs.current.forEach((tile, index) => {
      if (!tile) return;
      const width = 228 + (weights[index] ?? 0.08) * 114;
      tile.style.setProperty('--tile-size', `${width.toFixed(1)}px`);
    });
  }, []);

  const resetDesktopEmphasis = useCallback(() => {
    tileRefs.current.forEach((tile) => tile?.style.removeProperty('--tile-size'));
    setSelectedId('frutiger-aero');
  }, []);

  const emphasizeTile = useCallback(
    (id: string) => {
      const focusedIndex = sections.findIndex((record) => record.id === id);
      if (focusedIndex < 0) return;
      setSelectedId(id);

      if (window.matchMedia('(max-width: 760px)').matches) return;
      setTileSizes(sections.map((_, index) => (index === focusedIndex ? 1 : 0.08)));
    },
    [setTileSizes],
  );

  useLayoutEffect(() => {
    const carousel = carouselRef.current;
    const centerTile = tileRefs.current[1];
    if (!carousel || !centerTile || window.matchMedia('(min-width: 761px)').matches) return;

    carousel.scrollLeft = centerTile.offsetLeft - (carousel.clientWidth - centerTile.clientWidth) / 2;
  }, []);

  useEffect(
    () => () => {
      if (pointerFrameRef.current !== null) cancelAnimationFrame(pointerFrameRef.current);
      if (scrollFrameRef.current !== null) cancelAnimationFrame(scrollFrameRef.current);
    },
    [],
  );

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (
      event.pointerType !== 'mouse' ||
      window.matchMedia('(max-width: 760px)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    const pointer = { x: event.clientX, y: event.clientY };
    if (pointerFrameRef.current !== null) cancelAnimationFrame(pointerFrameRef.current);

    pointerFrameRef.current = requestAnimationFrame(() => {
      const centers = tileRefs.current.flatMap((tile) => {
        if (!tile) return [];
        const rect = tile.getBoundingClientRect();
        return [{ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }];
      });
      if (centers.length !== sections.length) return;

      const influenceRadius = Math.max(320, (carouselRef.current?.clientWidth ?? 960) * 0.42);
      const weights = getProximityWeights(pointer, centers, influenceRadius);
      const nearestIndex = getNearestIndex(pointer, centers);
      setTileSizes(weights);
      setSelectedId(sections[nearestIndex]?.id ?? 'frutiger-aero');
    });
  };

  const handleScroll = () => {
    const carousel = carouselRef.current;
    if (!carousel || !window.matchMedia('(max-width: 760px)').matches) return;
    if (scrollFrameRef.current !== null) cancelAnimationFrame(scrollFrameRef.current);

    scrollFrameRef.current = requestAnimationFrame(() => {
      const viewportCenter = carousel.getBoundingClientRect().left + carousel.clientWidth / 2;
      const centers = tileRefs.current.flatMap((tile) => {
        if (!tile) return [];
        const rect = tile.getBoundingClientRect();
        return [{ x: rect.left + rect.width / 2, y: 0 }];
      });
      const nearestIndex = getNearestIndex({ x: viewportCenter, y: 0 }, centers);
      setSelectedId(sections[nearestIndex]?.id ?? 'frutiger-aero');
    });
  };

  return (
    <section className="explorer" aria-labelledby="explorer-heading">
      <div className="explorer-intro">
        <p className="eyebrow">Interactive visual atlas</p>
        <h1 id="explorer-heading">Choose a path to explore</h1>
        <p className="intro-copy">
          Three paths into the connected visual world around Frutiger Aero.
        </p>
      </div>

      <div
        className="level-two-carousel"
        ref={carouselRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={resetDesktopEmphasis}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
            resetDesktopEmphasis();
          }
        }}
        onScroll={handleScroll}
      >
        {sections.map((record, index) => (
          <LevelTwoTile
            key={record.id}
            record={record}
            selected={record.id === selectedId}
            onFocus={emphasizeTile}
            setTileRef={(element) => {
              tileRefs.current[index] = element;
            }}
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
