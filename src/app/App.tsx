import { Route, Routes } from 'react-router-dom';
import { ExplorerPage } from '../components/ExplorerPage';

export function App() {
  return (
    <Routes>
      <Route path="*" element={<ExplorerPage />} />
    </Routes>
  );
}
