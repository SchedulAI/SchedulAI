import { z } from 'zod';

const updateScheduleInfoSchema = z.object({
  scheduleId: z.string().describe('O id do agendamento.'),
  title: z.string().describe('O titulo do agendamento.'),
  description: z.string().describe('A descrição do evento.'),
  userId: z.string().describe('O id do usuário que fez a requisição.'),
  hostId: z.string().describe('O id do dono do agendamento.'),
});

export default updateScheduleInfoSchema;
