import pool from "../db";

export const getDialog = async (userId: string, scheduleId: string) => {
    let client;
    try {
        client = await pool.connect();
        const query = `
            SELECT * FROM dialogs
            WHERE user_id = $1 AND schedule_id = $2
            LIMIT 1;
        `;
        const { rows } = await client.query(query, [userId, scheduleId]);
        return rows[0];
    } catch (error: any) {
        throw new Error('Erro ao encontrar diálogo');
    } finally {
        if (client) {
            client.release();
        }
    }
};

export const createDialog = async (userId: string, scheduleId: string) => {
    let client;
    try {
        client = await pool.connect();
        const query = `
            INSERT INTO dialogs (user_id, schedule_id)
            VALUES ($1, $2)
            RETURNING *;
        `;
        const { rows } = await client.query(query, [userId, scheduleId]);
        return rows[0]; // Retorna o diálogo criado
    } catch (error: any) {
        throw new Error('Erro ao criar diálogo');
    } finally {
        if (client) {
            client.release();
        }
    }
};

export const saveMessage = async (dialogId: string, message: string, sender: 'user' | 'IA') => {
    let client;
    try {
        client = await pool.connect();
        const query = `
            INSERT INTO messages (dialog_id, message, sender)
            VALUES ($1, $2, $3)
            RETURNING *;
        `;
        const { rows } = await client.query(query, [dialogId, message, sender]);
        return rows[0]; // Retorna a mensagem salva
    } catch (error: any) {
        console.log("erro no saveMessage:", error);
        throw new Error('Erro ao salvar mensagem');
    } finally {
        if (client) {
            client.release();
        }
    }
};

export const getMessagesByDialogId = async (dialogId: string) => {
    let client;
    try {
        client = await pool.connect();
        const query = `
            SELECT sender, message 
            FROM messages
            WHERE dialog_id = $1
            ORDER BY created_at ASC;
        `;
        const { rows } = await client.query(query, [dialogId]);
        return rows;
    } catch (error: any) {
        console.log("Erro do pegar mensagem:", error);
        
        throw new Error('Erro ao buscar mensagens do diálogo');
    } finally {
        if (client) {
            client.release();
        }
    }
};
