import { Request, Response } from 'express';
import { dialogServices } from '../services/dialogServices';
import errorResponse from '../utils/errorResponse';

export const dialogController = {
  getMessages: async (req: Request, res: Response): Promise<void> => {
    const scheduleId = req.params.scheduleId;
    const user = req.user!;
    try {
      if (!scheduleId) {
        errorResponse(res, {
          error: 'BAD_REQUEST',
          message: 'Por favor, informe o ID do agendamento.',
          statusCode: 400,
        });
        return;
      }

      const messages = await dialogServices.getMessages(scheduleId, user.id);

      res.status(200).json(messages);
    } catch (error: any) {
      console.log(error);
      errorResponse(res, error);
    }
  },
};
