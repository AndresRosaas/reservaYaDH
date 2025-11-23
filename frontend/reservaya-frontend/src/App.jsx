import Home from './pages/Home';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import ProductDetailPage from './pages/ProductDetailPage';
import AdminPage from './pages/AdminPage';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PrivateRoute from './components/PrivateRoute';
import { FavoritesProvider } from './context/FavoritesContext';
import SearchResultsPage from './pages/SearchResultsPage';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProfilePage from './pages/ProfilePage';
import WhatsAppButton from './components/products/WhatsAppButton';
import ReservationPage from './pages/ReservationPage';
import InfoPage from './pages/InfoPage';

function App() {

  return (
    <>
    
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
              <Route path="/busqueda" element={<SearchResultsPage />} />
              <Route path='/perfil' element={<ProfilePage />} />
              <Route path='/reservation/:id' element={<ReservationPage />} />
              <Route path="/info/:section" element={<InfoPage />} />
            </Routes>
          </BrowserRouter>
        </FavoritesProvider>
      </AuthProvider>
      <WhatsAppButton phone="5492227543724" message='Hola! Quiero hacer una consulta' />
    </>

  );
};

export default App;
