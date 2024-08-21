import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import { faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';

interface Rating {
    rating: number;
}

const StarRating = ({ rating }: Rating) => {
    const fullStars = Math.floor(rating); // Full stars
    const halfStar = rating % 1 >= 0.5;   // Check if there's a half star
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0); // Empty stars

    const roundedRating = rating.toFixed(2);

    return (
        <div className='starRating' title={`${roundedRating} / 5`}>
            {[...Array(fullStars)].map((_, index) => (
                <FontAwesomeIcon key={index} icon={faStarSolid} />
            ))}
            {halfStar && <FontAwesomeIcon icon={faStarHalfAlt} />}
            {[...Array(emptyStars)].map((_, index) => (
                <FontAwesomeIcon key={index + fullStars + 1} icon={faStarRegular} />
            ))}
        </div>
    );
};

export default StarRating;