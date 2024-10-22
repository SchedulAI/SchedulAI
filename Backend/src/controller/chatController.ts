import { Request, Response } from 'express';
import { chatServices } from '../services/chatServices';
import errorResponse from '../utils/errorResponse';
import { scheduleServices } from '../services/scheduleServices';

export const chatController = {
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

      const aiMessage = await chatServices.chat(message, schedule_id, user.id);
      const schedule = await scheduleServices.getScheduleById(schedule_id, user.id)

      res.status(200).json({
        data: aiMessage,
        sucess: true,
        message: 'Mensagem enviada para o chat!',
        schedule: schedule
      });
    } catch (error: any) {
      errorResponse(res, error);
    }
  },
};
