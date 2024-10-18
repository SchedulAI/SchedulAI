import { z } from 'zod';
import { invitesServices } from '../services/invitesServices';
import config from '../config';
import { tool } from '@langchain/core/tools';
import { scheduleRepository } from '../repository/scheduleRepository';
import { dialogRepository } from '../repository/dialogRepository';
import { availabilityRepository } from '../repository/availabilityRepository';
import { llm } from '../utils/llm';

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
      const invites = await invitesServices.createInvites(scheduleId, emails);
      const schedule = await scheduleRepository.getScheduleById(scheduleId);
      const hostAvailabilities =
        await availabilityRepository.getAvailabilitiesByUserAndSchedule(
          schedule.user_id,
          scheduleId
        );

      const formatedAvailabilities = hostAvailabilities
        .map((availability) => {
          const weekDay = new Date(availability.week_day);

          const day = String(weekDay.getDate()).padStart(2, '0');
          const month = String(weekDay.getMonth() + 1).padStart(2, '0');
          const year = weekDay.getFullYear();

          const startTime = availability.start_time.slice(0, 5); // hh:mm
          const endTime = availability.end_time.slice(0, 5); // hh:mm

          return `**${day}/${month}/${year}** das **${startTime}** até **${endTime}**`;
        })
        .join('\n');

      invites.forEach(async (invite) => {
        const dialog = await dialogRepository.createDialog(
          invite.user_id,
          scheduleId
        );

        await dialogRepository.saveMessage(
          dialog.id,
          `O id do usuário é ${invite.user_id}, O id do agendamento é ${scheduleId},  O usuário é um convidado, o id do convite é ${invite.id}
          `,
          'system'
        );

        await dialogRepository.saveMessage(dialog.id, llm.prompt, 'system');

        const message = `Olá! Você foi convidado para o agendamento "${schedule.title}", criado pelo "${schedule.host_name}", por favor, me informe em se tem disponibilide em uma ou mais das seguintes disponibilidades:
        
        ${formatedAvailabilities}
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
      'Após o usuário fornecer todas as informações sobre um agendamento e confirmar as informações, cria os convites dos usuários que já têm conta na plataforma, e retorna o link de convite para ser mandado para os que não têm conta.',
    schema: createInvitesSchema,
  }
);

export default createInvites;
