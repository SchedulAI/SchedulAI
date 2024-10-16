import { Message } from '../entities/messageEntity';
import { dialogRepository } from '../repository/dialogRepository';
import {
  InternalServerException,
  NotFoundException,
} from '../utils/exceptions';

export const dialogServices = {
  getMessages: async (
    scheduleId: string,
    userId: string
  ): Promise<Message[]> => {
    try {
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
    } catch (error: any) {
      throw new InternalServerException('Erro ao Buscar Mensagens');
    }
  },
};
