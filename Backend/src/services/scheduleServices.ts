import { Schedule } from '../entities/scheduleEntity';
import { scheduleRepository } from '../repository/scheduleRepository';

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
};
