import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './styles/app.scss';

import HomePage from './pages/HomePage';
import ClientListPage from './pages/ClientListPage';
import ProjectionAnalysisPage from './pages/ProjectionAnalysisPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/listar-clientes" element={<ClientListPage />} />
        <Route
          path="/proyeccion-analisis"
          element={<ProjectionAnalysisPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
