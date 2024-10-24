import { Request, Response } from 'express';
import { scheduleServices } from '../services/scheduleServices';
import errorResponse from '../utils/errorResponse';
import { Schedule } from '../entities/scheduleEntity';

const userSchedulesCache: { [key: string]: Schedule[] } = {};

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

  getSchedulesLongPolling: async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const user = req.user!;
    const POLLING_INTERVAL = 10000;
    const TIMEOUT = 60000;
    let responseSent = false;

    const lastSchedules = userSchedulesCache[user.id] || [];
    const checkForUpdates = async () => {
      try {
        const schedules = await scheduleServices.getAllSchedules(user.id);
        if (JSON.stringify(schedules) !== JSON.stringify(lastSchedules)) {
          userSchedulesCache[user.id] = schedules;
          if (!responseSent) {
            responseSent = true;
            res.status(200).json({
              update: true,
            });
          }
        } else {
          if (!responseSent) {
            setTimeout(checkForUpdates, POLLING_INTERVAL);
          }
        }
      } catch (error: any) {
        if (!responseSent) {
          responseSent = true;
          errorResponse(res, error);
        }
      }
    };

    setTimeout(() => {
      if (!responseSent) {
        responseSent = true;
        res.status(200).json({
          update: false,
        });
      }
    }, TIMEOUT);

    checkForUpdates();
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

      const schedule = await scheduleServices.deleteSchedule(
        user.id,
        scheduleId
      );
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

  reviewSchedule: async (req: Request, res: Response): Promise<void> => {
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

      const review = await scheduleServices.reviewSchedule(user.id, scheduleId);

      res.status(200).json({
        success: true,
        message: 'Agendamento em revisão',
        data: review,
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
