import { Message } from '../entities/messageEntity';
import { dialogRepository } from '../repository/dialogRepository';
import {
  InternalServerException,
  NotFoundException,
} from '../utils/exceptions';

export const dialogServices = {
  getMessages: async (dialogId: string, userId: string): Promise<Message[]> => {
    try {
      const dialog = await dialogRepository.getDialogsByUserId(userId);

      if (!dialog) {
        throw new NotFoundException('Não há diálogos associados ao User ID');
      }

      const messages = await dialogRepository.getMessagesByDialogId(dialogId);

      if (!messages) {
        throw new NotFoundException('Não há mensagens associadas ao User ID');
      }
      return messages;
    } catch (error: any) {
      throw new InternalServerException('Erro ao Buscar Mensagens');
    }
  },
};
