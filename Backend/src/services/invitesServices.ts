import { Invites } from '../entities/invitesEntity';
import { invitesRepository } from '../repository/invitesRepository';
import { scheduleRepository } from '../repository/scheduleRepository';
import { userRepository } from '../repository/userRepository';
import { ConflictException, NotFoundException } from '../utils/exceptions';

export const invitesServices = {
  createInvites: async (
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

    if (filteredList.length === 0) {
      throw new ConflictException(
        'Todos os Convites da Lista já foram enviados'
      );
    }

    return filteredList;
  },

  updateInvite: async (
    scheduleId: string,
    userEmail: string
  ): Promise<Invites> => {
    const schedule = await scheduleRepository.getScheduleById(scheduleId);

    if (!schedule) {
      throw new NotFoundException('Agendamento não encontrado');
    }

    const foundUser = await userRepository.findByEmail(userEmail);
    if (!foundUser) {
      throw new NotFoundException('Email não encontrado');
    }

    const foundInvite = await invitesRepository.listInvite(
      scheduleId,
      foundUser.id
    );

    if (!foundInvite) {
      throw new NotFoundException('Convite não encontrado');
    }

    const updatedInvite = await invitesRepository.updateStatus(foundUser.id);
    return updatedInvite;
  },
};
