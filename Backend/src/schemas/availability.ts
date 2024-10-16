import { z } from 'zod';

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

export default availabilitySchema;
