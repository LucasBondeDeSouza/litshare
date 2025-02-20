import { query } from "../config/db.js"
import axios from "axios";

async function fetchBookData(book) {
    try {
        // Faz a busca pelo título do livro
        const searchBook = await axios.get(`https://openlibrary.org/search.json?title=${encodeURIComponent(book.title)}`);
        const firstResult = searchBook.data.docs[0];

        if (!firstResult) {
            throw new Error('Book not found');
        }

        // Construindo a URL da capa do livro (se houver)
        const cover = firstResult.cover_i 
            ? `https://covers.openlibrary.org/b/id/${firstResult.cover_i}-L.jpg` 
            : 'Cover Not Found';

        // Obtendo o autor (primeiro da lista, se houver)
        const author = firstResult.author_name?.[0] || 'Author Not Found';

        // Obtendo a categoria (não é garantida na Open Library)
        const category = firstResult.subject?.[0] || 'Category Not Found';

        return {
            ...book,
            cover,
            author,
            category,
        };
    } catch (error) {
        console.error(`Error fetching data for book ${book.title}:`, error);
        return {
            ...book,
            cover: 'Error fetching cover',
            author: 'Error fetching author',
            category: 'Error fetching category',
        };
    }
}

export const getBooks = async (id) => {
    const { rows } = await query(
        `SELECT u.id AS user_id, u.username, u.picture, b.id AS book_id, b.title, b.review, b.rating,
            CASE WHEN l.user_id IS NOT NULL THEN TRUE ELSE FALSE END AS liked_by_user,
            COALESCE(likes_count.count, 0) AS like_count
        FROM (
            SELECT * FROM books
                    ORDER BY id DESC
                    LIMIT 52
                ) b
                JOIN users u ON b.user_id = u.id
                JOIN followers f ON u.id = f.followed_id
                LEFT JOIN likes l ON b.id = l.book_id AND l.user_id = $1
                LEFT JOIN (
                    SELECT book_id, COUNT(*) AS count
                    FROM likes
                    GROUP BY book_id
                ) likes_count ON b.id = likes_count.book_id
                WHERE f.follower_id = $1
                ORDER BY b.id DESC`,
        [id]
    );

    // Para cada livro, busca as informações adicionais (imagem, autor e categoria)
    const booksWithDetails = await Promise.all(rows.map(fetchBookData));

    return booksWithDetails;
};