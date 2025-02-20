import React, { useState, useEffect } from "react";
import axios from "axios";

import Cards from "../../components/Cards";

export default () => {
    const [data, setData] = useState([])
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
            const response = await axios.get(`http://localhost:3000/api/books/home/${userId}`);
            setData(response.data);
        } catch (err) {
            console.error('Error fetching user data:', err);
        }
    };

    const countStars = (rating) => {
        let stars = [];

        for (let i = 0; i < rating; i++) {
            stars.push(<FontAwesomeIcon icon={faStarSolid} key={`solid-${i}`} />)
        }

        if (rating < 5) {
            for (let i = rating; i < 5; i++) {
                stars.push(<FontAwesomeIcon icon={faStarRegular} key={`regular-${i}`} />)
            }
        }
        return stars
    }

    return (
        <div className="pt-5">
            <h1 className="text-center">Timeline</h1>
            <Cards data={data} />
        </div>
    )
}