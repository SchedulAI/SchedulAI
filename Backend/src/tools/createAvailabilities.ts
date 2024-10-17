import { tool } from '@langchain/core/tools';
import { z } from 'zod';
import { availabilityRepository } from '../repository/availabilityRepository';

const availabilitySchema = z
  .array(
    z.object({
      schedule_id: z.string().uuid().describe('O id do agendamento atual.'),
      user_id: z.string().uuid().describe('O id do usuário atual.'),
      week_day: z.string().describe('O dia da semana disponível. (Data)'),
      start_time: z
        .string()
        .describe('O horário de início da disponibilidade no formato HH:mm.'),
      end_time: z
        .string()
        .describe('O horário de término da disponibilidade no formato HH:mm.'),
      notes: z
        .string()
        .optional()
        .describe('Notas opcionais sobre a disponibilidade.'),
    })
  )
  .describe('Lista de disponibilidades do usuário para a reunião.');

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

export default createAvailabilities;
