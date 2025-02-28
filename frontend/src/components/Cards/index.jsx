import React, { useState, useEffect } from "react";
import CardFront from "./CardFront";
import CardBack from "./CardBack";
import SkeletonCard from "./SkeletonCard";

export default ({ data, userId, profileId, isLoading, getBooks }) => {
    const [flippedBooks, setFlippedBooks] = useState({});

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

    return (
        <div className="cards-group">
            {isLoading ? (
                Array.from({ length: 3 }).map((_, index) => <SkeletonCard key={index} />)
            ) : data.length > 0 ? (
                data.map(book => (
                    <div key={book.book_id} className={`flip-card flip-horizontal-left ${flippedBooks[book.book_id] ? "flipped" : ""}`}>
                        <div className="flip-card-inner">
                            <CardFront book={book} userId={userId} profileId={profileId} toggleFlip={toggleFlip} getBooks={getBooks} />
                            <CardBack book={book} userId={userId} profileId={profileId} toggleFlip={toggleFlip} getBooks={getBooks} />
                        </div>
                    </div>
                ))
            ) : (
                <p>No books found.</p>
            )}
        </div>
    );
};