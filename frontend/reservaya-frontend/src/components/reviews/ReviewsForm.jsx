import { useState } from "react";
import { useAuth } from '../../context/AuthContext';
import StarRating from './StarRating';
import api from '../../services/api';
import './Reviews.css';
import { toast } from "react-toastify";


const ReviewsForm = ({ productId, onReviewSubmitted }) => {
    const { user, isAuthenticated } = useAuth();
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isAuthenticated()) {
            toast.error('Debes iniciar sesion para dejar una reseña');
            return;
        }

        if (rating === 0) {
            setError('Por favor selecciona una calificacion');
            return;
        }

        try {
            setLoading(true)
            setError(null)

            const reviewData = {
                productId: productId,
                userId: user.id,
                rating: rating,
                comment: comment.trim()
            };
            console.log('Recibiendo rseña')
            const response = await api.post(`/reviews?userId=${user.id}`, reviewData);
            console.log('Enviando reseña', response);
            setRating(0);
            setComment('');
            toast.success('Gracias por tu reseña!')

        } catch (error) {
            console.error('Error al enviar el review:', error)
            setError(error.response?.data?.message || 'Error al enviar la reseña');

        } finally {
            setLoading(false);
        }
    };

    if (!isAuthenticated()) {
        return (
            <div className="review-form-login">
                <p>Debes iniciar sesion para dejar una contraseña</p>
            </div>
        );
    }

    return (
        <form className="review-form" onSubmit={handleSubmit}>
            <h3>Deja tu reseña</h3>

            <div className="form-group">
                <label>Tu calificacion</label>
                <StarRating
                    rating={rating}
                    onRatingChange={setRating}
                    size={32}
                />
                {error && error.includes('calificacion') && (
                    <span className="error-text">{error}</span>
                )}
            </div>
            <div className="form-group">
                <label htmlFor="comment">Tu opinion (opcional)</label>
                <textarea
                    id="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Comparti tu experiencia con este producto..."
                    rows="4"
                    maxLength="500"
                />
                <small>{comment.length}/500 caracteres</small>
            </div>
            {error && !error.includes('calificacion') && (
                <div className="error-banner">
                    {error}
                </div>
            )}
            <button
                type="submit"
                className="btn btn-primary"
                disabled={loading || rating === 0}
            >
                {loading ? 'Enviando...' : 'Publicar reseña'}
            </button>

        </form>
    );
};
export default ReviewsForm;