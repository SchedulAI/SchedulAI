import pool from '../db';
import { Dialog } from '../entities/dialogEntity';
import { Message } from '../entities/messageEntity';
import { InternalServerException } from '../utils/exceptions';

export const dialogRepository = {
  getDialog: async (userId: string, scheduleId: string): Promise<Dialog> => {
    try {
      const query = `
            SELECT * FROM dialog
            WHERE user_id = $1 AND schedule_id = $2
            LIMIT 1;
        `;
      const { rows } = await pool.query(query, [userId, scheduleId]);
      return rows[0];
    } catch (error: any) {
      throw new InternalServerException('Erro ao encontrar diálogo');
    }
  },

  createDialog: async (userId: string, scheduleId: string): Promise<Dialog> => {
    try {
      const query = `
            INSERT INTO dialog (user_id, schedule_id)
            VALUES ($1, $2)
            RETURNING *;
        `;
      const { rows } = await pool.query(query, [userId, scheduleId]);
      return rows[0]; // Retorna o diálogo criado
    } catch (error: any) {
      throw new InternalServerException('Erro ao criar diálogo');
    }
  },

  saveMessage: async (
    dialogId: string,
    message: string,
    sender: 'user' | 'IA'
  ): Promise<Message> => {
    try {
      const query = `
            INSERT INTO messages (dialog_id, message, sender)
            VALUES ($1, $2, $3)
            RETURNING *;
        `;
      const { rows } = await pool.query(query, [dialogId, message, sender]);
      return rows[0]; // Retorna a mensagem salva
    } catch (error: any) {
      console.log('erro no saveMessage:', error);
      throw new InternalServerException('Erro ao salvar mensagem');
    }
  },

  getDialogsByUserId: async (userId: string): Promise<Dialog[]> => {
    try {
      const query = `
            SELECT *
            FROM dialog
            WHERE user_id = $1
            ORDER BY created_at ASC;
        `;
      const { rows } = await pool.query(query, [userId]);
      return rows;
    } catch (error) {
      throw new InternalServerException('Erro ao buscar diálogo');
    }
  },

  getMessagesByDialogId: async (dialogId: string): Promise<Message[]> => {
    try {
      const query = `
            SELECT sender, message 
            FROM messages
            WHERE dialog_id = $1
            ORDER BY created_at ASC;
        `;
      const { rows } = await pool.query(query, [dialogId]);
      return rows;
    } catch (error: any) {
      console.log('Erro do pegar mensagem:', error);

      throw new InternalServerException('Erro ao buscar mensagens do diálogo');
    }
  },
};
