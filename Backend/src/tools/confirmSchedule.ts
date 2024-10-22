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
      'A data proposta escolhida pelo host, ela tem que ser uma das que está proposta no chat. (Deve ter o fuso horarío do Brasil)'
    ),
});

const confirmSchedule = tool(
  async ({ response, scheduleId, proposedDate }) => {
    try {
      console.log('Response:', response);

      if (response === 'accepted') {
        console.log('ppd:', proposedDate);

        const proposedDateObj = new Date(proposedDate);

        console.log('ppd obj:', proposedDateObj);

        const proposedDates = await proposedDateRepository.listAllProposedDate(
          scheduleId
        );

        console.log('ppds:', proposedDates);

        const selectedProposedDate = proposedDates.find((date) => {
          const proposedDateAsDate = date.proposed_date as Date;

          return (
            proposedDateAsDate.toISOString() === proposedDateObj.toISOString()
          );
        });

        if (!selectedProposedDate) {
          throw new Error(
            'A data proposta escolhida não está na lista de datas propostas.'
          );
        }

        console.log('SelectedProposedDate:', selectedProposedDate);

        const updatedProposedDate =
          proposedDateRepository.updateProposedDateStatus(
            selectedProposedDate!.id,
            'accepted'
          );

        console.log('updatedProposeDate:', updatedProposedDate);

        const schedule = await scheduleRepository.updateScheduleStatus(
          scheduleId,
          'scheduled'
        );

        console.log('Schedule:', schedule);
        return 'O agendamento foi concluído!';
      }

      if (response === 'rejected') {
        await availabilityRepository.deleteAllAvailability(scheduleId);
        await proposedDateRepository.deleteAllProposedDate(scheduleId);

        return 'O usuário rejeitou as datas propostas, desconsidere todas as informações de datas propostas e disponibilidades anteriores, uma nova tentativa de marcar uma reunião será feita (Novo round), peça ao host suas novas disponibilidades para isso utilize a tool "createAvailabilities" quando o usuário fornecer as novas disponibilidades, e após ele fornecer, confirme com o host se já deve ser enviada as novas propostas para os convidados, para isso utilize a tool "newRound"';
      }

      if (response === "cancel") {
        await scheduleRepository.cancelSchedule(scheduleId);

        return "O agendamento foi cancelado a pedido do host."
      }
    } catch (error: any) {
      console.log('error do tool de confirm schedule:', error);
      return error.message;
    }
  },
  {
    name: 'confirmSchedule',
    description: `
Este tool é utilizado para o host confirmar uma data para o agendamento após serem fornecidas as datas propostas para a reunião, cancelar a reunião ou tentar agendar outra data (recomeça o ciclo).

- Se o host escolher uma das datas propostas a sua resposta será considerada "accepted".
- Se o convidado disser que não quer nenhuma das opções de datas proposas a sua resposa será considerada "rejected".
- Se o convidado disser que quer cancelar, sua resposta será considerada "cancel"
`,
    schema: confirmScheduleSchema,
  }
);

export default confirmSchedule;
