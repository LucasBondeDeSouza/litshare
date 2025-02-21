import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarSolid, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import LikeButton from "../LikeButton"; // Importando o novo componente

export default ({ data, userId }) => {
    const [flippedBooks, setFlippedBooks] = useState({});

    useEffect(() => {
        // Inicializa o estado de flip dos livros
        const initialFlips = {};
        data.forEach(book => {
            initialFlips[book.book_id] = false;
        });
        setFlippedBooks(initialFlips);
    }, [data]);

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
                                        {/* Componente LikeButton */}
                                        <LikeButton 
                                            bookId={book.book_id} 
                                            userId={userId} 
                                            initialLiked={book.liked_by_user} 
                                            initialLikeCount={Number(book.like_count) || 0} 
                                        />

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