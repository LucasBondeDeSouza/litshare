import React from "react";
import UserProfile from "../UserProfile";
import StarRating from "./StarRating";
import LikeButton from "./LikeButton";
import DropdownMenu from "../DropdownMenu";

export default ({ book, userId, profileId, toggleFlip, getBooks }) => {

    return (
        <div className="flip-card-front">
            <div className="d-flex justify-content-between">
                <UserProfile username={book.username} social_handle={book.social_handle} picture={book.picture} />

                {profileId == userId && <DropdownMenu book={book} bookId={book.book_id} getBooks={getBooks} />}
            </div>

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