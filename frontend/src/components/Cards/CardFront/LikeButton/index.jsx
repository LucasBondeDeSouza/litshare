import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";
import ModalForm from "../../../LikersModal";

export default ({ bookId, userId, initialLiked, initialLikeCount }) => {
    const [liked, setLiked] = useState(initialLiked);
    const [likeCount, setLikeCount] = useState(initialLikeCount);
    const [showModal, setShowModal] = useState(false);
    const [likers, setLikers] = useState([]);

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

    const handleShowLikers = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/books/${bookId}/likers?userId=${userId}`);
            setLikers(response.data);
            setShowModal(true);
        } catch (error) {
            console.error("Error fetching likers:", error);
        }
    };    

    return (
        <div className="d-flex align-items-center like-button">
            <FontAwesomeIcon
                icon={liked ? faHeartSolid : faHeartRegular}
                className="text-danger"
                onClick={handleLikeToggle}
            />

            <span className="text-danger px-2" onClick={handleShowLikers}>
                {likeCount >= 1000 && likeCount < 1000000
                    ? (likeCount / 1000).toFixed(1) + "k"
                    : likeCount}
            </span>

            <ModalForm show={showModal} onHide={() => setShowModal(false)} likers={likers} userId={userId} />
        </div>
    )
}