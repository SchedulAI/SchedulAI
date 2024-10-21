import { PoolClient } from 'pg';
import pool from '../db';
import { Availability } from '../entities/availabilityEntity';
import { InternalServerException } from '../utils/exceptions';
import { AvailabilityWithUser } from '../utils/findPossibleScheduleDates';

export const availabilityRepository = {
  getAvailability: async (
    availabilityId: string
  ): Promise<Availability | null> => {
    const client = await pool.connect();
    const query = `
        SELECT * FROM availability
        WHERE id = $1
      `;
    try {
      const { rows } = await client.query(query, [availabilityId]);
      return rows[0];
    } catch (error: any) {
      throw new InternalServerException('Erro ao encontrar dispolibilidade');
    } finally {
      client.release();
    }
  },

  getAvailabilitiesByUserAndSchedule: async (
    userId: string,
    scheduleId: string
  ): Promise<Availability[]> => {
    const client = await pool.connect();
    const query = `
      SELECT * FROM availability
      WHERE user_id = $1 AND schedule_id = $2;
    `;
    try {
      const { rows } = await client.query(query, [userId, scheduleId]);
      return rows;
    } catch (error: any) {
      throw new InternalServerException('Erro ao encontrar dispolibilidade');
    } finally {
      client.release();
    }
  },

  getAllAvailabilities: async (
    scheduleId: string
  ): Promise<AvailabilityWithUser[] | null> => {
    const client = await pool.connect();
    const query = `
        SELECT 
          availability.*, 
          users.name as user_name, 
          users.email as user_email 
        FROM availability
        JOIN users ON availability.user_id = users.id
        WHERE availability.schedule_id = $1;
      `;
    try {
      const { rows } = await client.query(query, [scheduleId]);
      return rows;
    } catch (error: any) {
      throw new InternalServerException('Erro ao listar as disponibilidades');
    } finally {
      client.release();
    }
  },

  createAvailability: async (
    client: PoolClient,
    userId: string,
    scheduleId: string,
    weekDay: string,
    startTime: string,
    endTime: string,
    notes: string
  ): Promise<Availability> => {
    const createQuery = `
        INSERT INTO availability 
        (user_id, schedule_id, week_day, 
        start_time, end_time, notes)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;
      `;
    try {
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
    const updateQuery = `
        UPDATE availability
        SET week_day = $2, start_time = $3, end_time = $4, notes = $5
        WHERE id = $1
        RETURNING *;
      `;
    try {
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
    const deleteQuery = `
        DELETE FROM availability
        WHERE id = $1
      `;
    try {
      await client.query(deleteQuery, [availabilityId]);
    } catch (error: any) {
      throw new InternalServerException('Erro ao deletar disponibilidade');
    } finally {
      client.release();
    }
  },
};
