import pool from '../db';
import { Availability } from '../entities/availabilityEntity';
import { InternalServerException } from '../utils/exceptions';

export const availabilityRepository = {
  getAvailability: async (availabilityId: string): Promise<Availability> => {
    const client = await pool.connect();
    try {
      const query = `
        SELECT * FROM availability
        WHERE id = $1
      `;
      const { rows } = await client.query(query, [availabilityId]);
      return rows[0];
    } catch (error: any) {
      throw new InternalServerException('Erro ao encontrar dispolibilidade');
    } finally {
      client.release();
    }
  },

  getAllAvailabilitiesBySchedule: async (
    scheduleId: string
  ): Promise<Availability[]> => {
    const client = await pool.connect();
    try {
      const query = `
        SELECT * FROM availability
        WHERE schedule_id = $1;
      `;
      const { rows } = await client.query(query, [scheduleId]);
      return rows;
    } catch (error: any) {
      throw new InternalServerException('Erro ao listar as disponibilidades');
    } finally {
      client.release();
    }
  },

  createAvailability: async (
    userId: string,
    scheduleId: string,
    weekDay: Date,
    startTime: string,
    endTime: string,
    notes: string
  ): Promise<Availability> => {
    const client = await pool.connect();
    try {
      const createQuery = `
        INSERT INTO availability 
        (user_id, schedule_id, week_day, 
        start_time, end_time, notes)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;
      `;
      const { rows } = await client.query(createQuery, [
        userId,
        scheduleId,
        weekDay,
        startTime,
        endTime,
        notes,
      ]);
      return rows[0];
    } catch (error: any) {
      throw new InternalServerException('Erro ao criar disponibilidade');
    } finally {
      client.release();
    }
  },

  updateAvailability: async (
    availabilityId: string,
    weekDay: Date,
    startTime: string,
    endTime: string,
    notes: string
  ): Promise<Availability> => {
    const client = await pool.connect();
    try {
      const updateQuery = `
        UPDATE availability
        SET week_day = $2, start_time = $3, end_time = $4, notes = $5
        WHERE id = $1
        RETURNING *;
      `;
      const { rows } = await client.query(updateQuery, [
        availabilityId,
        weekDay,
        startTime,
        endTime,
        notes,
      ]);
      return rows[0];
    } catch (error: any) {
      throw new InternalServerException('Erro ao atualizar disponibilidade');
    } finally {
      client.release();
    }
  },

  deleteAvailability: async (availabilityId: string): Promise<void> => {
    const client = await pool.connect();
    try {
      const deleteQuery = `
        DELETE FROM availability
        WHERE id = $1
      `;
      await client.query(deleteQuery, [availabilityId]);
    } catch (error: any) {
      throw new InternalServerException('Erro ao deletar disponibilidade');
    } finally {
      client.release();
    }
  },
};
