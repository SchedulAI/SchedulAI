import { invitesRepository } from './../repository/invitesRepository';
import { tool } from '@langchain/core/tools';
import { z } from 'zod';
import { scheduleRepository } from '../repository/scheduleRepository';

const updateInviteStatusSchema = z.object({
  inviteId: z.string().describe('O id do convite.'),
  scheduleId: z.string().describe('O id do agendamento.'),
  status: z
    .enum(['accepted', 'rejected'])
    .describe(
      'Status do agendamento, pode ser "accepted" para quando o convidado tem disponibilidade ou "rejected" quando não tem disponibilidade.'
    ),
});

const updateInviteStatus = tool(
  async ({ inviteId, status, scheduleId }) => {
    try {
      invitesRepository.updateStatus(inviteId, status);

      const invites = await invitesRepository.listAllInvites(scheduleId);

      const isEverythingAnswered = invites.every(
        (invite) => invite.status !== 'pending'
      );

      if (isEverythingAnswered) {
        scheduleRepository.updateScheduleStatus(scheduleId, 'reviewing');
      }

      return 'O status do convite foi atualizado!';
    } catch (error: any) {
      return error.message;
    }
  },
  {
    name: 'updateInviteStatus',
    description:
      'Esse tool é exclusivo para convidados, muda o status de um convite para "accepted" para quando o convidado tem disponibilidade ou "rejected" quando não tem disponibilidade, porém antes e utilizar esse tool você deve confirmar com o usuário se ele realmente quer fazer isso.',
    schema: updateInviteStatusSchema,
  }
);

export default updateInviteStatus;
