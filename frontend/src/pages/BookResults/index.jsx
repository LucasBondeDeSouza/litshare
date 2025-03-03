import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios"

import Header from "../../components/Header";
import Cards from "../../components/Cards";

export default () => {
    const { title } = useParams();
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const userId = localStorage.getItem('userId')

    useEffect(() => {
        if (userId) {
            getBooks();
        } else {
            console.error('No user ID found in localStorage');
        }
    }, [title, userId]);

    const getBooks = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(`http://localhost:3000/api/books/search/${title}`)
            setData(response.data)
            console.log(response.data)
        } catch (err) {
            console.error('Error fetching user data:', err);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <Header />

            <div className="bg-light min-vh-100">
                <div className="container">
                    <div className="pt-5">
                        {data.map((book) => (
                            <div className="d-flex flex-column">
                                <span>{book.title}</span>
                                <span>{book.review}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}