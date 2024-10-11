import pool from "../db";

export const createSchedule= async (
    title: string,
    description: string,
    userId: string
) => {
    const query = `INSERT INTO schedule (title, description, user_id) VALUES ($1, $2, $3) RETURNING *`;
    let client;
    try {
        client = await pool.connect();
        const userResult = await client.query(query, [title, description, userId]);
        return userResult.rows[0];
    } catch (error: any) {
        throw new Error("Erro ao criar agendamento");
    } finally {
        if (client) {
            client.release();
        }
    }
};
