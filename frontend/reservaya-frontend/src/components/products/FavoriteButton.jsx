import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "../../hooks/useFavorite";
import { useAuth } from "../../context/AuthContext";
import './FavoriteButton.css';
import { toast } from "react-toastify";


function FavoriteButton({ productId, showLabel = false }){
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const { isFavorite, toggleFavorite } = useFavorites();
    const [loading, setIsLoading] = useState(false);

    const favorite = isFavorite(productId);

    const handleClick = async (e) => {
        e.stopPropagation();
        e.preventDefault();

        if (!isAuthenticated()) {
            navigate('/login');
            return;
        }
        setIsLoading(true);
        const result = await toggleFavorite(productId);
        setIsLoading(false);

        if (!result.success) {
            toast.error(result.message || "Error actrualizar favorito");
        }
    };
    return(
        <button 
        className={`favorite-button ${favorite ? 'active' : ''} ${loading ? 'loading' : ''}`} 
        onClick={handleClick} 
        disabled={loading} 
        title={favorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}>
            <span className="heart-icon">
                {favorite ? '❤️' : '🤍'}
            </span>
            {showLabel && <span>{favorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}</span>}
        </button>
    );
}
export default FavoriteButton;