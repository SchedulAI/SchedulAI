import { Request, Response } from 'express';
import { proposedDateServices } from '../services/proposedDateServices';
import errorResponse from '../utils/errorResponse';

export const proposedDateController = {
  createProposedDate: async (req: Request, res: Response): Promise<void> => {
    const scheduleId = req.params.scheduleId;
    const { proposedDate, status } = req.body;

    if (!proposedDate || !status) {
      errorResponse(res, {
        error: 'BAD_REQUEST',
        message:
          'Por favor, forneça todos os dados necessários para a data proposta.',
        statusCode: 400,
      });
      return;
    }

    try {
      const newProposedDate = await proposedDateServices.createProposedDate(
        scheduleId,
        proposedDate,
        status
      );

      res.status(200).json({
        success: true,
        message: 'Data Proposta criada com sucesso',
        data: newProposedDate,
      });
    } catch (error: any) {
      errorResponse(res, error);
    }
  },

  getProposedDate: async (req: Request, res: Response): Promise<void> => {
    const scheduleId = req.params.scheduleId;

    try {
      const newProposedDate = await proposedDateServices.getProposedDates(
        scheduleId
      );

      res.status(200).json({
        success: true,
        message: 'Busca realizada com sucesso',
        data: newProposedDate,
      });
    } catch (error: any) {
      errorResponse(res, error);
    }
  },

  updateProposedDate: async (req: Request, res: Response): Promise<void> => {
    const scheduleId = req.params.scheduleId;
    const { proposedDate, status } = req.body;

    if (!proposedDate || !status) {
      errorResponse(res, {
        error: 'BAD_REQUEST',
        message:
          'Por favor, forneça todos os dados necessários para a data proposta.',
        statusCode: 400,
      });
      return;
    }

    try {
      const newProposedDate = await proposedDateServices.updateProposedDate(
        scheduleId,
        proposedDate,
        status
      );

      res.status(200).json({
        success: true,
        message: 'Data Proposta atualizada com sucesso',
        data: newProposedDate,
      });
    } catch (error: any) {
      errorResponse(res, error);
    }
  },
};
