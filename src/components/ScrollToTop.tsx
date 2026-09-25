import { useEffect, useLayoutEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';
import {
  getSectionSlug,
  readSectionScroll,
  shouldRestoreSectionScroll,
  writeSectionScroll,
} from '../lib/sectionScroll';

export function ScrollToTop() {
  const { key, pathname } = useLocation();
  const navigationType = useNavigationType();
  const previousPathnameRef = useRef<string | undefined>(undefined);
  const handledLocationKeyRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    const previous = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';
    return () => {
      window.history.scrollRestoration = previous;
    };
  }, []);

  useLayoutEffect(() => {
    if (handledLocationKeyRef.current === key) return;

    const sectionSlug = getSectionSlug(pathname);
    const restore = sectionSlug && shouldRestoreSectionScroll({
      destinationSection: sectionSlug,
      previousPathname: previousPathnameRef.current,
      navigationType,
    });
    const scrollY = restore && sectionSlug ? readSectionScroll(sectionSlug) : 0;

    window.scrollTo({ top: scrollY, left: 0, behavior: 'auto' });
    if (sectionSlug && !restore) writeSectionScroll(sectionSlug, 0);

    previousPathnameRef.current = pathname;
    handledLocationKeyRef.current = key;
  }, [key, navigationType, pathname]);

  return null;
}
