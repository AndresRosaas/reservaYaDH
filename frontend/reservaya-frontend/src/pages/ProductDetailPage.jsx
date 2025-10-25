import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import MainLayout from '../components/layout/MainLayout';
import './ProductDetailPage.css';
import ProductDetail from '../components/products/ProductDetail';
import ProductGallery from '../components/products/ProductGallery';


//Esta pagina se activa cuando entras a /product/:id

const ProductDetailPage = () => {
    //Uso useparams para obtener el id del producto desde la URL
    const { id } = useParams();
    const navigate = useNavigate();//Con esto puedo navegar programaticamente

    const [product, setProduct] = useState(null);//Estado para guardar la info del producto
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    //useeffect se ejecuta cuando el componente se carga
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const response = await api.get(`/products/${id}`);//Llamo a la API para obtener el producto por id
                setProduct(response.data);
                setError(null);
            } catch (err) {
                setError('Producto no encontrado.');
                console.error('Error: ', err);

            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);//El efecto se vuelve a ejecutar si el id cambia


    const handleBack = () => {
        navigate('/'); //Navega a la ruta "/"
    };

    if (loading) {
        return (
            <MainLayout>
                <div className="loading">Cargando producto...</div>
            </MainLayout>
        );
    }
    //Si hay un error, muestro el mensaje de error
    if (error || !product) {
        return (
            <MainLayout>
                <div className="error">
                    <p>{error || 'Producto no encontrado.'}</p>
                    <button className="btn btn-outline" onClick={handleBack}>← Volver al menu</button>
                </div>
                <button onClick={handleBack} className="back-button">Volver</button>
            </MainLayout>
        );
    }
    //Si todo va bien, muestro la info del producto
    return (
        <MainLayout>
            <div className="product-detail-page">

                <div className='product-detail-body'>
                    <ProductDetail product={product} />
                </div>
            </div>
        </MainLayout>
    );
};
export default ProductDetailPage;

