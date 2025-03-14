import React, { useState, useEffect } from "react";
import axios from "axios";

import Cards from "../../components/Cards";

export default ({ selectedTab }) => {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        if (userId) {
            getBooks();
        } else {
            console.error('No user ID found in localStorage');
        }
    }, [selectedTab]);

    const getBooks = async () => {
        try {
            setIsLoading(true);
            let response;
            if (selectedTab === 'following') {
                // Requisição para livros dos usuários que o usuário está seguindo
                response = await axios.get(`https://litshare-server.vercel.app/api/books/following/${userId}`);
            } else if (selectedTab === 'forYou') {
                // Adicione aqui a lógica para pegar os livros recomendados para o usuário
                response = await axios.get(`https://litshare-server.vercel.app/api/books/forYou/${userId}`);
            }

            // Atualiza os dados com a resposta da API
            setData(response.data);
            console.log(response.data)
        } catch (err) {
            console.error('Error fetching user data:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="pt-4">
            <Cards data={data} userId={userId} isLoading={isLoading} />
        </div>
    )
}