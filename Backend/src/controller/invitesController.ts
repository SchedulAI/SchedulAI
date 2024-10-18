import { Request, Response } from 'express';
import { invitesServices } from '../services/invitesServices';
import errorResponse from '../utils/errorResponse';

export const invitesController = {
  createInvite: async (req: Request, res: Response): Promise<void> => {
    const { user_id, schedule_id } = req.body;

    try {
      if (!schedule_id) {
        errorResponse(res, {
          error: 'BAD_REQUEST',
          message: 'Por favor, infome o id do agendamento.',
          statusCode: 400,
        });
        return;
      }

      if (!user_id) {
        errorResponse(res, {
          error: 'BAD_REQUEST',
          message: 'Por favor, infome o id do usuário.',
          statusCode: 400,
        });
        return;
      }

      const invite = await invitesServices.createInvite(user_id, schedule_id);

      res.status(200).json({
        sucess: true,
        message: 'Convite(s) criado(s) com Sucesso',
        data: invite,
      });
    } catch (error: any) {
      errorResponse(res, error);
    }
  },

  updateInviteStatus: async (req: Request, res: Response): Promise<void> => {
    const scheduleId = req.params.scheduleId;
    const email = req.body.email;
    try {
      if (!email) {
        errorResponse(res, {
          error: 'BAD_REQUEST',
          message: 'Por favor, infome email do Convidado.',
          statusCode: 400,
        });
        return;
      }

      const invites = await invitesServices.updateInvite(scheduleId, email);

      res.status(200).json({
        sucess: true,
        message: 'Convite atualizado com Sucesso',
        data: invites,
      });
    } catch (error: any) {
      errorResponse(res, error);
    }
  },
};
