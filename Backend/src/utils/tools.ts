import { tool } from '@langchain/core/tools';
import { scheduleRepository } from '../repository/scheduleRepository';
import { ForbiddenException } from './exceptions';
import { invitedEmailsRepository } from '../repository/invitedEmailsRepository';
import updateScheduleInfoSchema from '../schemas/updateScheduleInfo';
import invitedEmailSchema from '../schemas/invitedEmails';
import { z } from 'zod';

const updateScheduleInfo = tool(
  async ({ scheduleId, title, description, userId, hostId }) => {
    try {
      if (hostId !== userId) {
        throw new ForbiddenException(
          'O usuário não pode alterar informações da schule pois não é dono dela.'
        );
      }

      await scheduleRepository.updateScheduleInfo(
        scheduleId,
        title,
        description
      );
      return 'O titulo e descrição do agendamento foi atualizado!';
    } catch (error: any) {
      return error.message;
    }
  },
  {
    name: 'updateScheduleInfo',
    description:
      'Pode preencher o titulo e a descrição, quando o user fornecer pela primeira vez.',
    schema: updateScheduleInfoSchema,
  }
);

const createInvitedEmails = tool(
  async ({ invitedEmails }) => {
    try {
      for (const invitedEmail of invitedEmails) {
        const { email, scheduleId } = invitedEmail;
        await invitedEmailsRepository.createInvitedEmail(email, scheduleId);
      }

      return 'Os emails dos convidados foram criados com sucesso!';
    } catch (error: any) {
      return error.message;
    }
  },
  {
    name: 'createInvitedEmails',
    description:
      'Cria a lista de e-emails dos convidados para aquele agendamento, após o usuário fornecer.',
    schema: z.object({
      invitedEmails: invitedEmailSchema,
    }),
  }
);
const tools = [updateScheduleInfo, createInvitedEmails];

export const toolsByName: { [key: string]: any } = {
  updateScheduleInfo: updateScheduleInfo,
  createInvitedEmails: createInvitedEmails,
};

export default tools;
