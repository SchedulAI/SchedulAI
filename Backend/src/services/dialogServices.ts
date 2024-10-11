import * as dialogRepository from "../repository/dialogRepository";

export const getMessagesByDialogId = async (dialog_id: string, user_id: string): Promise<any> => {
    try {
        const dialog = await dialogRepository.getMessagesByDialogId(dialog_id);
        return dialog;
    } catch (error: any) {
        throw error;
    }
};
