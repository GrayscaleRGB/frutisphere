import { Link } from 'react-router-dom';
import type { TaxonomyRecord } from '../data/taxonomy';

interface AestheticTileProps {
  record: TaxonomyRecord;
}

export function AestheticTile({ record }: AestheticTileProps) {
  return (
    <Link
      className="grid-tile"
      to={`/aesthetic/${record.slug}`}
      aria-label={`Open ${record.name}`}
    >
      <img
        className="grid-tile-image"
        src={record.tileImage.src}
        alt={record.tileImage.alt}
        draggable="false"
      />
      <span className="grid-tile-title">{record.name}</span>
    </Link>
  );
}
