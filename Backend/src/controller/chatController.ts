import { Request, Response } from 'express';
import errorResponse from '../utils/errorResponse';
import { sendMessageToClient } from '../utils/webSocket';

export const chatController = {
  handleChatWebSocket: async (
    userId: string,
    message: string,
    schedule_id: string
  ): Promise<void> => {
    try {
      if (!schedule_id) {
        throw new Error('O chat precisa de um id de agendamento!');
      }

      if (!message) {
        throw new Error('O chat precisa de uma mensagem!');
      }

      // Enviar a mensagem para o serviço
      await sendMessageToClient(userId, message, schedule_id);
    } catch (error: any) {
      console.error('Erro no controlador de chat:', error);
    }
  },

  handleChat: async (req: Request, res: Response): Promise<void> => {
    const { message, schedule_id } = req.body;
    const user = req.user!;
    try {
      if (!schedule_id) {
        errorResponse(res, {
          error: 'BAD_REQUEST',
          message: 'O chat precisa de um id de agendamento!',
          statusCode: 400,
        });
        return;
      }

      if (!message) {
        errorResponse(res, {
          error: 'BAD_REQUEST',
          message: 'O chat precisa de uma mensagem!',
          statusCode: 400,
        });
        return;
      }

      // Enviar a mensagem para o serviço
      await sendMessageToClient(user.id, message, schedule_id);

      res.status(200).json({
        success: true,
        message: 'Mensagem enviada para o chat!',
      });
    } catch (error: any) {
      errorResponse(res, error);
    }
  },
};
