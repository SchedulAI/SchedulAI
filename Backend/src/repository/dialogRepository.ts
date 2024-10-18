import pool from '../db';
import { Dialog } from '../entities/dialogEntity';
import { Message } from '../entities/messageEntity';
import { InternalServerException } from '../utils/exceptions';

export const dialogRepository = {
  getDialog: async (userId: string, scheduleId: string): Promise<Dialog> => {
    const client = await pool.connect();

    const query = `
            SELECT * FROM dialogs
            WHERE user_id = $1 AND schedule_id = $2
            LIMIT 1;
        `;
    try {
      const { rows } = await client.query(query, [userId, scheduleId]);
      return rows[0];
    } catch (error: any) {
      console.log(error);

      throw new InternalServerException('Erro ao encontrar diálogo');
    } finally {
      client.release(); // Certifique-se de liberar a conexão
    }
  },

  createDialog: async (userId: string, scheduleId: string): Promise<Dialog> => {
    const client = await pool.connect();
    const query = `
            INSERT INTO dialogs (user_id, schedule_id)
            VALUES ($1, $2)
            RETURNING *;
        `;
    try {
      const { rows } = await client.query(query, [userId, scheduleId]);
      return rows[0]; // Retorna o diálogo criado
    } catch (error: any) {
      throw new InternalServerException('Erro ao criar diálogo');
    } finally {
      client.release(); // Certifique-se de liberar a conexão
    }
  },

  saveMessage: async (
    dialogId: string,
    message: string,
    sender: 'user' | 'IA' | 'system' | 'tool'
  ): Promise<Message> => {
    const client = await pool.connect();
    const query = `
            INSERT INTO messages (dialog_id, message, sender)
            VALUES ($1, $2, $3)
            RETURNING *;
        `;
    try {
      const { rows } = await client.query(query, [dialogId, message, sender]);
      return rows[0]; // Retorna a mensagem salva
    } catch (error: any) {
      console.log('erro no saveMessage:', error);
      throw new InternalServerException('Erro ao salvar mensagem');
    } finally {
      client.release(); // Certifique-se de liberar a conexão
    }
  },

  getDialogsByUserId: async (userId: string): Promise<Dialog[]> => {
    const client = await pool.connect();
    const query = `
            SELECT *
            FROM dialogs
            WHERE user_id = $1
            ORDER BY created_at ASC;
        `;
    try {
      const { rows } = await client.query(query, [userId]);
      return rows;
    } catch (error) {
      throw new InternalServerException('Erro ao buscar diálogo');
    } finally {
      client.release(); // Certifique-se de liberar a conexão
    }
  },

  getMessagesByDialogId: async (dialogId: string): Promise<Message[]> => {
    const client = await pool.connect();
    const query = `
            SELECT * 
            FROM messages
            WHERE dialog_id = $1
            ORDER BY created_at ASC;
        `;
    try {
      const { rows } = await client.query(query, [dialogId]);
      return rows;
    } catch (error: any) {
      console.log('Erro ao pegar mensagem:', error);
      throw new InternalServerException('Erro ao buscar mensagens do diálogo');
    } finally {
      client.release(); // Certifique-se de liberar a conexão
    }
  },

  getConversationByDialogId: async (dialogId: string): Promise<Message[]> => {
    const client = await pool.connect();
    const query = `
            SELECT sender, message 
            FROM messages
            WHERE dialog_id = $1
            AND sender IN ('IA', 'user')
            ORDER BY created_at ASC;
        `;
    try {
      const { rows } = await client.query(query, [dialogId]);
      return rows;
    } catch (error: any) {
      console.log('Erro ao pegar mensagem:', error);
      throw new InternalServerException('Erro ao buscar mensagens do diálogo');
    } finally {
      client.release(); // Certifique-se de liberar a conexão
    }
  },
};
