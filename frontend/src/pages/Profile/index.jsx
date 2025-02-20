import React, { useState, useEffect } from "react";
import axios from "axios";

export default () => {
    const [data, setData] = useState({});
    const userId = localStorage.getItem('userId'); // Recuperando o ID do usuário

    useEffect(() => {
        if (userId) {
            getUser();
        } else {
            console.error('No user ID found in localStorage');
        }
    }, []);

    const getUser = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/clients/home/${userId}`);
            setData(response.data);
        } catch (err) {
            console.error('Error fetching user data:', err);
        }
    };

    return (
        <>
            <div className="bg-light min-vh-100">
                <div className="container">
                    <h1>Username:</h1>
                    <h2>{data.username || "Loading..."}</h2>
                    <h2>{data.email || "Loading"}</h2>
                </div>
            </div>
        </>
    );
};