import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";

export default ({ bookId, userId, initialLiked, initialLikeCount }) => {
    const [liked, setLiked] = useState(initialLiked);
    const [likeCount, setLikeCount] = useState(initialLikeCount);

    const handleLikeToggle = async () => {
        const newLikeStatus = !liked;
        setLiked(newLikeStatus);
        setLikeCount((prev) => (newLikeStatus ? prev + 1 : prev - 1));

        try {
            await axios.post("http://localhost:3000/api/books/like", { userId, bookId });
        } catch (error) {
            console.error("Error toggling like:", error);
            setLiked(!newLikeStatus);
            setLikeCount((prev) => (newLikeStatus ? prev - 1 : prev + 1));
        }
    };

    return (
        <div className="d-flex align-items-center">
            <FontAwesomeIcon
                icon={liked ? faHeartSolid : faHeartRegular}
                className="text-danger like-button"
                onClick={handleLikeToggle}
            />
            <span className="text-danger px-2">
                {likeCount >= 1000 && likeCount < 1000000
                    ? (likeCount / 1000).toFixed(1) + "k"
                    : likeCount}
            </span>
        </div>
    )
}