import { z } from 'zod';

const invitedEmailSchema = z
  .array(
    z.object({
      email: z.string().email().describe('O email do convidado.'),
      scheduleId: z.string().uuid().describe('O id do agendamento.'),
    })
  )
  .describe('Lista de emails convidados.');

export default invitedEmailSchema;
