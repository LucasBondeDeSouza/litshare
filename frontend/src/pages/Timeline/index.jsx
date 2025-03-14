import React, { useState, useEffect } from "react";
import axios from "axios";

import Cards from "../../components/Cards";

export default () => {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        if (userId) {
            getBooks();
        } else {
            console.error('No user ID found in localStorage');
        }
    }, []);

    const getBooks = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(`https://litshare-server.vercel.app/api/books/home/${userId}`);
            setData(response.data);
        } catch (err) {
            console.error('Error fetching user data:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="pt-5">
            <h1 className="text-center">Timeline</h1>
            <Cards data={data} userId={userId} isLoading={isLoading} />
        </div>
    )
}