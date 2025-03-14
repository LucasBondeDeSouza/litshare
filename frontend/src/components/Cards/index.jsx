import React, { useState, useEffect } from "react";
import CardFront from "./CardFront";
import CardBack from "./CardBack";
import SkeletonCard from "./SkeletonCard";

export default ({ data, userId, profileId, isLoading, getBooks }) => {
    const [flippedBooks, setFlippedBooks] = useState({});
    const [visibleCount, setVisibleCount] = useState(6); // Quantidade inicial de livros exibidos

    useEffect(() => {
        const initialFlips = {};
        data.forEach(book => {
            initialFlips[book.book_id] = false;
        });
        setFlippedBooks(initialFlips);
    }, [data]);

    const toggleFlip = (bookId) => {
        setFlippedBooks(prevState => ({
            ...prevState,
            [bookId]: !prevState[bookId],
        }));
    };

    const showMore = () => {
        setVisibleCount(prev => prev + 6); // Aumenta em 6 a quantidade exibida
    };

    return (
        <>
            <div className="cards-group my-5">
                {isLoading ? (
                    Array.from({ length: 3 }).map((_, index) => <SkeletonCard key={index} />)
                ) : data.length > 0 ? (
                    <>
                        {data.slice(0, visibleCount).map(book => (
                            <div key={book.book_id} className={`flip-card flip-horizontal-left ${flippedBooks[book.book_id] ? "flipped" : ""}`}>
                                <div className="flip-card-inner">
                                    <CardFront book={book} userId={userId} profileId={profileId} toggleFlip={toggleFlip} getBooks={getBooks} />
                                    <CardBack book={book} userId={userId} profileId={profileId} toggleFlip={toggleFlip} getBooks={getBooks} />
                                </div>
                            </div>
                        ))}
                    </>
                ) : (
                    <p>No books found.</p>
                )}
            </div>

            {visibleCount < data.length && (
                <div className="d-flex justify-content-center mt-3">
                    <button className="btn btn-primary" onClick={showMore}>
                        Show More
                    </button>
                </div>
            )}
        </>
    );
};