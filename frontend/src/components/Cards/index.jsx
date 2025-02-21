import React, { useState, useEffect } from "react";
import CardFront from "./CardFront";
import CardBack from "./CardBack";

export default ({ data, userId }) => {
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
            {data.length > 0 ? (
                data.map(book => (
                    <div key={book.book_id} className={`flip-card flip-horizontal-left ${flippedBooks[book.book_id] ? "flipped" : ""}`}>
                        <div className="flip-card-inner">
                            <CardFront book={book} userId={userId} toggleFlip={toggleFlip} />
                            <CardBack book={book} toggleFlip={toggleFlip} />
                        </div>
                    </div>
                ))
            ) : (
                <p>No books found.</p>
            )}
        </div>
    );
};