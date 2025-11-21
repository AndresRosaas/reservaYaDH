import Home from './pages/Home';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import ProductDetailPage from './pages/ProductDetailPage';
import AdminPage from './pages/AdminPage';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PrivateRoute from './components/PrivateRoute';
import { FavoritesProvider } from './context/FavoritesContext';
import FavoritePage from './pages/FavoritePage';
import SearchResultsPage from './pages/SearchResultsPage';
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {

  return (
    //Browser Router para manejar las rutas
    <AuthProvider>
      <FavoritesProvider>

        <ToastContainer
          position='top-right'
          autoClose={3000}
          pauseOnHover
          theme='colored'
          newestOnTop
        />

        <BrowserRouter
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true
          }}>
          <Routes>
            {/* Ruta principal */}
            <Route path="/" element={<Home />} />
            <Route path="/products/:id" element={<ProductDetailPage />} />
            <Route path='/administracion' element={<PrivateRoute><AdminPage /></PrivateRoute>} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/registro' element={<RegisterPage />} />
            <Route path="/favoritos" element={<FavoritePage />} />
            <Route path="/busqueda" element={<SearchResultsPage />} />
          </Routes>
        </BrowserRouter>
      </FavoritesProvider>
    </AuthProvider>
  );
};

export default App;
