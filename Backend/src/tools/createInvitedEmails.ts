import { tool } from '@langchain/core/tools';
import { z } from 'zod';
import { invitedEmailsRepository } from '../repository/invitedEmailsRepository';

const invitedEmailSchema = z
  .array(
    z.object({
      email: z.string().email().describe('O email do convidado.'),
      scheduleId: z.string().uuid().describe('O id do agendamento.'),
    })
  )
  .describe('Lista de emails convidados.');

const createInvitedEmails = tool(
  async ({ invitedEmails }) => {
    try {
      for (const invitedEmail of invitedEmails) {
        const { email, scheduleId } = invitedEmail;
        await invitedEmailsRepository.createInvitedEmail(email, scheduleId);
      }

      return 'Os emails dos convidados foram criados com sucesso! Pergunte ao host se já deve ser enviado os convites!';
    } catch (error: any) {
      return error.message;
    }
  },
  {
    name: 'createInvitedEmails',
    description:
      'Esse tool é exclusivo para hosts, cria a lista de e-emails dos convidados para aquele agendamento, após o usuário fornecer os emails.',
    schema: z.object({
      invitedEmails: invitedEmailSchema,
    }),
  }
);

export default createInvitedEmails;
