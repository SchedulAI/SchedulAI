import { z } from 'zod';
import { invitesServices } from '../services/invitesServices';
import config from '../config';
import { tool } from '@langchain/core/tools';
import { scheduleRepository } from '../repository/scheduleRepository';
import { dialogRepository } from '../repository/dialogRepository';
import { availabilityRepository } from '../repository/availabilityRepository';
import formatAvailability from '../utils/formatAvailability';
import { dialogServices } from '../services/dialogServices';

const createInvitesSchema = z
  .object({
    scheduleId: z.string().uuid().describe('O ID do agendamento.'),
    emails: z
      .array(z.string().email().describe('Email do convidado.'))
      .describe('Lista de emails.'),
  })
  .describe('Schema para criação de convites.');

const createInvites = tool(
  async ({ scheduleId, emails }) => {
    try {
      const invites = await invitesServices.createInvitesByListOfEmails(
        scheduleId,
        emails
      );

      const schedule = await scheduleRepository.getScheduleById(scheduleId);

      const hostAvailabilities =
        await availabilityRepository.getAvailabilitiesByUserAndSchedule(
          schedule.user_id,
          scheduleId
        );

      const formatedAvailabilities = hostAvailabilities
        .map((availability) => formatAvailability(availability))
        .join('<br>');

      invites.forEach(async (invite) => {
        const dialog = await dialogServices.createDialog(
          scheduleId,
          invite.user_id,
          invite.id
        );

        const message = `Olá! Você foi convidado para o agendamento "${schedule.title}", criado pelo "${schedule.host_name}", por favor, me informe suas disponibilides! (Exemplo dia x das hh:mm as hh:mm)
        O anfitrião tem as seguintes disponibilidades:\n\n${formatedAvailabilities}
        `;

        await dialogRepository.saveMessage(dialog.id, message, 'IA');
      });

      await scheduleRepository.updateScheduleStatus(scheduleId, 'pending');

      return `Os convites para os usuários que já possuem conta foram criadas com sucesso, para aqueles que não têm conta devem acessar o seguinte link: ${config.HOSTNAME}:5173/invite/${scheduleId}`;
    } catch (error: any) {
      return error.message;
    }
  },
  {
    name: 'createInvites',
    description:
      'Esse tool é exclusivo para host, após o usuário fornecer todas as informações sobre um agendamento e confirmar as informações, cria os convites dos usuários que já têm conta na plataforma, e retorna o link de convite para ser mandado para os que não têm conta.',
    schema: createInvitesSchema,
  }
);

export default createInvites;
