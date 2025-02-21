import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartSolid, faStar as faStarSolid, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular, faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';

import axios from "axios";

export default ({ data, userId }) => {
    const [flippedBooks, setFlippedBooks] = useState({});

    const handleLikeToggle = async (bookId) => {
        try {
            await axios.post('http://localhost:3000/api/books/like', { userId, bookId });
        } catch (error) {
            console.error("Error toggling like:", error);
        }
    };

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

    // Função para alternar o estado de flip do livro
    const toggleFlip = (bookId) => {
        setFlippedBooks((prevState) => ({
            ...prevState,
            [bookId]: !prevState[bookId],
        }));
    };

    return (
        <div className="cards-group">
            {data.length > 0 ? (
                data.map((book) => {
                    const flipped = flippedBooks[book.book_id] || false;

                    return (
                        <div key={book.book_id} className={`flip-card flip-horizontal-left ${flipped ? "flipped" : ""}`}>
                            <div className="flip-card-inner">
                                <div className="flip-card-front">
                                    <a href="" className="card-profile d-flex align-items-center text-decoration-none text-dark gap-2">
                                        {book.picture ? (
                                            <img className="card-picture-profile" src={book.picture} alt={book.username} />
                                        ) : (
                                            <FontAwesomeIcon icon={faUserCircle} className="card-picture-alternative" />
                                        )}
                                        <p className="fw-bolder m-0">{book.username}</p>
                                    </a>

                                    <div className="card-image" onClick={() => toggleFlip(book.book_id)}>
                                        <img src={book.cover} alt={book.title} />
                                    </div>

                                    <div className="d-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center">
                                            <FontAwesomeIcon
                                                icon={book.liked_by_user ? faHeartSolid : faHeartRegular}
                                                className="text-danger"
                                                onClick={() => handleLikeToggle(book.book_id)}
                                            />
                                            <span className="text-danger px-2">
                                                {book.like_count >= 1000 && book.like_count < 1000000
                                                    ? (book.like_count / 1000).toFixed(1) + "k"
                                                    : book.like_count}
                                            </span>
                                        </div>

                                        <div className="card-stars d-flex text-warning gap-1">
                                            {ratingStars(book.rating)}
                                        </div>
                                    </div>
                                </div>

                                <div className="flip-card-back align-items-start">
                                    <a href="" className="card-profile d-flex align-items-center text-decoration-none text-dark gap-2">
                                        {book.picture ? (
                                            <img className="card-picture-profile" src={book.picture} alt={book.username} />
                                        ) : (
                                            <FontAwesomeIcon icon={faUserCircle} className="card-picture-alternative" />
                                        )}
                                        <p className="fw-bolder m-0">{book.username}</p>
                                    </a>

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
                            </div>
                        </div>
                    );
                })
            ) : (
                <p>No books found.</p>
            )}
        </div>
    );
};