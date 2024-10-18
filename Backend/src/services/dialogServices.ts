import { Dialog } from '../entities/dialogEntity';
import { Message } from '../entities/messageEntity';
import { dialogRepository } from '../repository/dialogRepository';
import { NotFoundException } from '../utils/exceptions';
import { llm } from '../utils/llm';

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
  createDialog: async (
    scheduleId: string,
    userId: string,
    inviteId: string | null
  ): Promise<Dialog> => {
    const dialog = await dialogRepository.createDialog(userId, scheduleId);

    if (!inviteId) {
      await dialogRepository.saveMessage(
        dialog.id,
        `O id do usuário é ${userId}, O id do agendamento é ${scheduleId}, O usuário é o host`,
        'system'
      );
    } else {
      await dialogRepository.saveMessage(
        dialog.id,
        `O id do usuário é ${userId}, O id do agendamento é ${scheduleId},  O usuário é um convidado, o id do convite é ${inviteId}
        `,
        'system'
      );
    }

    await dialogRepository.saveMessage(dialog.id, llm.prompt, 'system');
    return dialog;
  },
};
