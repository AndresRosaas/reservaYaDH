import { useFavorites } from '../../hooks/useFavorite';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../products/ProductCard';
import './MyDataSection.css';

function MyFavoriteSection() {
    const { favorites, loading } = useFavorites();
    const navigate = useNavigate();

    const handleProductClick = (productId) => {
        navigate(`/products/${productId}`);
    };

    if (loading) {
        return (
            <div className='section-loading'>
                <p>Cargando...</p>
            </div>
        );
    }

    return (

        <div className="profile-section">

            <div className='my-favorites-section'>
                <div className='section-header'>
                    <h2>Mis Favoritos</h2>
                    <p className='section-subtitle'>
                        {favorites.length === 0
                            ? 'Aun no tenes favoritos'
                            : `${favorites.length} ${favorites.length === 1 ? 'favorito' : 'favoritos'}`
                        }
                    </p>
                </div>

                {favorites.length === 0 ? (
                    <div className='empty-state'>
                        <h3>No tenes favoritos todavia</h3>
                        <p>Explora productos y guarda tus favoritos aca</p>
                        <button
                            className='btn-explore'
                            onClick={() => navigate(`/`)}
                        >
                            Explorar productos
                        </button>
                    </div>
                ) : (
                    <div className='favorites-grid'>
                        {favorites.map(product => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onClick={handleProductClick}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default MyFavoriteSection;