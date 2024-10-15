import pool from '../db';
import { ProposedDate } from '../entities/proposedDateEntity';
import { InternalServerException } from '../utils/exceptions';

export const proposedDateRepository = {
  // Criar uma nova data proposta
  createProposedDate: async (
    scheduleId: string,
    proposedDate: string,
    status: string
  ): Promise<ProposedDate> => {
    const client = await pool.connect();
    try {
      const query = `
        INSERT INTO proposed_date (schedule_id, proposed_date, status)
        VALUES ($1, $2, $3)
        RETURNING *;
      `;
      const { rows } = await client.query(query, [
        scheduleId,
        proposedDate,
        status,
      ]);
      return rows[0];
    } catch (error: any) {
      throw new InternalServerException('Erro ao criar a data proposta');
    } finally {
      client.release(); // Certifique-se de liberar a conexão
    }
  },

  // Listar datas propostas por ID do agendamento
  listProposedDates: async (scheduleId: string): Promise<ProposedDate[]> => {
    const client = await pool.connect();
    try {
      const query = `
        SELECT * FROM proposed_date
        WHERE schedule_id = $1;
      `;
      const { rows } = await client.query(query, [scheduleId]);
      return rows[0];
    } catch (error: any) {
      throw new InternalServerException('Erro ao listar as datas propostas');
    } finally {
      client.release(); // Certifique-se de liberar a conexão
    }
  },

  // Atualizar uma data proposta
  updateProposedDate: async (
    scheduleId: string,
    proposedDate: Date,
    status: string
  ): Promise<ProposedDate> => {
    const client = await pool.connect();
    try {
      const query = `
        UPDATE proposed_date
        SET proposed_date = $2, status = $3
        WHERE schedule_id = $1
        RETURNING *;
      `;
      const { rows } = await client.query(query, [
        scheduleId,
        proposedDate,
        status,
      ]);
      return rows[0];
    } catch (error: any) {
      throw new InternalServerException('Erro ao atualizar a data proposta');
    } finally {
      client.release(); // Certifique-se de liberar a conexão
    }
  },

  // Deletar data proposta
  deleteProposedDate: async (id: number): Promise<ProposedDate> => {
    const client = await pool.connect();
    try {
      const query = `
        DELETE FROM proposed_date
        WHERE id = $1
        RETURNING *;
      `;
      const { rows } = await client.query(query, [id]);
      return rows[0];
    } catch (error: any) {
      throw new InternalServerException('Erro ao deletar a data proposta');
    } finally {
      client.release(); // Certifique-se de liberar a conexão
    }
  },
};
