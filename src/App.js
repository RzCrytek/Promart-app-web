import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './styles/app.scss';

import HomePage from './pages/HomePage';
import ClientListPage from './pages/ClientListPage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/listar-clientes" element={<ClientListPage />} />
          <Route path="*" element={<h1>Not Found</h1>}></Route>
        </Routes>
      </BrowserRouter>

      <ToastContainer
        theme="light"
        position={toast.POSITION.TOP_RIGHT}
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
