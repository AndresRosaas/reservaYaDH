import {Star} from 'lucide-react';
import './Reviews.css';

const StarRating = ({rating, onRatingChange, readonly = false, size= 24}) => {
    const stars = [1,2,3,4,5];

    const handleClick = (value) => {
        if(!readonly && onRatingChange){
            onRatingChange(value);
        }
    };

    return (
        <div className={`star-rating ${readonly ? 'readonly' : 'interactive'}`}>
            {stars.map((star) =>(
                <button
                key={star}
                type='button'
                className={`star ${star <= rating ? 'filled' : ''}`}
                onClick={() => handleClick(star)}
                disabled={readonly}
                aria-label={`${star} estrellas`}
                >
                    <Star
                    size={size}
                    fill={star <= rating ? 'currentColor' : 'none'}
                    strokeWidth={2}
                    />
                </button>
            ))}
        </div>
    );
};
export default StarRating;