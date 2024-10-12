import { Request, Response } from "express";
import { dialogServices } from "../services/dialogServices";
import errorResponse from "../utils/errorResponse";

export const dialogController = {
    getMessages: async (req: Request, res: Response): Promise<void> => {
        const dialog_id = req.params.dialog_id;
        const user = req.user!;
        try {
            const messages = await dialogServices.getMessages(
                dialog_id,
                user.id
            );

            res.status(200).json(messages);
        } catch (error: any) {
            console.log(error);
            errorResponse(res, error);
        }
    },
};
