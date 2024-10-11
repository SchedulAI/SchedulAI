import * as scheduleRepository from "../repository/scheduleRepository";

export const createSchedule = async (
    title: string,
    description: string,
    userId: string
): Promise<void> => {
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
};
