import { useFavorites } from "../hooks/useFavorite";
import { useAuth } from "../hooks/useAuth";
import ProductCard from "../components/products/ProductCard";
import './FavoritePage.css';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function FavoritePage() {
    const { favorites, loading: favLoading } = useFavorites();
    const { isAuthenticated, loading: authLoading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        //espero a que authcontext termine de verificar sesion
        if (authLoading) return;

        if (!isAuthenticated()) {
            navigate('/login');
            return;
        }
    }, [authLoading, isAuthenticated, navigate]);


    //cargando
    if (authLoading || favLoading || favorites === null) {
        return (
            <div className="favorites-page">
                <div className="loading">Cargando favoritos...</div>
            </div>
        );
    }
    
    //sin favoritos
    if (favorites.length === 0 || favLoading) {
        return (
            <div className="favorites-page">
                <div className="empty-favorites">
                    <h2>No tienes favoritos aún.</h2>
                    <p>Explora productos y guarda favoritos</p>
                    <button onClick={() => navigate('/')}>Explorar productos</button>
                </div>
            </div>
        )
    }
    return (
        <div className="favorites-page">
            <div className="favorites-header">
                <button onClick={() => navigate('/')}
                    className='btn btn-outline'>
                    ← Volver
                </button>
                <h1>Mis Favoritos {favorites.length}</h1>
            </div>
            <div className="favorite-grid">
                {favorites.map(product => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onClick={(id) => navigate(`/products/${id}`)}
                    />
                ))}
            </div>
        </div>
    );
}
export default FavoritePage;