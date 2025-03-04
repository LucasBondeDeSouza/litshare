import React, { useEffect, useState } from "react";
import axios from "axios";

export default ({ title }) => {
    const [data, setData] = useState({});
    const [author, setAuthor] = useState("");

    useEffect(() => {
        getBookMetrics();
        fetchBookDetails();
    }, [title]);

    const getBookMetrics = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/books/metrics/${title}`);
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
                            <div className="ms-2"></div>
                            <span className="ms-2 text-muted"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};