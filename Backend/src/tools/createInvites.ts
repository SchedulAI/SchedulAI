import { z } from 'zod';
import { invitesServices } from '../services/invitesServices';
import config from '../config';
import { tool } from '@langchain/core/tools';

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
