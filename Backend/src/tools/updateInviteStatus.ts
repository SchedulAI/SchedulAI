import { invitedEmailsRepository } from './../repository/invitedEmailsRepository';
import { invitesRepository } from './../repository/invitesRepository';
import { tool } from '@langchain/core/tools';
import { z } from 'zod';
import { scheduleRepository } from '../repository/scheduleRepository';
import { availabilityRepository } from '../repository/availabilityRepository';
// import findPossibleScheduleDates from '../utils/findPossibleScheduleDates';
import pool from '../db';
import { proposedDateRepository } from '../repository/proposedDateRepository';
import formatProposedDate from '../utils/formatProposedDate';
import { dialogRepository } from '../repository/dialogRepository';
import { AIMessage } from '@langchain/core/messages';
import matchAvailabilities from '../utils/matchAvailabilities';

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

      const invitedEmails =
        await invitedEmailsRepository.getInvitedEmailsByScheduleId(scheduleId);

      const everyInviteWasSent = invites.length === invitedEmails.length;

      if (isEverythingAnswered && everyInviteWasSent) {
        const allAvailabilities =
          await availabilityRepository.getAllAvailabilities(scheduleId);

        const hostAvailabilities = allAvailabilities!.filter(
          (availability) => availability.user_id === schedule.user_id
        );

        const guestAvailabilities = allAvailabilities!.filter(
          (availability) => availability.user_id !== schedule.user_id
        );

        const rejectedInviteUsers = invites
          .filter((invite) => invite.status !== 'accepted')
          .map((invite) => invite.guest_name);

        const formattedRejectedInviteUsers =
          rejectedInviteUsers.length > 1
            ? rejectedInviteUsers.slice(0, -1).join(', ') +
              ' e ' +
              rejectedInviteUsers[rejectedInviteUsers.length - 1]
            : rejectedInviteUsers[0] || '';

        const proposedDates = matchAvailabilities(
          hostAvailabilities,
          guestAvailabilities
        );

        const proposedDatesString = proposedDates
          .filter((proposedDate) => proposedDate.accepted.length > 0)
          .map((proposedDate) => formatProposedDate(proposedDate))
          .join('<br>');

        const dialog = await dialogRepository.getDialog(
          schedule.user_id,
          scheduleId
        );

        const messageString =
          rejectedInviteUsers.length > 0
            ? `Olá, os seguintes usuários recusaram ou não responderam o convite: ${formattedRejectedInviteUsers}. Porém obtive as disponibilidades dos outros convidados e foi possivel chegar nos seguintes intervalos de horários possiveis para o agendamento:<br>${proposedDatesString}<br>Escolha um desses horários para a reunião, ou se desejar podemos começar outra tentativa de estabelecer uma nova data!`
            : `Olá, depois de analisar as disponibilidades de todos os envolvidos foi possivel chegar nos seguintes intervalos de horários possiveis para o agendamento:<br>${proposedDatesString}<br>Escolha um desses horários para a reunião, ou se desejar podemos começar outra tentativa de estabelecer uma nova data!`;

        const message = new AIMessage(messageString);

        await dialogRepository.saveMessage(
          dialog.id,
          JSON.stringify(message.toDict(), null, 2),
          'IA'
        );

        await scheduleRepository.updateScheduleStatus(scheduleId, 'reviewing');
      }

      return 'O status do convite foi atualizado!';
    } catch (error: any) {
      return 'Houve um erro ao atualizar o invite status, peça para o usuário mandar novamente';
    }
  },
  {
    name: 'updateInviteStatus',
    description: `
Este tool é utilizado para atualizar o status de um convite enviado para um convidado após o tool de disponibilidade ter retornado sua mensagem de sucesso.

- Se o convidado puder comparecer dentro de uma das disponibilidades do host e após a disponibilidade ser criada com sucesso, o status do convite será atualizado para "accepted".
- Se o convidado não puder comparecer em nenhuma das datas disponíveis do host, o status do convite será "rejected".

O tool também verifica se todos os convites foram respondidos. Caso todos os convidados tenham respondido, o sistema iniciará o processo de criação das datas propostas com base nas disponibilidades fornecidas.

Esse tool deve ser utilizado novamente após o usuário fornecer novas disponibilidades quando está iniciando um novo round.
`,
    schema: updateInviteStatusSchema,
  }
);

export default updateInviteStatus;
