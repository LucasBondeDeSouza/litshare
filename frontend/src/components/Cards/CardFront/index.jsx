import React from "react";
import UserProfile from "../UserProfile";
import StarRating from "./StarRating";
import LikeButton from "./LikeButton";

export default ({ book, userId, toggleFlip }) => {

    return (
        <div className="flip-card-front">
            <UserProfile username={book.username} social_handle={book.social_handle} picture={book.picture} />

            <div className="card-image" onClick={() => toggleFlip(book.book_id)}>
                <img src={book.cover} alt={book.title} />
            </div>

            <div className="d-flex align-items-center justify-content-between">
                <LikeButton
                    bookId={book.book_id}
                    userId={userId}
                    initialLiked={book.liked_by_user}
                    initialLikeCount={Number(book.like_count) || 0}
                />

                <StarRating rating={book.rating} />
            </div>
        </div>
    )
}