import React from "react";
import UserProfile from "../UserProfile";

export default ({ book, toggleFlip }) => {

    return (
        <div className="flip-card-back align-items-start">
            <UserProfile username={book.username} social_handle={book.social_handle} picture={book.picture} />

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