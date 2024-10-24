import { invitesRepository } from './../repository/invitesRepository';
import { tool } from '@langchain/core/tools';
import { date, z } from 'zod';
import { scheduleRepository } from '../repository/scheduleRepository';
import { proposedDateRepository } from '../repository/proposedDateRepository';
import { availabilityRepository } from '../repository/availabilityRepository';

const confirmScheduleSchema = z.object({
  scheduleId: z.string().describe('O id do agendamento.'),
  response: z
    .enum(['accepted', 'rejected', 'cancel'])
    .describe(
      'Resposta do usuário, pode ser "accepted caso o usuário tenha escolhido uma das datas propostas para a reunião, ou "rejected" caso o usuário deseje tentar marcar outra data que não foi proposta.'
    ),
  proposedDate: z
    .string()
    .describe(
      'A data proposta escolhida pelo host, ela tem que ser uma das que está proposta no chat. (Deve ter o fuso horarío do Brasil no formato AAAA-MM-DDThh:mm:ss-03:00)'
    ),
});

const confirmSchedule = tool(
  async ({ response, scheduleId, proposedDate }) => {
    try {
      if (response === 'accepted') {
        const proposedDateObj = new Date(proposedDate);

        const createdProposedDate =
          await proposedDateRepository.createProposedDate(
            scheduleId,
            proposedDate,
            'accepted'
          );

        const schedule = await scheduleRepository.updateScheduleStatus(
          scheduleId,
          'scheduled'
        );

        return 'O agendamento foi concluído!';
      }

      if (response === 'rejected') {
        await availabilityRepository.deleteAllAvailability(scheduleId);
        await proposedDateRepository.deleteAllProposedDate(scheduleId);

        const invites = await invitesRepository.updateAllInvitesToPending(
          scheduleId
        );

        return 'O usuário rejeitou as datas propostas, desconsidere todas as informações de datas propostas e disponibilidades anteriores, uma nova tentativa de marcar uma reunião será feita (Novo round), peça ao host suas novas disponibilidades para isso utilize a tool "createAvailabilities" quando o usuário fornecer as novas disponibilidades, e após ele fornecer, confirme com o host se já deve ser enviada as novas propostas para os convidados, para isso utilize a tool "newRound"';
      }

      if (response === 'cancel') {
        await scheduleRepository.cancelSchedule(scheduleId);

        return 'O agendamento foi cancelado a pedido do host.';
      }
    } catch (error: any) {
      console.log('error do tool de confirm schedule:', error);
      return error.message;
    }
  },
  {
    name: 'confirmSchedule',
    description: `
Este tool é utilizado para o host confirmar uma data para o agendamento após serem fornecidas as datas propostas para a reunião, cancelar a reunião ou tentar agendar outra data, colhendo novas disponibilidades do host.

- Se o host escolher uma das datas propostas a sua resposta será considerada "accepted".
- Se o convidado não afirmar querer alguma das datas, querer tentar outra data ou recusar, a sua resposta será considerada "rejected". Nesse caso, você deve pedir ao host para fornecer novas disponibilidades utilizando o tool "createAvailabilities" **antes** de prosseguir para o "newRound".
- Se o convidado disser que quer cancelar, sua resposta será considerada "cancel"
`,
    schema: confirmScheduleSchema,
  }
);

export default confirmSchedule;
