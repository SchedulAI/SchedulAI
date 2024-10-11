import pool from '../db'

export const createNewUser = async (name: string, email: string, password: string) => {
    const query = `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING name, email`;
    let client;
    try {
        client = await pool.connect();
        const userResult = await client.query(query, [name, email, password]);
        return userResult.rows[0];
    } catch(error: any){
        throw new Error('Erro ao criar usuário');
    } finally {
        if(client){
            client.release();
        }
    }
}