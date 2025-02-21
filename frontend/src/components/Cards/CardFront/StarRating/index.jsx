import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";

export default ({ rating }) => {

    const ratingStars = (rating) => {
        let stars = [];
        for (let i = 0; i < rating; i++) {
            stars.push(<FontAwesomeIcon icon={faStarSolid} key={`solid-${i}`} />);
        }
        if (rating < 5) {
            for (let i = rating; i < 5; i++) {
                stars.push(<FontAwesomeIcon icon={faStarRegular} key={`regular-${i}`} />);
            }
        }
        return stars;
    };

    return (
        <div className="card-stars d-flex text-warning gap-1">
            {ratingStars(rating)}
        </div>
    )
}