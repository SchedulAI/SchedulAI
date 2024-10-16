import { tool } from '@langchain/core/tools';
import { scheduleRepository } from '../repository/scheduleRepository';
import { ForbiddenException } from './exceptions';
import { invitedEmailsRepository } from '../repository/invitedEmailsRepository';
import updateScheduleInfoSchema from '../schemas/updateScheduleInfo';
import invitedEmailSchema from '../schemas/invitedEmails';
import { z } from 'zod';
import availabilitySchema from '../schemas/availability';
import { availabilityRepository } from '../repository/availabilityRepository';

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

const createAvailabilities = tool(
  async ({ availabilities }) => {
    try {
      for (const availability of availabilities) {
        const { schedule_id, user_id, start_time, end_time, week_day, notes } =
          availability;
        const result = await availabilityRepository.createAvailability(
          user_id,
          schedule_id,
          new Date(week_day + 'T00:00:00-03:00'),
          start_time,
          end_time,
          notes || ''
        );
      }

      return 'As disponibilidades do usuário para esse agendemanto foram criadas com sucesso!';
    } catch (error: any) {
      return error.message;
    }
  },
  {
    name: 'createAvailabilities',
    description:
      'Cria a lista de disponibilidades do usuário para aquele agendamento após o usuário fornecer seus horarios disponiveis.',
    schema: z.object({
      availabilities: availabilitySchema,
    }),
  }
);

const tools = [updateScheduleInfo, createInvitedEmails, createAvailabilities];

export const toolsByName: { [key: string]: any } = {
  updateScheduleInfo: updateScheduleInfo,
  createInvitedEmails: createInvitedEmails,
  createAvailabilities: createAvailabilities,
};

export default tools;
