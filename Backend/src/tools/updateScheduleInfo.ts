import { tool } from '@langchain/core/tools';
import { z } from 'zod';
import { ForbiddenException } from '../utils/exceptions';
import { scheduleRepository } from '../repository/scheduleRepository';

const updateScheduleInfoSchema = z.object({
  scheduleId: z.string().describe('O id do agendamento.'),
  title: z.string().describe('O titulo do agendamento.'),
  description: z.string().optional().describe('A descrição do evento.'),
  duration: z.number().describe('A duração do agendamento em minutos.'),
  userId: z.string().describe('O id do usuário que fez a requisição.'),
  hostId: z.string().describe('O id do dono do agendamento.'),
});

const updateScheduleInfo = tool(
  async ({ scheduleId, title, description, duration, userId, hostId }) => {
    try {
      if (hostId !== userId) {
        throw new ForbiddenException(
          'O usuário não pode alterar informações do agendamento pois não é dono dela.'
        );
      }

      const schedule = await scheduleRepository.updateScheduleInfo(
        scheduleId,
        title,
        description || '',
        duration
      );

      return 'O titulo, descrição e duração do agendamento foi atualizado, repasse para o usuário essas informações sobre o agendamento!';
    } catch (error: any) {
      return error.message;
    }
  },
  {
    name: 'updateScheduleInfo',
    description:
      'Preenche o titulo, descrição e a duração em minutos do agendamento, quando o user fornecer pela primeira vez.',
    schema: updateScheduleInfoSchema,
  }
);

export default updateScheduleInfo;
