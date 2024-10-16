import { Request, Response } from 'express';
import { invitesServices } from '../services/invitesServices';
import errorResponse from '../utils/errorResponse';

export const invitesController = {
  createInvite: async (req: Request, res: Response): Promise<void> => {
    const scheduleId = req.params.scheduleId;
    const emails = req.body.emails;
    try {
      if (!emails) {
        errorResponse(res, {
          error: 'BAD_REQUEST',
          message: 'Por favor, infome emails dos Convidados.',
          statusCode: 400,
        });
        return;
      }

      const invites = await invitesServices.createInvites(scheduleId, emails);

      res.status(200).json({
        sucess: true,
        message: 'Convite(s) criado(s) com Sucesso',
        data: invites,
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
