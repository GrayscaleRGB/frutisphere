import { taxonomyBySlug } from '../data/taxonomy';

const STORAGE_PREFIX = 'frutisphere.section-scroll.';

export function getSectionSlug(pathname: string) {
  const match = pathname.match(/^\/section\/([^/]+)\/?$/);
  return match?.[1];
}

export function getAestheticSection(pathname: string) {
  const match = pathname.match(/^\/aesthetic\/([^/]+)\/?$/);
  return match ? taxonomyBySlug.get(match[1])?.section : undefined;
}

export function shouldRestoreSectionScroll({
  destinationSection,
  previousPathname,
  navigationType,
}: {
  destinationSection: string;
  previousPathname?: string;
  navigationType: 'POP' | 'PUSH' | 'REPLACE';
}) {
  if (!previousPathname) return false;
  if (navigationType === 'POP') return true;
  return getAestheticSection(previousPathname) === destinationSection;
}

export function readSectionScroll(sectionSlug: string) {
  try {
    const value = Number.parseFloat(window.sessionStorage.getItem(`${STORAGE_PREFIX}${sectionSlug}`) ?? '');
    return Number.isFinite(value) && value >= 0 ? value : 0;
  } catch {
    return 0;
  }
}

export function writeSectionScroll(sectionSlug: string, scrollY: number) {
  try {
    window.sessionStorage.setItem(
      `${STORAGE_PREFIX}${sectionSlug}`,
      String(Math.max(0, Math.round(scrollY))),
    );
  } catch {
    // Browsing still works when storage is unavailable.
  }
}
