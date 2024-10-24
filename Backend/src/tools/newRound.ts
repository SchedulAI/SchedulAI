import { z } from 'zod';
import { invitesServices } from '../services/invitesServices';
import config from '../config';
import { tool } from '@langchain/core/tools';
import { scheduleRepository } from '../repository/scheduleRepository';
import { dialogRepository } from '../repository/dialogRepository';
import { availabilityRepository } from '../repository/availabilityRepository';
import formatAvailability from '../utils/formatAvailability';
import { dialogServices } from '../services/dialogServices';
import { AIMessage, SystemMessage } from '@langchain/core/messages';
import { invitesRepository } from '../repository/invitesRepository';

const newRoundSchema = z
  .object({
    scheduleId: z.string().uuid().describe('O ID do agendamento.'),
  })
  .describe('Schema para criação de convites.');

const newRound = tool(
  async ({ scheduleId }) => {
    try {
      const schedule = await scheduleRepository.getScheduleById(scheduleId);

      const hostAvailabilities =
        await availabilityRepository.getAvailabilitiesByUserAndSchedule(
          schedule.user_id,
          scheduleId
        );

      const formatedAvailabilities = hostAvailabilities
        .map((availability) => formatAvailability(availability))
        .join('<br>');

      const invites = await invitesRepository.listAllInvites(scheduleId);

      invites.forEach(async (invite) => {
        const dialog = await dialogRepository.getDialog(
          invite.user_id,
          scheduleId
        );

        const newRoundMessage = new SystemMessage(`Iniciando um novo round!`);

        await dialogRepository.saveMessage(
          dialog.id,
          JSON.stringify(newRoundMessage.toDict(), null, 2),
          'IA'
        );

        const message =
          new AIMessage(`Olá! O anfitrião decidiu tentar outros horários para a reunião "${schedule.title}", por favor, me informe suas disponibilides para as novas disponibilidades do anfitrião! (Exemplo dia x das hh:mm as hh:mm)<br>O anfitrião afirmou as seguintes disponibilidades:<br><br>${formatedAvailabilities}
        `);

        await dialogRepository.saveMessage(
          dialog.id,
          JSON.stringify(message.toDict(), null, 2),
          'system'
        );
      });

      await scheduleRepository.updateScheduleStatus(scheduleId, 'pending');

      return `As novas disponibilidades foram compartilhadas com os convidados`;
    } catch (error: any) {
      return error.message;
    }
  },
  {
    name: 'newRound',
    description:
      'Esse tool é exclusivo para um host e só deve ser usado depois que o host tiver usado um confirmSchedule com a resposta rejected. Após o host rejeitar as datas propostas de uma reunião e fornecer novas disponibilidades, esse tool deve ser usado para enviar para os convidados as novas disponibilidades do host para a reunião.',
    schema: newRoundSchema,
  }
);

export default newRound;
