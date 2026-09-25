import { Search, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { getRecordRoute, searchTaxonomy } from '../data/search';

export function SearchDialog() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const results = searchTaxonomy(query);

  useEffect(() => {
    const openSearch = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLocaleLowerCase('en-US') === 'k') {
        event.preventDefault();
        setOpen(true);
      }
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', openSearch);
    return () => document.removeEventListener('keydown', openSearch);
  }, []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
    else setQuery('');
  }, [open]);

  return (
    <>
      <button className="search-trigger" type="button" onClick={() => setOpen(true)}>
        <Search size={17} aria-hidden="true" />
        <span>Search</span>
      </button>

      {open && (
        <div className="search-backdrop" role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setOpen(false);
        }}>
          <div className="search-dialog" role="dialog" aria-modal="true" aria-label="Search Frutisphere">
            <div className="search-field">
              <Search size={19} aria-hidden="true" />
              <input
                ref={inputRef}
                type="search"
                value={query}
                placeholder="Search names and aliases"
                aria-label="Search names and aliases"
                onChange={(event) => setQuery(event.target.value)}
              />
              <button className="icon-button" type="button" aria-label="Close search" onClick={() => setOpen(false)}>
                <X size={17} aria-hidden="true" />
              </button>
            </div>

            {query.trim() && (
              <div className="search-results" aria-live="polite">
                {results.length > 0 ? results.map((record) => (
                  <Link key={record.id} to={getRecordRoute(record)} onClick={() => setOpen(false)}>
                    <span className="search-result-copy">
                      <strong>{record.name}</strong>
                      {record.aliases.length > 0 && <span>{record.aliases.join(', ')}</span>}
                    </span>
                    <span className="search-result-kind">{record.kind}</span>
                  </Link>
                )) : (
                  <p className="search-empty">No matching names or aliases.</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
