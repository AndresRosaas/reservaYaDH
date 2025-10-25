import Home from './pages/Home';
import {Route, Routes, BrowserRouter } from 'react-router-dom';
import ProductDetailPage from './pages/ProductDetailPage';
import AdminPage from './pages/AdminPage';

function App() {

  return (
    //Browser Router para manejar las rutas
    <BrowserRouter>
      <Routes>
        {/* Ruta principal */}
        <Route path="/" element={<Home />} />
        <Route path="/products/:id" element={<ProductDetailPage/>} />
        <Route path='/administracion' element={<AdminPage/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
