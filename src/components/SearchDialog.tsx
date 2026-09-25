import { Search, X } from 'lucide-react';
import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from 'react';
import { Link } from 'react-router-dom';
import { getRecordRoute, searchTaxonomy } from '../data/search';

export function SearchDialog() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const resultRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const results = searchTaxonomy(query);

  const closeSearch = (restoreFocus = false) => {
    setOpen(false);
    if (restoreFocus) window.requestAnimationFrame(() => triggerRef.current?.focus());
  };

  useEffect(() => {
    const openSearch = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLocaleLowerCase('en-US') === 'k') {
        event.preventDefault();
        setOpen(true);
        window.requestAnimationFrame(() => inputRef.current?.focus());
      }
      if (event.key === 'Escape' && open) closeSearch(true);
    };
    document.addEventListener('keydown', openSearch);
    return () => document.removeEventListener('keydown', openSearch);
  }, [open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
    else setQuery('');
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const handleDialogKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Tab') return;
    const focusable = Array.from(
      event.currentTarget.querySelectorAll<HTMLElement>('input, button, a[href]'),
    );
    const first = focusable[0];
    const last = focusable.at(-1);
    if (!first || !last) return;

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const focusResult = (index: number) => {
    resultRefs.current[index]?.focus();
  };

  return (
    <>
      <button
        ref={triggerRef}
        className="search-trigger"
        type="button"
        aria-label="Search"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        <Search size={17} aria-hidden="true" />
        <span>Search</span>
      </button>

      {open && (
        <div className="search-backdrop" role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget) closeSearch();
        }}>
          <div
            className="search-dialog"
            role="dialog"
            aria-modal="true"
            aria-label="Search Frutisphere"
            onKeyDown={handleDialogKeyDown}
          >
            <div className="search-field">
              <Search size={19} aria-hidden="true" />
              <input
                ref={inputRef}
                type="search"
                value={query}
                placeholder="Search names and aliases"
                aria-label="Search names and aliases"
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'ArrowDown' && results.length > 0) {
                    event.preventDefault();
                    focusResult(0);
                  }
                }}
              />
              <button className="icon-button" type="button" aria-label="Close search" onClick={() => closeSearch(true)}>
                <X size={17} aria-hidden="true" />
              </button>
            </div>

            {query.trim() && (
              <div className="search-results">
                <span className="visually-hidden" role="status">
                  {results.length} {results.length === 1 ? 'result' : 'results'}
                </span>
                {results.length > 0 ? results.map((record, index) => (
                  <Link
                    ref={(element) => { resultRefs.current[index] = element; }}
                    key={record.id}
                    to={getRecordRoute(record)}
                    onClick={() => closeSearch()}
                    onKeyDown={(event) => {
                      if (event.key === 'ArrowDown') {
                        event.preventDefault();
                        focusResult((index + 1) % results.length);
                      } else if (event.key === 'ArrowUp') {
                        event.preventDefault();
                        if (index === 0) inputRef.current?.focus();
                        else focusResult(index - 1);
                      }
                    }}
                  >
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
