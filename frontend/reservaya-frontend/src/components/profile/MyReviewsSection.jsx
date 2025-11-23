import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";
import StarRating from "../reviews/StarRating";

function MyReviewSection() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.id) {
            loadReviews();
        }
    }, [user]);

    const loadReviews = async () => {
        try {
            setLoading(true);
            const response = await api.get(`/reviews/user/${user.id}`);
            setReviews(response.data);
        } catch (error) {
            console.error('Error al cargar reseñas:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    if (loading) {
        return (
            <div className="profile-section">
                <h2>Mis Reseñas</h2>
                <p>Cargando reseñas...</p>
            </div>
        );
    }

    return (
        <div className="profile-section">
            <h2>Mis Reseñas {reviews.length > 0 && `(${reviews.length})`}</h2>

            {reviews.length === 0 ? (
                <div className="empty-state">
                    <p>No dejaste reseñas todavia.</p>
                </div>
            ) : (
                <div className="reviws-list">
                    {reviews.map(review => (
                        <div
                            key={review.id}
                            className="review-card"
                            onClick={() => navigate(`/product/${review.productId}`)}
                        >
                            <div>
                                <h3>{review.productName}</h3>
                                <StarRating rating={review.rating} readonly size={16}/>
                            </div>
                            {review.comment && (
                                <p className="review-card-comment">{review.comment}</p>
                            )}
                            <span className="review-card-date">{formatDate(review.createDate)}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
export default MyReviewSection;