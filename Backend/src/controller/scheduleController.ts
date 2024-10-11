import * as scheduleServices from "./../services/scheduleServices";
import { Request, Response } from "express";

export const createSchedule = async (req: Request, res: Response): Promise<void> => {
    const { title, description } = req.body;
    const user = req.user!;
    try {
        if (!title) {
            res.status(400).json({ error: "O agendamento precisa de um título!" });
            return;
        }

        const schedule = await scheduleServices.createSchedule(
            user.id,
            title,
            description
        );

        res.status(200).json(schedule);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};
