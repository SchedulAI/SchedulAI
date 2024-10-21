import { invitesRepository } from './../repository/invitesRepository';
import { tool } from '@langchain/core/tools';
import { z } from 'zod';
import { scheduleRepository } from '../repository/scheduleRepository';
import { availabilityRepository } from '../repository/availabilityRepository';
import findPossibleScheduleDates from '../utils/findPossibleScheduleDates';
import pool from '../db';
import { proposedDateRepository } from '../repository/proposedDateRepository';
import formatProposedDate from '../utils/formatProposedDate';
import { dialogRepository } from '../repository/dialogRepository';

const updateInviteStatusSchema = z.object({
  inviteId: z.string().describe('O id do convite.'),
  scheduleId: z.string().describe('O id do agendamento.'),
  status: z
    .enum(['accepted', 'rejected'])
    .describe(
      'Status do agendamento, pode ser "accepted" para quando o convidado tem disponibilidade dentro da disponibilidade do host ou "rejected" quando não tem disponibilidade.'
    ),
});

const updateInviteStatus = tool(
  async ({ inviteId, status, scheduleId }) => {
    try {
      const schedule = await scheduleRepository.getScheduleById(scheduleId);

      await invitesRepository.updateStatus(inviteId, status);

      const invites = await invitesRepository.listAllInvites(scheduleId);

      const isEverythingAnswered = invites.every(
        (invite) => invite.status !== 'pending'
      );

      if (isEverythingAnswered) {
        const allAvailabilities =
          await availabilityRepository.getAllAvailabilities(scheduleId);

        const hostAvailabilities = allAvailabilities!.filter(
          (availability) => availability.user_id === schedule.user_id
        );

        const guestAvailabilities = allAvailabilities!.filter(
          (availability) => availability.user_id !== schedule.user_id
        );

        const proposedDates = findPossibleScheduleDates(
          hostAvailabilities,
          guestAvailabilities,
          schedule.duration
        );

        const client = await pool.connect(); // Obtenha a conexão do pool

        await client.query('BEGIN');

        proposedDates.forEach(async (proposedDate) => {
          const createdProposedDate =
            await proposedDateRepository.createProposedDate(
              client,
              scheduleId,
              proposedDate.proposed_date,
              'pending'
            );
        });

        await client.query('COMMIT');

        client.release();

        const formatedProposedDate = proposedDates
          .map((proposed_data) =>
            formatProposedDate(proposed_data.proposed_date, schedule.duration)
          )
          .join('<br>');

        const dialog = await dialogRepository.getDialog(
          schedule.user_id,
          scheduleId
        );

        const message = `Olá, após obter e analisar todas as disponibilidades, obtivemos as seguintes possiveis datas para o agendamento:<br><br>${formatedProposedDate}<br><br>Escolha alguma das datas para confirmar a reunião, ou se desejar podemos começar outra tentativa de estabelecer uma nova data!`;

        await dialogRepository.saveMessage(dialog.id, message, 'IA');

        await scheduleRepository.updateScheduleStatus(scheduleId, 'reviewing');
      }

      return 'O status do convite foi atualizado!';
    } catch (error: any) {
      console.log('error do tool de invite:', error);
      return error.message;
    }
  },
  {
    name: 'updateInviteStatus',
    description: `
Este tool é utilizado para atualizar o status de um convite enviado para um convidado após o tool de disponibilidade ter retornado sua mensagem de sucesso.

- Se o convidado puder comparecer dentro de uma das disponibilidades do host, o status do convite será atualizado para "accepted".
- Se o convidado não puder comparecer em nenhuma das datas disponíveis do host, o status do convite será "rejected".

O tool também verifica se todos os convites foram respondidos. Caso todos os convidados tenham respondido, o sistema iniciará o processo de criação das datas propostas com base nas disponibilidades fornecidas.
`,
    schema: updateInviteStatusSchema,
  }
);

export default updateInviteStatus;
