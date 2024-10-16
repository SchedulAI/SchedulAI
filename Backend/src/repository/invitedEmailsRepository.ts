import pool from '../db';
import { InvitedEmails } from '../entities/invitedEmails';
import { InternalServerException } from '../utils/exceptions';

export const invitedEmailsRepository = {
  createInvitedEmail: async (
    email: string,
    scheduleId: string,
  ): Promise<InvitedEmails> => {
    const client = await pool.connect();
    const query = `INSERT INTO invited_emails (email, schedule_id) VALUES ($1, $2) RETURNING *`;
    try {
      const userResult = await client.query(query, [
        email,
        scheduleId,
      ]);
      return userResult.rows[0];
    } catch (error: any) {
      throw new InternalServerException('Erro ao criar email convidado.');
    } finally {
      client.release();
    }
  },
};
