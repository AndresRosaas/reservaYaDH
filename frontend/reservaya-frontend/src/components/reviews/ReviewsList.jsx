import { useEffect, useState } from "react";
import StarRating from './StarRating';
import api from '../../services/api';
import './Reviews.css';
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";

const ReviewList = ({ productId, refreshTrigger }) => {
    const { user } = useAuth();
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        averageRating: 0,
        totalReviews: 0
    });

    useEffect(() => {
        loadReviews();
    }, [productId, refreshTrigger]);

    const loadReviews = async () => {
        try {
            setLoading(true)

            const response = await api.get(`/reviews/product/${productId}`);
            setReviews(response.data);
            
            if (response.data.length > 0) {
                const avg = response.data.reduce((sum, review) => sum + review.rating, 0) / response.data.length;
                setStats({
                    averageRating: avg,
                    totalReviews: response.data.length
                });
            } else {
                setStats({ averageRating: 0, totalReviews: 0 });
            }
        } catch (error) {
            console.error('Error al cargar reviews', error);
            setReviews([]);
        } finally {
            setLoading(false);
        }
    };

    const getInitials = (name) => {
        if (!name) return "?";
        return name
            .split(" ")
            .map(w => w.charAt(0))
            .join("")
            .toUpperCase();
    };

    const handleDeleteReview = async (reviewId) => {
        if (!window.confirm('Eliminar esta reseña?')) return;

        try {
            await api.delete(`/reviews/${reviewId}?userId=${user.id}`);
            toast.success('Reseña eliminada correctamente');
            setReviews(prev => prev.filter(review => review.id !== reviewId));
        } catch (error) {
            console.error('Error al eliminar la reseña: ', error);
            toast.error('Error al eliminar la reseña')

        }
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (loading) {
        return <div className="reviews-loading">Cargando reseñas...</div>
    }

    return (
        <div className="review-list">
            {stats.totalReviews > 0 && (
                <div className="reviews-stats">
                    <div className="average-rating">
                        <div className="average-number">{stats.averageRating.toFixed(1)}</div>
                        <StarRating rating={Math.round(stats.averageRating)} readonly size={20} />
                        <div className="total-reviews">
                            {stats.totalReviews} {stats.totalReviews === 1 ? 'reseña' : 'reseñas'}
                        </div>
                    </div>
                </div>
            )}

            {reviews.length === 0 ? (
                <div className="no-reviews">
                    <p>Aun no hay reseñas para este producto</p>
                    <p>Se el primero en dar tu opinion!</p>
                </div>
            ) : (
                <div className="reviews-container">
                    {reviews
                        .filter(review => review && review.id)
                        .map((review) => (
                            <div key={review.id} className="review-item">
                                <div className="review-header">
                                    <div className="review-user">
                                        <div className="user-avatar">
                                            {getInitials(review.userName)}
                                        </div>

                                        <div className="user-info">
                                            <div className="user-name">
                                                {review.userName}
                                            </div>
                                            <div className="review-date">
                                                {formatDate(review.createdAt)}
                                            </div>
                                        </div>
                                    </div>
                                    <StarRating
                                        rating={review.rating} readonly size={18}
                                    />
                                </div>
                                {review.comment && (
                                    <div className="review-comment">
                                        {review.comment}
                                    </div>
                                )}
                                {user?.id === review.userId && (
                                    <button
                                        className="btn-delete-review"
                                        onClick={() => handleDeleteReview(review.id)}
                                    >
                                        🗑️ Eliminar mi reseña
                                    </button>
                                )}
                            </div>
                        ))}
                </div>
            )}
        </div>
    );

};
export default ReviewList;