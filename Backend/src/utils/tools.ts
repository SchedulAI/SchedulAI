import { tool } from '@langchain/core/tools';
import { z } from 'zod';
import { scheduleRepository } from '../repository/scheduleRepository';
import { ForbiddenException } from './exceptions';

const updateScheduleSchema = z.object({
  scheduleId: z.string().describe('O id do agendamento.'),
  title: z.string().describe('O titulo do agendamento.'),
  description: z.string().describe('A descrição do evento.'),
  userId: z.string().describe('O id do usuário que fez a requisição.'),
  hostId: z.string().describe('O id do dono do agendamento.'),
});

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
    schema: updateScheduleSchema,
  }
);

const tools = [updateScheduleInfo];

export const toolsByName: { [key: string]: any } = {
  updateScheduleInfo: updateScheduleInfo,
};

export default tools;
