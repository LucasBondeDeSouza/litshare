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

        return {
            ...book,
            cover,
            author,
        };
    } catch (error) {
        console.error(`Error fetching data for book ${book.title}:`, error);
        return {
            ...book,
            cover: 'Error fetching cover',
            author: 'Error fetching author',
        };
    }
}

export const addBook = async (title, review, rating, userId) => {
    // Verifica se o livro já existe para o usuário
    const existingBook = await query(
        `SELECT * FROM books WHERE title = $1 AND user_id = $2`,
        [title, userId]
    );

    if (existingBook.rows.length > 0) {
        throw new Error("Este livro já foi cadastrado por você.");
    }

    // Insere o novo livro se não existir
    const { rows } = await query(
        `INSERT INTO books (title, review, rating, user_id)
        VALUES ($1, $2, $3, $4) RETURNING *`,
        [title, review, rating, userId]
    );

    return rows[0];
};

export const deleteBook = async (bookId) => {
    try {
        // Deleta o livro baseado no ID
        const { rowCount } = await query(
            `DELETE FROM books WHERE id = $1`,
            [bookId]
        );

        if (rowCount === 0) {
            throw new Error("Book not found");
        }

        return { message: "Book deleted successfully" };
    } catch (error) {
        console.error("Error deleting book:", error);
        throw error;
    }
};

export const editBook = async (bookId, editReview, editRating) => {

    const { rows } = await query(
        `UPDATE books SET review = $1, rating = $2 WHERE id = $3 RETURNING *`,
        [editReview, editRating, bookId]
    )

    return rows[0]
}

export const getBooks = async (id) => {
    const { rows } = await query(
        `SELECT u.id AS user_id, u.username, u.social_handle, u.picture, b.id AS book_id, b.title, b.review, b.rating,
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

export const getBookSearch = async (title, userId) => {
    const { rows } = await query(
        `SELECT 
                u.id AS user_id, 
                u.username, 
                u.social_handle, 
                u.picture, 
                b.id AS book_id, 
                b.title, 
                b.review, 
                b.rating,
                CASE 
                    WHEN l.user_id IS NOT NULL THEN TRUE 
                    ELSE FALSE 
                END AS liked_by_user,
                COALESCE(likes_count.count, 0) AS like_count
            FROM books b
            JOIN users u ON b.user_id = u.id
            LEFT JOIN likes l ON b.id = l.book_id AND l.user_id = $2
            LEFT JOIN (
                SELECT book_id, COUNT(*) AS count
                FROM likes
                GROUP BY book_id
            ) likes_count ON b.id = likes_count.book_id
            WHERE b.title = $1
            ORDER BY like_count DESC, b.id DESC`,
        [title, userId]
    );
    const booksWithDetails = await Promise.all(rows.map(fetchBookData));

    return booksWithDetails;
}

export const getBookBySocialHandle = async (social_handle, userId) => {
    const { rows } = await query(
        `SELECT 
                u.id AS user_id, 
                u.username, 
                u.social_handle, 
                u.picture, 
                b.id AS book_id, 
                b.title, 
                b.review, 
                b.rating,
                CASE 
                    WHEN l.user_id IS NOT NULL THEN TRUE 
                    ELSE FALSE 
                END AS liked_by_user,
                COALESCE(likes_count.count, 0) AS like_count
            FROM books b
            JOIN users u ON b.user_id = u.id
            LEFT JOIN likes l ON b.id = l.book_id AND l.user_id = $2
            LEFT JOIN (
                SELECT book_id, COUNT(*) AS count
                FROM likes
                GROUP BY book_id
            ) likes_count ON b.id = likes_count.book_id
            WHERE u.social_handle = $1
            ORDER BY b.id DESC`,
        [social_handle, userId]
    );
    const booksWithDetails = await Promise.all(rows.map(fetchBookData));

    return booksWithDetails;
}

export const toggleLike = async (userId, bookId) => {
    try {
        // Verificar se o usuário já deu like no livro
        const { rows } = await query(
            `SELECT * FROM likes WHERE user_id = $1 AND book_id = $2`,
            [userId, bookId]
        );

        if (rows.length > 0) {
            // Se já deu like, removemos
            await query(`DELETE FROM likes WHERE user_id = $1 AND book_id = $2`, [userId, bookId]);
            return { liked: false };
        } else {
            // Caso contrário, adicionamos o like
            await query(`INSERT INTO likes (user_id, book_id) VALUES ($1, $2)`, [userId, bookId]);
            return { liked: true };
        }
    } catch (error) {
        console.error("Error toggling like:", error);
        throw error;
    }
};

export const getLikers = async (userId, bookId) => {
    try {
        const { rows } = await query(
            `SELECT u.id, u.username, u.social_handle, u.picture,
                    EXISTS (SELECT 1 FROM followers f WHERE f.follower_id = $1 AND f.followed_id = u.id) AS isFollowing
             FROM users u
             JOIN likes l ON u.id = l.user_id
             WHERE l.book_id = $2`,
            [userId, bookId]
        );

        return rows;
    } catch (error) {
        console.error("Error fetching likers:", error);
        throw error;
    }
};

export const getBookMetrics = async (title) => {
    const { rows } = await query(
        `SELECT 
            COUNT(*) AS total_books, 
            COALESCE(AVG(rating), 0) AS average_rating
         FROM books 
         WHERE title = $1`,
        [title]
    );

    return rows[0];
};