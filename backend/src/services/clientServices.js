import { query } from "../config/db.js"

export const createClient = async (clientData) => {
    const { name, email, password } = clientData
    
    const { rows } = await query(
        `INSERT INTO users (username, email, password)
        VALUES ($1, $2, $3) RETURNING *`,
        [name, email, password]
    );

    return rows[0]
}