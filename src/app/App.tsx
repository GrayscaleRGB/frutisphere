import { Navigate, Route, Routes } from 'react-router-dom';
import { AestheticPage } from '../components/AestheticPage';
import { ExplorerPage } from '../components/ExplorerPage';
import { HomePage } from '../components/HomePage';
import { ScrollToTop } from '../components/ScrollToTop';
import { SectionPage } from '../components/SectionPage';

export function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/explore" element={<ExplorerPage />} />
        <Route path="/section/:sectionSlug" element={<SectionPage />} />
        <Route path="/aesthetic/:aestheticSlug" element={<AestheticPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
