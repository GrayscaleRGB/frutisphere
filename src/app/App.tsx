import { Navigate, Route, Routes } from 'react-router-dom';
import { ExplorerPage } from '../components/ExplorerPage';
import { SectionPage } from '../components/SectionPage';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<ExplorerPage />} />
      <Route path="/section/:sectionSlug" element={<SectionPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
