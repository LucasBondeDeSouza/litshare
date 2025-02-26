import { query } from "../config/db.js"
import axios from "axios"
import bcrypt from "bcrypt"

const saltRounds = 10;

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

export const createClient = async (name, social_handle, email, password) => {

    // Verifica se o e-mail já existe no banco de dados
    const existingUser = await query(
        `SELECT * FROM users WHERE email = $1`,
        [email]
    );

    if (existingUser.rows.length > 0) {
        throw new Error("Email already exists");
    }

    // Gera um hash da senha com bcrypt
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Se não existir, cadastra o novo usuário
    const { rows } = await query(
        `INSERT INTO users (username, social_handle, email, password)
        VALUES ($1, $2, $3, $4) RETURNING *`,
        [name, social_handle, email, hashedPassword]
    );

    return rows[0];
};

export const loginClient = async (email, password) => {
    // Busca o usuário pelo e-mail no banco de dados
    const { rows } = await query(
        `SELECT * FROM users WHERE email = $1`,
        [email]
    );

    if (rows.length === 0) {
        throw new Error("Invalid email or password");
    }

    const user = rows[0];

    // Compara a senha fornecida com o hash armazenado
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        throw new Error("Invalid email or password");
    }

    return user;
};

export const getClient = async (id) => {
    const { rows } = await query(
        `SELECT * FROM users WHERE id = $1`,
        [id]
    )
    return rows[0];
}

export const searchClients = async (search) => {
    const usersQuery = await query(
        `SELECT username, social_handle, picture FROM users WHERE username ILIKE $1 OR social_handle ILIKE $1`,
        [`%${search}%`]
    );

    // Busca livros na API Open Library
    const booksQuery = await axios.get(`https://openlibrary.org/search.json?q=${search}`);

    // Adiciona informações de livros à lista de resultados
    const books = booksQuery.data.docs.map((book) => ({
        title: book.title,
        author_name: book.author_name ? book.author_name.join(", ") : "Autor desconhecido",
        cover: book.cover_i
            ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
            : null,
    }));

    return [...usersQuery.rows, ...books]; // Combina usuários e livros
};

export const getClientBySocialHandle = async (social_handle, userId) => {
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

export const followUser = async (followerId, followedId) => {
    // Verifica se o relacionamento já existe
    const existingFollow = await query(
        `SELECT * FROM followers WHERE follower_id = $1 AND followed_id = $2`,
        [followerId, followedId]
    );

    if (existingFollow.rows.length > 0) {
        throw new Error("You are already following this user");
    }

    // Insere o novo relacionamento
    await query(
        `INSERT INTO followers (follower_id, followed_id) VALUES ($1, $2)`,
        [followerId, followedId]
    );

    return { message: "User followed successfully" };
};

export const unfollowUser = async (followerId, followedId) => {
    await query(
        `DELETE FROM followers WHERE follower_id = $1 AND followed_id = $2`,
        [followerId, followedId]
    );

    return { message: "User unfollowed successfully" };
};