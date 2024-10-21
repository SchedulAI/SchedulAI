import { AIMessage } from '@langchain/core/messages';
import { Invites } from '../entities/invitesEntity';
import { availabilityRepository } from '../repository/availabilityRepository';
import { dialogRepository } from '../repository/dialogRepository';
import { invitedEmailsRepository } from '../repository/invitedEmailsRepository';
import { invitesRepository } from '../repository/invitesRepository';
import { scheduleRepository } from '../repository/scheduleRepository';
import { userRepository } from '../repository/userRepository';
import {
  ConflictException,
  ForbiddenException,
  NotFoundException,
} from '../utils/exceptions';
import formatAvailability from '../utils/formatAvailability';
import { dialogServices } from './dialogServices';

export const invitesServices = {
  createInvitesByListOfEmails: async (
    scheduleId: string,
    userEmails: string[]
  ): Promise<Invites[]> => {
    const schedule = await scheduleRepository.getScheduleById(scheduleId);

    if (!schedule) {
      throw new NotFoundException('Agendamento não encontrado');
    }

    // Obtém os usuários e lida com os erros.
    const users = await Promise.all(
      userEmails.map(async (email) => {
        try {
          const foundUser = await userRepository.findByEmail(email);
          if (!foundUser) {
            throw new Error();
          }
          return { user: foundUser.id, error: false };
        } catch (error: any) {
          return { user: email, error: true };
        }
      })
    );

    // Filtra apenas os usuários válidos
    const validUsers = users
      .filter((user) => user.error !== true)
      .map((user) => user.user);

    // Filtra os usuários inválidos
    const invalidUsers = users
      .filter((user) => user.error !== false)
      .map((user) => user.user); // Mapeia para obter apenas os emails inválidos

    // Agora são lançados no banco os Invites para os usuários válidos
    const inviteList = await Promise.all(
      validUsers.map(async (user) => {
        // Verifica se um convite já foi enviado, caso sim, o descarta
        const alreadySent = await invitesRepository.listInvite(
          scheduleId,
          user
        );
        if (alreadySent) {
          return;
        }
        const invite = await invitesRepository.createInvite(scheduleId, user);
        return invite;
      })
    );

    // Filtra a lista removendo os undefined
    const filteredList = inviteList.filter((item) => item !== undefined);

    return filteredList;
  },
  createInvite: async (
    userId: string,
    scheduleId: string
  ): Promise<Invites> => {
    const schedule = await scheduleRepository.getScheduleById(scheduleId);
    if (!schedule) {
      throw new NotFoundException('Agendamento não encontrado');
    }

    const user = await userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const invitedEmails =
      await invitedEmailsRepository.getInvitedEmailsByScheduleId(scheduleId);

    const isInvited = invitedEmails.some(
      (invitedEmail) => invitedEmail.email === user.email
    );

    if (!isInvited) {
      throw new ForbiddenException(
        'O usuário não está convidado para o agendamento.'
      );
    }

    const createdInvite = await invitesRepository.createInvite(
      scheduleId,
      user.id
    );

    const hostAvailabilities =
      await availabilityRepository.getAvailabilitiesByUserAndSchedule(
        schedule.user_id,
        scheduleId
      );

    const formatedAvailabilities = hostAvailabilities
      .map((availability) => formatAvailability(availability))
      .join('\n');

    const dialog = await dialogServices.createDialog(
      scheduleId,
      createdInvite.user_id,
      createdInvite.id
    );

    const message =
      new AIMessage(`Olá! Você foi convidado para o agendamento "${schedule.title}", criado pelo "${schedule.host_name}", por favor, me informe em se tem disponibilide em uma ou mais das seguintes disponibilidades:\n\n${formatedAvailabilities}
      `);

    await dialogRepository.saveMessage(
      dialog.id,
      JSON.stringify(message.toDict(), null, 2),
      'IA'
    );

    return createdInvite;
  },
};
