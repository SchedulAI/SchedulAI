import { Invites } from '../entities/invitesEntity';
import { Schedule } from '../entities/scheduleEntity';
import { invitesRepository } from '../repository/invitesRepository';
import { scheduleRepository } from '../repository/scheduleRepository';
import { userRepository } from '../repository/userRepository';
import {
  BadRequestException,
  ForbiddenException,
  InternalServerException,
  NotFoundException,
} from '../utils/exceptions';

export const scheduleServices = {
  createSchedule: async (
    userId: string,
    title: string,
    description: string
  ): Promise<Schedule> => {
    try {
      const schedule = await scheduleRepository.createSchedule(
        title,
        description,
        userId
      );

      return schedule;
    } catch (error: any) {
      throw new InternalServerException('Não foi possível Criar o Agendamento');
    }
  },

  cancelSchedule: async (
    userId: string,
    scheduleId: string
  ): Promise<Schedule> => {
    try {
      const schedule = await scheduleRepository.getScheduleById(scheduleId);

      if (schedule.user_id !== userId) {
        throw new ForbiddenException('Você não é o dono desse agendamento.');
      }

      if (schedule.status === 'cancelled') {
        throw new BadRequestException('O agendamento já está cancelado.');
      }

      const cancelledSchedule = await scheduleRepository.cancelSchedule(
        scheduleId
      );

      return cancelledSchedule;
    } catch (error: any) {
      throw new InternalServerException(
        'Não foi possível Cancelar o Agendamento'
      );
    }
  },
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

    // Aqui, `validEmails` contém os emails dos usuários válidos e `invalidEmails` contém os emails inválidos.
    console.log('Emails válidos:', validUsers);
    console.log('Emails inválidos:', invalidUsers);

    if (validUsers.length < 1) {
      throw new BadRequestException('Email(s) fornecido(s) Inválido(s)');
    }

    // Agora são lançados no banco os Invites para os usuários válidos
    try {
      const inviteList = await Promise.all(
        validUsers.map(async (user) => {
          const invite = await invitesRepository.createInvite(scheduleId, user);
          return invite;
        })
      );

      return inviteList;
    } catch (error: any) {
      throw new InternalServerException('Erro ao processar os Convites');
    }
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
    const updatedInvite = await invitesRepository.updateStatus(foundUser.id);
    return updatedInvite;
  },
};
