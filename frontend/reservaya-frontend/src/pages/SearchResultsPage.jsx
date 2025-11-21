import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from 'react-router-dom';
import ProductCard from '../components/products/ProductCard'
import api from "../services/api";
import "./SearchResults.css";


const SearchResults = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    //obtengo parametros de busqueda
    const location = searchParams.get('location');
    const checkIn = searchParams.get('startDate');
    const checkOut = searchParams.get('endDate');


    useEffect(() => {
        searchProducts();
    }, [searchParams]);

    const searchProducts = async () => {
        try {
            setLoading(true);
            setError(null);

            console.log('🔍 Buscando con parámetros:', { location, checkIn, checkOut });
            const response = await api.get('/products/search', {
                params: {
                    location,
                    checkIn,
                    checkOut
                }
            });
            setProducts(response.data)

        } catch (error) {
            console.error('Error al buscar', error);
            setError('Error al buscar productos. Intente nuevamente.');

            //si falla la busqueda traigo todos los productos
            try {
                const fallResponse = await api.get('/products');
                setProducts(fallResponse.data);
            } catch (fallError) {
                setProducts([]);

            }

        } finally {
            setLoading(false);
        }
    };
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('es-Es', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    const calculateNights = () => {
        if (!checkIn || !checkOut) return null;
        const start = new Date(checkIn);
        const end = new Date(checkOut);
        const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
        return nights > 0 ? nights : null;
    };

    if (loading) {
        return (
            <div className="search-results">
                <div className="results-header">
                    <div className="spinner"></div>
                    <p>Buscando productos disponibles...</p>
                </div>
            </div>
        );
    }
    const nights = calculateNights();

    return (
        <div className="search-results">
            <div className="results-header">
                <button
                    className="btn btn-outline"
                    onClick={() => navigate('/')}
                >
                    ← Nueva búsqueda
                </button>
                <div className="search-summary">
                    <h1>Resultados de busqueda</h1>
                    <div className="search-details">
                        {location && (
                            <span className="detail-item">
                                Ubicación: {location}
                            </span>
                        )}
                        {checkIn && checkOut && (
                            <span className="detail-item">
                                📅 {formatDate(checkIn)} - {formatDate(checkOut)}
                                {nights && `(${nights} ${nights === 1 ? 'noche' : ' noches'})`}
                            </span>
                        )}
                    </div>
                    <p className="results-count">
                        {products.length === 0
                            ? 'No se encontraron productos'
                            : `${products.length} ${products.length === 1 ? 'productos' : 'productos'} encontrados`}
                    </p>
                </div>
            </div>
            {error && (
                <div className="error-banner">
                    <p>{error}</p>
                </div>
            )}
            {products.length === 0 ? (
                <div className="no-results">
                    <div className="no-results-icon">🔍</div>
                    <h2>No se encontraron productos</h2>
                    <p>Intenta modificar tus criterios de busqueda</p>
                    <ul className="suggestions-list">
                        <li>Proba con otras fechas</li>
                        <li>Busca en otra ubicacion</li>
                        <li>Amplia el rango de fechas</li>
                    </ul>
                    <button className="btn btn-primary" onClick={() => navigate('/')}>
                        Volver al inicio
                    </button>
                </div>
            ) : (
                <div className="products-grid">
                    {products.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
};
export default SearchResults;
