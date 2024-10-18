import pool from '../db';
import { Schedule } from '../entities/scheduleEntity';
import { InternalServerException } from '../utils/exceptions';

export const scheduleRepository = {
  createSchedule: async (
    title: string,
    description: string,
    userId: string
  ): Promise<Schedule> => {
    const client = await pool.connect();
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
      client.release();
    }
  },

  getScheduleById: async (scheduleId: string): Promise<Schedule> => {
    const client = await pool.connect();
    const query = `
          SELECT s.*, u.name AS host_name
          FROM schedule s
          JOIN users u ON s.user_id = u.id
          WHERE s.id = $1
        `;
    try {
      const userResult = await client.query(query, [scheduleId]);
      return userResult.rows[0];
    } catch (error: any) {
      throw new InternalServerException('Erro ao buscar agendamento');
    } finally {
      client.release();
    }
  },

  getScheduleByUserId: async (scheduleId: string): Promise<Schedule[]> => {
    const client = await pool.connect();
    const query = `
          SELECT * 
          FROM schedule
          WHERE user_id = $1
        `;
    try {
      const { rows } = await client.query(query, [scheduleId]);
      return rows;
    } catch (error: any) {
      throw new InternalServerException('Erro ao buscar agendamentos');
    } finally {
      client.release();
    }
  },

  cancelSchedule: async (scheduleId: string): Promise<Schedule> => {
    const client = await pool.connect();
    const queryUpdate = `
          UPDATE schedule
          SET status = 'cancelled'
          WHERE id = $1
          RETURNING *;
        `;
    try {
      const updateResult = await client.query(queryUpdate, [scheduleId]);
      return updateResult.rows[0];
    } catch (error: any) {
      throw new InternalServerException('Erro ao cancelar o agendamento');
    } finally {
      client.release();
    }
  },
  updateScheduleStatus: async (
    scheduleId: string,
    status: string
  ): Promise<Schedule> => {
    const client = await pool.connect();
    const queryUpdate = `
          UPDATE schedule
          SET status = $1
          WHERE id = $2
          RETURNING *;
        `;
    try {
      const updateResult = await client.query(queryUpdate, [
        status,
        scheduleId,
      ]);
      return updateResult.rows[0];
    } catch (error: any) {
      throw new InternalServerException('Erro ao cancelar o agendamento');
    } finally {
      client.release();
    }
  },

  updateScheduleInfo: async (
    scheduleId: string,
    title: string,
    description: string
  ): Promise<Schedule> => {
    const client = await pool.connect();
    const queryUpdate = `
      UPDATE schedule
      SET title = $1, description = $2
      WHERE id = $3
      RETURNING *;
    `;
    try {
      const updateResult = await client.query(queryUpdate, [
        title,
        description,
        scheduleId,
      ]);
      return updateResult.rows[0];
    } catch (error: any) {
      throw new InternalServerException(
        'Erro ao atualizar informações do agendamento'
      );
    } finally {
      client.release();
    }
  },
};
