import { query } from "../config/db.js"
import bcrypt from "bcrypt"

const saltRounds = 10;

export const createClient = async (name, email, password) => {

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
        `INSERT INTO users (username, email, password)
        VALUES ($1, $2, $3) RETURNING *`,
        [name, email, hashedPassword]
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