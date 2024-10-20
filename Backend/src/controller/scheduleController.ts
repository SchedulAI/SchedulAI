import { Request, Response } from 'express';
import { scheduleServices } from '../services/scheduleServices';
import errorResponse from '../utils/errorResponse';

export const scheduleController = {
  createSchedule: async (req: Request, res: Response): Promise<void> => {
    const { title, description } = req.body;
    const user = req.user!;

    if (!title) {
      errorResponse(res, {
        error: 'BAD_REQUEST',
        message: 'O agendamento precisa de um título!',
        statusCode: 400,
      });
      return;
    }

    try {
      const schedule = await scheduleServices.createSchedule(
        user.id,
        title,
        description
      );
      res.status(200).json({
        success: true,
        message: 'Agendamento criado com sucesso',
        data: schedule,
      });
    } catch (error: any) {
      errorResponse(res, error);
    }
  },

  getSchedule: async (req: Request, res: Response): Promise<void> => {
    const user = req.user!;
    const scheduleId = req.params.scheduleId;

    try {
      const schedule = await scheduleServices.getScheduleById(
        scheduleId,
        user.id
      );
      res.status(200).json({
        success: true,
        message: 'Busca realizada com sucesso',
        data: schedule,
      });
    } catch (error: any) {
      errorResponse(res, error);
    }
  },

  getSchedules: async (req: Request, res: Response): Promise<void> => {
    const user = req.user!;

    try {
      const schedules = await scheduleServices.getAllSchedules(user.id);
      res.status(200).json({
        success: true,
        message: 'Busca realizada com sucesso',
        data: schedules,
      });
    } catch (error: any) {
      errorResponse(res, error);
    }
  },

  deleteSchedule: async (req: Request, res: Response): Promise<void> => {
    const user = req.user!;
    const scheduleId = req.params.scheduleId;

    try {
      if (!scheduleId) {
        errorResponse(res, {
          error: 'BAD_REQUEST',
          message: 'Por favor, informe o ID do agendamento.',
          statusCode: 400,
        });
        return;
      }

      const schedule = await scheduleServices.deleteSchedule(user.id, scheduleId);
      res.status(200).json({
        success: true,
        message: 'Agendamento deletado com sucesso',
        data: schedule,
      });
    } catch (error: any) {
      errorResponse(res, error);
    }
  },

  cancelSchedule: async (req: Request, res: Response): Promise<void> => {
    const user = req.user!;
    const scheduleId = req.params.scheduleId;
    try {
      if (!scheduleId) {
        errorResponse(res, {
          error: 'BAD_REQUEST',
          message: 'Por favor, infome o ID do agendamento.',
          statusCode: 400,
        });
        return;
      }

      const schedule = await scheduleServices.cancelSchedule(
        user.id,
        scheduleId
      );

      res.status(200).json({
        success: true,
        message: 'Agendamento cancelado com sucesso',
        data: schedule,
      });
    } catch (error: any) {
      errorResponse(res, error);
    }
  },

  updateScheduleInfo: async (req: Request, res: Response): Promise<void> => {
    const { scheduleId } = req.params;
    const { title, description } = req.body;
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

      const updatedSchedule = await scheduleServices.updateScheduleInfo(
        user.id,
        scheduleId,
        title,
        description
      );

      res.status(200).json({
        success: true,
        message: 'Agendamento atualizado com sucesso',
        data: updatedSchedule,
      });
    } catch (error: any) {
      errorResponse(res, error);
    }
  },
};
