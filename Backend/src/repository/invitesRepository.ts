import pool from '../db';
import { Invites } from '../entities/invitesEntity';
import { InternalServerException } from '../utils/exceptions';

export const invitesRepository = {
  createInvite: async (
    scheduleId: string,
    userId: string
  ): Promise<Invites> => {
    const client = await pool.connect();
    const queryCreate = `
      INSERT INTO invites (schedule_id, user_id) 
      VALUES ($1, $2) RETURNING *
        `;
    try {
      const createResult = await client.query(queryCreate, [
        scheduleId,
        userId,
      ]);
      return createResult.rows[0];
    } catch (error: any) {
      throw new InternalServerException('Erro ao criar o convite');
    } finally {
      client.release();
    }
  },

  updateStatus: async (userId: string): Promise<Invites> => {
    const client = await pool.connect();
    const queryUpdate = `
          UPDATE invites
          SET status = 'answered'
          WHERE user_id = $1
          RETURNING *;
        `;
    try {
      const updateResult = await client.query(queryUpdate, [userId]);
      return updateResult.rows[0];
    } catch (error: any) {
      throw new InternalServerException('Erro ao atualizar o convite');
    } finally {
      client.release();
    }
  },

  listInvite: async (scheduleId: string, userId: string): Promise<Invites> => {
    const client = await pool.connect();
    const queryList = `
          SELECT *
          FROM invites
          WHERE user_id = $1 AND schedule_id = $2;
        `;
    try {
      const { rows } = await client.query(queryList, [userId, scheduleId]);
      return rows[0]; // Retorna todos os convites encontrados
    } catch (error: any) {
      throw new InternalServerException('Erro ao listar os convites');
    } finally {
      client.release();
    }
  },

  listInvitesByUserId: async (userId: string): Promise<Invites[]> => {
    const client = await pool.connect();
    const queryList = `
          SELECT *
          FROM invites
          WHERE user_id = $1;
        `;
    try {
      const { rows } = await client.query(queryList, [userId]);
      return rows; // Retorna todos os convites encontrados
    } catch (error: any) {
      throw new InternalServerException('Erro ao listar os convites');
    } finally {
      client.release();
    }
  },

  listAllInvites: async (scheduleId: string): Promise<Invites[]> => {
    const client = await pool.connect();
    const queryList = `
          SELECT *
          FROM invites
          WHERE schedule_id = $1;
        `;
    try {
      const { rows } = await client.query(queryList, [scheduleId]);
      return rows; // Retorna todos os convites encontrados
    } catch (error: any) {
      throw new InternalServerException('Erro ao listar os convites');
    } finally {
      client.release();
    }
  },
};
