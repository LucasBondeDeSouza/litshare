import React, { useEffect, useState } from "react";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import { faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";

export default ({ title }) => {
    const [data, setData] = useState({});
    const [author, setAuthor] = useState("");

    useEffect(() => {
        getBookMetrics();
        fetchBookDetails();
    }, [title]);

    const getBookMetrics = async () => {
        try {
            const response = await axios.get(`https://litshare-server.vercel.app/api/books/metrics/${title}`);
            setData(response.data);
        } catch (err) {
            console.error('Error fetching book metrics:', err);
        }
    };

    const fetchBookDetails = async () => {
        try {
            const response = await axios.get(`https://openlibrary.org/search.json?title=${title}`);
            if (response.data.docs.length > 0) {
                const book = response.data.docs[0];
                setAuthor(book.author_name ? book.author_name.join(", ") : "Unknown");
            }
        } catch (err) {
            console.error('Error fetching book details:', err);
        }
    };

    const ratingStars = (rating) => {
        const roundedRating = parseFloat(rating); // Garante que o rating seja um número
        let stars = [];
    
        for (let i = 1; i <= 5; i++) {
            if (i <= Math.floor(roundedRating)) {
                // Estrela cheia
                stars.push(<FontAwesomeIcon icon={faStarSolid} key={`solid-${i}`} />);
            } else if (i - 0.5 === roundedRating) {
                // Meia estrela
                stars.push(<FontAwesomeIcon icon={faStarHalfAlt} key={`half-${i}`} />);
            } else {
                // Estrela vazia
                stars.push(<FontAwesomeIcon icon={faStarRegular} key={`regular-${i}`} />);
            }
        }
    
        return stars;
    };    

    return (
        <div className="row justify-content-center">
            <div className="col-12 col-lg-8">
                <div className="card shadow-sm border-0">
                    <div className="card-body">
                        <h4 className="mb-1">{title}</h4>
                        <p className="text-muted mb-2"><small>By {author}</small></p>
                        <p className="mb-2"><strong>Books available:</strong> {data.total_books}</p>

                        <div className="d-flex align-items-center">
                            <strong>Rating: </strong>
                            <div className="ms-2 text-warning">{ratingStars(parseFloat(data.average_rating))}</div>
                            <span className="ms-2">({parseFloat(data.average_rating).toFixed(1)})</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};