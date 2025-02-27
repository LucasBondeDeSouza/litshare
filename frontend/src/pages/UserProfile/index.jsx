import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../../components/Header";
import Cards from "../../components/Cards";

export default () => {
    const { social_handle } = useParams(); // Obtendo o identificador do usuário pela URL
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const userId = localStorage.getItem('userId')

    useEffect(() => {
        if (userId) {
            getBooks();
        } else {
            console.error('No user ID found in localStorage');
        }
    }, [social_handle, userId]);

    const getBooks = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(`http://localhost:3000/api/books/${social_handle}?userId=${userId}`);
            setData(response.data);
        } catch (err) {
            console.error('Error fetching user data:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Header />
            <div className="bg-light min-vh-100">
                <div className="container">
                    <div className="pt-5">
                        <h1>{data.username || 'Username'}</h1>
                        <Cards data={data} userId={userId} isLoading={isLoading} />
                    </div>
                </div>
            </div>
        </>
    );
};
