import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../components/Header";
import Timeline from "../Timeline";

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
            <Header data={data} userId={userId} />
            <div className="bg-light min-vh-100">
                <div className="container">
                    <Timeline />
                </div>
            </div>
        </>
    );
};