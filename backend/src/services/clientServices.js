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
        `SELECT id, username, social_handle, email, picture FROM users WHERE id = $1`,
        [id]
    );
    return rows[0];
};

export const searchClients = async () => {
    const { rows } = await query(
        'SELECT username, social_handle, picture FROM users'
    )
    
    return rows
};

export const getUserProfile = async (social_handle, userId) => {
    const { rows } = await query(
        `
        SELECT 
            u.id,
            u.username, 
            u.social_handle, 
            u.picture, 
            (SELECT COUNT(*) FROM books WHERE user_id = u.id) AS book_count,
            (SELECT COUNT(*) FROM followers WHERE followed_id = u.id) AS followers_count,
            (SELECT COUNT(*) FROM followers WHERE follower_id = u.id) AS following_count,
            EXISTS (
                SELECT 1 FROM followers WHERE follower_id = $2 AND followed_id = u.id
            ) AS is_following
        FROM users u
        WHERE u.social_handle = $1
        `,
        [social_handle, userId]
    );

    return rows[0];
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

export const getFollowers = async (userId, profileId) => {
    const { rows } = await query(
        `SELECT 
            u.id, 
            u.username, 
            u.social_handle, 
            u.picture,
            EXISTS (
                SELECT 1 
                FROM followers f2 
                WHERE f2.follower_id = $1 AND f2.followed_id = u.id
            ) AS isfollowing
        FROM users u
        JOIN followers f ON u.id = f.follower_id
        WHERE f.followed_id = $2`,
        [userId, profileId]
    );

    return rows;
};

export const getFollowing = async (userId, profileId) => {
    const { rows } = await query(
        `SELECT 
            u.id, 
            u.username, 
            u.social_handle, 
            u.picture,
            EXISTS (
                SELECT 1 
                FROM followers f2 
                WHERE f2.follower_id = $1 AND f2.followed_id = u.id
            ) AS isfollowing
        FROM users u
        JOIN followers f ON u.id = f.followed_id
        WHERE f.follower_id = $2`,
        [userId, profileId]
    );

    return rows;
};