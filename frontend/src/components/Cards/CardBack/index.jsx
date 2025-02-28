import React from "react";
import UserProfile from "../UserProfile";
import DropdownMenu from "../DropdownMenu";

export default ({ book, userId, profileId, toggleFlip, updateBooks }) => {

    return (
        <div className="flip-card-back">
            <div className="d-flex justify-content-between">
                <UserProfile username={book.username} social_handle={book.social_handle} picture={book.picture} />

                {profileId == userId && <DropdownMenu book={book} bookId={book.book_id} updateBooks={updateBooks} />}
            </div>

            <div className="card-body" onClick={() => toggleFlip(book.book_id)}>
                <div className="card-title">
                    <h2>{book.title}</h2>
                    <p>By {book.author}</p>
                </div>

                <div className="card-text">
                    <p>{book.review}</p>
                </div>
            </div>
        </div>
    )
}