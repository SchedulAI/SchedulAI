import { Schedule } from '../entities/scheduleEntity';
import { scheduleRepository } from '../repository/scheduleRepository';
import { BadRequestException, ForbiddenException } from '../utils/exceptions';

export const scheduleServices = {
  createSchedule: async (
    userId: string,
    title: string,
    description: string
  ): Promise<Schedule> => {
    try {
      const schedule = await scheduleRepository.createSchedule(
        title,
        description,
        userId
      );

      return schedule;
    } catch (error: any) {
      throw error;
    }
  },

  cancelSchedule: async (
    userId: string,
    scheduleId: string
  ): Promise<Schedule> => {
    try {
      const schedule = await scheduleRepository.getScheduleById(scheduleId);

      if (schedule.user_id !== userId) {
        throw new ForbiddenException('Você não é o dono desse agendamento.');
      }

      if (schedule.status === 'cancelled') {
        throw new BadRequestException('O agendamento já está cancelado.');
      }

      const cancelledSchedule = await scheduleRepository.cancelSchedule(
        scheduleId
      );

      return cancelledSchedule;
    } catch (error: any) {
      throw error;
    }
  },
  updateScheduleInfo: async (
    userId: string,
    scheduleId: string,
    title?: string,
    description?: string,
  ): Promise<Schedule> => {
    try {
      const schedule = await scheduleRepository.getScheduleById(scheduleId);

      if (!schedule) {
        throw new BadRequestException('Agendamento não encontrado.');
      }

      if (schedule.user_id !== userId) {
        throw new ForbiddenException('Você não é o dono desse agendamento.');
      }

      const updatedSchedule = await scheduleRepository.updateScheduleInfo(
        scheduleId,
        title || schedule.title,
        description || schedule.description,
      );

      return updatedSchedule;
    } catch (error: any) {
      throw error;
    }
  },
};
