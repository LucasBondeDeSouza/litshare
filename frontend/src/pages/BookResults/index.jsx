import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios"

import Header from "../../components/Header";
import Cards from "../../components/Cards";
import BookMetrics from "../../components/BookMetrics";
import Footer from "../../components/Footer";

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
            const response = await axios.get(`http://localhost:3000/api/books/search/${title}?userId=${userId}`)
            setData(response.data)
        } catch (err) {
            console.error('Error fetching user data:', err);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <Header />

            <div className="bg-light min-vh-100 pb-5">
                <div className="container">
                    <div className="pt-5">
                        {data.length > 0 && <BookMetrics title={title} />}
                        
                        <Cards 
                            data={data} 
                            userId={userId} 
                            isLoading={isLoading} 
                        />
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}