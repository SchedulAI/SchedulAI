import { Request, Response } from 'express';
import { availabilityServices } from '../services/availabilityServices';
import errorResponse from '../utils/errorResponse';

export const availabilityController = {
  // Atualizar disponibilidade
  updateAvailability: async (req: Request, res: Response): Promise<void> => {
    const { weekDay, startTime, endTime, notes } = req.body;
    const scheduleId = req.params.scheduleId;
    const availabilityId = req.params.availabilityId;
    const user = req.user!;

    if (!scheduleId || !weekDay || !startTime || !endTime) {
      errorResponse(res, {
        error: 'BAD_REQUEST',
        message:
          'Por favor, forneça todos os dados necessários para atualizar a disponibilidade.',
        statusCode: 400,
      });
      return;
    }

    try {
      const availability = await availabilityServices.updateAvailability(
        user.id,
        scheduleId,
        availabilityId,
        new Date(weekDay),
        startTime,
        endTime,
        notes
      );

      res.status(200).json({
        success: true,
        message: 'Disponibilidade atualizada com sucesso',
        data: availability,
      });
    } catch (error: any) {
      errorResponse(res, error);
    }
  },

  // Deletar disponibilidade
  deleteAvailability: async (req: Request, res: Response): Promise<void> => {
    const { scheduleId, availabilityId } = req.params;
    const user = req.user!;

    if (!scheduleId) {
      errorResponse(res, {
        error: 'BAD_REQUEST',
        message:
          'Por favor, informe o ID do agendamento para deletar a disponibilidade.',
        statusCode: 400,
      });
      return;
    }

    try {
      await availabilityServices.deleteAvailability(
        user.id,
        scheduleId,
        availabilityId
      );

      res.status(200).json({
        success: true,
        message: 'Disponibilidade deletada com sucesso',
      });
    } catch (error: any) {
      errorResponse(res, error);
    }
  },

  // Obter disponibilidade
  getAvailability: async (req: Request, res: Response): Promise<void> => {
    const { scheduleId, availabilityId } = req.params;
    const user = req.user!;

    if (!scheduleId) {
      errorResponse(res, {
        error: 'BAD_REQUEST',
        message: 'Por favor, informe o ID do agendamento.',
        statusCode: 400,
      });
      return;
    }

    try {
      const availability = await availabilityServices.getAvailability(
        scheduleId,
        availabilityId
      );

      res.status(200).json({
        success: true,
        message: 'Disponibilidade encontrada com sucesso',
        data: availability,
      });
    } catch (error: any) {
      errorResponse(res, error);
    }
  },

  // Listar todas as disponibilidades
  getAllAvailabilities: async (req: Request, res: Response): Promise<void> => {
    const { scheduleId } = req.params;

    if (!scheduleId) {
      errorResponse(res, {
        error: 'BAD_REQUEST',
        message: 'Por favor, informe o ID do agendamento.',
        statusCode: 400,
      });
      return;
    }

    try {
      const availabilities = await availabilityServices.getAllAvailabilities(
        scheduleId
      );

      res.status(200).json({
        success: true,
        message: 'Disponibilidades encontradas com sucesso',
        data: availabilities,
      });
    } catch (error: any) {
      errorResponse(res, error);
    }
  },
};
