import { SystemMessage } from '@langchain/core/messages';
import { Dialog } from '../entities/dialogEntity';
import { Message } from '../entities/messageEntity';
import { dialogRepository } from '../repository/dialogRepository';
import { scheduleRepository } from '../repository/scheduleRepository';
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

    const messages = (
      await dialogRepository.getConversationByDialogId(dialog.id)
    ).filter((msg) => msg.message.data.content !== '');

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

    // JSON.stringify(.toDict(), null, 2)

    if (!inviteId) {
      const systemMessage = new SystemMessage(
        `O id do usuário é ${userId}, O id do agendamento é ${scheduleId}, O usuário é o host`
      );

      await dialogRepository.saveMessage(
        dialog.id,
        JSON.stringify(systemMessage.toDict(), null, 2),
        'system'
      );
    } else {
      const schedule = await scheduleRepository.getScheduleById(scheduleId);

      const systemMessage = new SystemMessage(
        `O id do usuário é ${userId}, O id do agendamento é ${scheduleId},  O usuário é um convidado, o id do convite é ${inviteId}, a duração do agendamento será de ${schedule.duration} minutos.`
      );

      await dialogRepository.saveMessage(
        dialog.id,
        JSON.stringify(systemMessage.toDict(), null, 2),
        'system'
      );
    }

    const systemPromptMessage = new SystemMessage(llm.prompt);

    await dialogRepository.saveMessage(
      dialog.id,
      JSON.stringify(systemPromptMessage.toDict(), null, 2),
      'system'
    );
    return dialog;
  },
};
