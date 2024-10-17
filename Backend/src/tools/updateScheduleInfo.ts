import { tool } from '@langchain/core/tools';
import { z } from 'zod';
import { ForbiddenException } from '../utils/exceptions';
import { scheduleRepository } from '../repository/scheduleRepository';

const updateScheduleInfoSchema = z.object({
  scheduleId: z.string().describe('O id do agendamento.'),
  title: z.string().describe('O titulo do agendamento.'),
  description: z.string().optional().describe('A descrição do evento.'),
  userId: z.string().describe('O id do usuário que fez a requisição.'),
  hostId: z.string().describe('O id do dono do agendamento.'),
});

const updateScheduleInfo = tool(
  async ({ scheduleId, title, description, userId, hostId }) => {
    try {
      if (hostId !== userId) {
        throw new ForbiddenException(
          'O usuário não pode alterar informações do agendamento pois não é dono dela.'
        );
      }

      await scheduleRepository.updateScheduleInfo(
        scheduleId,
        title,
        description || ""
      );
      return 'O titulo e descrição do agendamento foi atualizado!';
    } catch (error: any) {
      return error.message;
    }
  },
  {
    name: 'updateScheduleInfo',
    description:
      'Preenche o titulo e a descrição do agendamento, quando o user fornecer pela primeira vez.',
    schema: updateScheduleInfoSchema,
  }
);

export default updateScheduleInfo;
