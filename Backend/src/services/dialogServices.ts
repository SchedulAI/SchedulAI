import { Message } from '../entities/messageEntity';
import { dialogRepository } from '../repository/dialogRepository';
import { NotFoundException } from '../utils/exceptions';

export const dialogServices = {
  getMessages: async (
    scheduleId: string,
    userId: string
  ): Promise<Message[] | null> => {
    const dialog = await dialogRepository.getDialog(userId, scheduleId);

    if (!dialog) {
      throw new NotFoundException(
        'Não há diálogos do usuário associado ao agendamento.'
      );
    }

    const messages = await dialogRepository.getConversationByDialogId(
      dialog.id
    );

    if (!messages) {
      throw new NotFoundException('Não há mensagens neste dialogo.');
    }
    return messages;
  },
};
