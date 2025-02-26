import { query } from "../config/db.js"
import axios from "axios"
import bcrypt from "bcrypt"

const saltRounds = 10;

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
        `SELECT username, picture FROM users WHERE username ILIKE $1`,
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