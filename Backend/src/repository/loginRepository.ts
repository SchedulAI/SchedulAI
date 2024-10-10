import pool from "../db";

const getUserByEmail = async (email: string) => {
    let client;
    try {
        client = await pool.connect();
        const query = `SELECT * FROM users WHERE email = $1`;
        const { rows } = await client.query(query, [email]);
        return rows[0];
    } catch (error: any) {
        throw new Error('Erro ao encontrar usuário');
    } finally {
        if(client){
            client.release();
        }
    }
};

export default getUserByEmail;