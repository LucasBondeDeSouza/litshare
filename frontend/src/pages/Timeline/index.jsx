import React, { useState, useEffect } from "react";
import axios from "axios";
import Cards from "../../components/Cards";

// Hook para debounce (evita requisições em sequência muito rápidas)
const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
};

export default ({ selectedTab }) => {
    const [data, setData] = useState([]);
    const [cache, setCache] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const userId = localStorage.getItem('userId');
    const debouncedTab = useDebounce(selectedTab, 300); // Delay de 300ms para evitar múltiplas requisições seguidas

    useEffect(() => {
        if (userId) {
            preloadData();
        }
    }, []);

    useEffect(() => {
        if (userId) {
            getBooks();
        }
    }, [debouncedTab]);

    // Pré-carrega os dados das duas abas para melhorar a experiência do usuário
    const preloadData = async () => {
        try {
            setIsLoading(true);
            const [forYouRes, followingRes] = await Promise.all([
                axios.get(`https://litshare-server.vercel.app/api/books/forYou/${userId}`),
                axios.get(`https://litshare-server.vercel.app/api/books/following/${userId}`)
            ]);

            setCache({
                forYou: forYouRes.data,
                following: followingRes.data
            });

            // Se o usuário estiver na aba 'For You' ao carregar, já define os dados iniciais
            if (!cache[selectedTab]) {
                setData(forYouRes.data);
            }
        } catch (err) {
            console.error('Error preloading books:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const getBooks = async () => {
        if (cache[selectedTab]) {
            setData(cache[selectedTab]);
            setIsLoading(false);
            return;
        }

        try {
            setIsLoading(true);
            let response;
            if (selectedTab === 'following') {
                response = await axios.get(`https://litshare-server.vercel.app/api/books/following/${userId}`);
            } else {
                response = await axios.get(`https://litshare-server.vercel.app/api/books/forYou/${userId}`);
            }

            setData(response.data);
            setCache(prevCache => ({ ...prevCache, [selectedTab]: response.data }));
        } catch (err) {
            console.error('Error fetching books:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="pt-4">
            <Cards data={data} userId={userId} isLoading={isLoading} />
        </div>
    );
};