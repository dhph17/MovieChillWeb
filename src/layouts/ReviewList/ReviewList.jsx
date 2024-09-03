import PropTypes from "prop-types";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faAngleRight
} from '@fortawesome/free-solid-svg-icons';
import './styles.scss'

const ReviewList = ({ reviews }) => {
    const [isExpandedReview, setIsExpandedReview] = useState(null);
    const toggleExpandReview = (reviewId) => {
        setIsExpandedReview(prevId => (prevId === reviewId ? null : reviewId)); // Toggle the expansion for the clicked review
    };
    return (
        <>
            <div className="review-title">
                Review
                <FontAwesomeIcon className="movie-review_icon" icon={faAngleRight} />
            </div>
            <div className="review-section">
                {reviews.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).map((review) => (
                    <div className="review-item" key={review.id}>
                        <div className="review-item_header">
                            <div className="review-item_header_name">
                                {
                                    review.author_details.avatar_path ? (
                                        <img
                                            src={`${import.meta.env.VITE_AVATAR_REVIEW}${review.author_details.avatar_path}`}
                                            alt="Avatar"
                                            className='header_name-img'
                                        />
                                    ) : null
                                }

                                <p className='header_name-name'>{review.author}</p>
                            </div>
                            {
                                review.author_details.rating ? (
                                    <div className="review-item_header_rating">
                                        {review.author_details.rating}/10
                                    </div>
                                ) : null
                            }

                        </div>
                        <div className="review-item_content" onClick={() => toggleExpandReview(review.id)}>
                            <p className={isExpandedReview === review.id ? 'content expanded' : 'content'}>
                                {review.content}
                            </p>
                        </div>
                        <div className="review-item_footer">
                            <p>{review.created_at.slice(0, 10)}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

ReviewList.propTypes = {
    reviews: PropTypes.array,
};

export default ReviewList