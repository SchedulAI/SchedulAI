import { Request, Response } from "express";
import * as dialogServices from "../services/dialogServices"

export const getMessagesByDialogId = async (req: Request, res: Response): Promise<void> => {
    const dialog_id = req.params.dialog_id;
    const user = req.user!
    try {
        const messages = await dialogServices.getMessagesByDialogId(dialog_id, user.id)
        
        res.status(200).json(messages);
    } catch (error: any) {
        console.log(error)
        res.status(400).json({ error: error.message });
    }
};
