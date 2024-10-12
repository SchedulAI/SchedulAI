import pool from '../db';
import { Schedule } from '../entities/scheduleEntity';
import { InternalServerException } from '../utils/exceptions';

export const scheduleRepository = {
  createSchedule: async (
    title: string,
    description: string,
    userId: string
  ): Promise<Schedule> => {
    const client = await pool.connect(); // Conecta ao pool
    const query = `INSERT INTO schedule (title, description, user_id) VALUES ($1, $2, $3) RETURNING *`;
    try {
      const userResult = await client.query(query, [
        title,
        description,
        userId,
      ]);
      return userResult.rows[0];
    } catch (error: any) {
      throw new InternalServerException('Erro ao criar agendamento');
    } finally {
      client.release(); // Certifique-se de liberar a conexão
    }
  },
};
