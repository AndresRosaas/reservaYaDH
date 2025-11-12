import Home from './pages/Home';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import ProductDetailPage from './pages/ProductDetailPage';
import AdminPage from './pages/AdminPage';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PrivateRoute from './components/PrivateRoute';

function App() {

  return (
    //Browser Router para manejar las rutas
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Ruta principal */}
          <Route path="/" element={<Home />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path='/administracion' element={<PrivateRoute><AdminPage /></PrivateRoute>} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/registro' element={<RegisterPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
