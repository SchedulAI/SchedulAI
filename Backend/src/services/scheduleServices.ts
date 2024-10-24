import { Schedule } from '../entities/scheduleEntity';
import { availabilityRepository } from '../repository/availabilityRepository';
import { invitesRepository } from '../repository/invitesRepository';
import { proposedDateRepository } from '../repository/proposedDateRepository';
import { scheduleRepository } from '../repository/scheduleRepository';
import { userRepository } from '../repository/userRepository';
import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
} from '../utils/exceptions';
import { invitedEmailsRepository } from '../repository/invitedEmailsRepository';
import matchAvailabilities from '../utils/matchAvailabilities';
import formatProposedDate from '../utils/formatProposedDate';
import { dialogRepository } from '../repository/dialogRepository';
import { AIMessage } from '@langchain/core/messages';

export const scheduleServices = {
  createSchedule: async (
    userId: string,
    title: string,
    description: string
  ): Promise<Schedule> => {
    const schedule = await scheduleRepository.createSchedule(
      title,
      description,
      userId
    );
    const is_host = userId === schedule.user_id;
    return { ...schedule, is_host };
  },

  getScheduleById: async (
    scheduleId: string,
    userId: string
  ): Promise<Schedule> => {
    const schedule = await scheduleRepository.getScheduleById(scheduleId);

    if (!schedule) {
      throw new NotFoundException('Agendamento não encontrado para o ID.');
    }

    const is_host = userId === schedule.user_id;

    const invitedEmails =
      await invitedEmailsRepository.getInvitedEmailsByScheduleId(schedule.id);

    const pending_account = await Promise.all(
      invitedEmails.map(async (e) => {
        const user = await userRepository.findByEmail(e.email);
        return user ? null : e.email;
      })
    ).then((results) => {
      // Filtrar nulos e remover duplicatas
      const uniqueEmails = new Set(results.filter((email) => email !== null));
      return Array.from(uniqueEmails);
    });

    // Buscar as informações complementares
    const [proposedDate, invites, availability] = await Promise.all([
      proposedDateRepository.listProposedDate(scheduleId),
      invitesRepository.listAllInvites(scheduleId),
      availabilityRepository.getAllAvailabilities(scheduleId),
    ]);

    // Retornar o agendamento com todos os dados complementares, incluindo o nome do host e convidados
    return {
      ...schedule,
      is_host,
      proposed_date: proposedDate || null,
      invites,
      availability,
      pending_account,
    };
  },

  getAllSchedules: async (userId: string): Promise<Schedule[]> => {
    const invites = await invitesRepository.listInvitesByUserId(userId);

    // Buscar os agendamentos baseados nos convites recebidos
    const schedulesFromInvites = await Promise.all(
      invites.map(async (invite) => {
        return await scheduleRepository.getScheduleById(invite.schedule_id);
      })
    );

    // Buscar os agendamentos criados pelo usuário
    const userSchedules = await scheduleRepository.getScheduleByUserId(userId);

    // Combinar os agendamentos e remover duplicatas
    const allSchedules = [...schedulesFromInvites, ...userSchedules];
    const uniqueSchedules = allSchedules.filter(
      (schedule, index, self) =>
        index === self.findIndex((s) => s.id === schedule.id)
    );

    // Filtrar agendamentos com status 'deleted'
    const filteredSchedules = uniqueSchedules.filter(
      (schedule) => schedule.status !== 'deleted'
    );

    // Processar cada agendamento para incluir informações adicionais
    const completeSchedules = await Promise.all(
      filteredSchedules.map(async (schedule) => {
        const is_host = userId === schedule.user_id;

        // Buscar o nome do host (criador do agendamento)
        const host = await userRepository.findById(schedule.user_id);

        // Buscar os emails convidados
        const invitedEmails =
          await invitedEmailsRepository.getInvitedEmailsByScheduleId(
            schedule.id
          );

        // Verificar quais emails têm cadastro
        const pending_account = await Promise.all(
          invitedEmails.map(async (e) => {
            const user = await userRepository.findByEmail(e.email);
            return user ? null : e.email;
          })
        ).then((results) => {
          // Filtrar nulos e remover duplicatas
          const uniqueEmails = new Set(
            results.filter((email) => email !== null)
          );
          return Array.from(uniqueEmails);
        });

        // Buscar as informações complementares para cada schedule
        const [proposedDate, invites, availability] = await Promise.all([
          proposedDateRepository.listProposedDate(schedule.id),
          invitesRepository.listAllInvites(schedule.id),
          availabilityRepository.getAllAvailabilities(schedule.id),
        ]);

        // Retornar o schedule com as informações complementares e nome do host
        return {
          ...schedule,
          is_host,
          host_name: host!.name,
          proposed_date: proposedDate || null,
          invites,
          availability,
          pending_account,
        };
      })
    );

    if (completeSchedules.length === 0) {
      throw new NotFoundException('Usuário não possui agendamentos');
    }

    return completeSchedules; // Retorna todos os schedules processados
  },

  reviewSchedule: async (
    userId: string,
    scheduleId: string
  ): Promise<Schedule> => {
    const schedule = await scheduleRepository.getScheduleById(scheduleId);

    if (!schedule) {
      throw new NotFoundException('Agendamento não encontrado.');
    }

    if (schedule.user_id !== userId) {
      throw new ForbiddenException('Você não é o dono desse agendamento.');
    }

    if (schedule.status === 'reviewing') {
      throw new BadRequestException('O agendamento já está sendo revisado.');
    }

    if (schedule.status === 'cancelled') {
      throw new BadRequestException('O agendamento está cancelado.');
    }

    if (schedule.status === 'deleted') {
      throw new BadRequestException('O agendamento está deletado.');
    }

    if (schedule.status === 'scheduled') {
      throw new BadRequestException('O agendamento já foi completado.');
    }

    if (schedule.status === 'planning') {
      throw new BadRequestException(
        'O agendamento ainda está em planejamento.'
      );
    }

    const allAvailabilities = await availabilityRepository.getAllAvailabilities(
      scheduleId
    );

    const hostAvailabilities = allAvailabilities!.filter(
      (availability) => availability.user_id === schedule.user_id
    );

    const guestAvailabilities = allAvailabilities!.filter(
      (availability) => availability.user_id !== schedule.user_id
    );

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

    const invites = await invitesRepository.listAllInvites(scheduleId);

    const rejectedInviteUsers = invites
      .filter((invite) => invite.status !== 'accepted')
      .map((invite) => invite.guest_name);

    const formattedRejectedInviteUsers =
      rejectedInviteUsers.length > 1
        ? rejectedInviteUsers.slice(0, -1).join(', ') +
          ' e ' +
          rejectedInviteUsers[rejectedInviteUsers.length - 1]
        : rejectedInviteUsers[0] || '';

    const message = new AIMessage(
      `Olá, os seguintes usuários recusaram ou não responderam o convite: ${formattedRejectedInviteUsers}.<br>Porém obtive as disponibilidades dos outros convidados e foi possivel chegas nos seguintes intervalos de horários possiveis para o agendamento:<br>${proposedDatesString}<br>Escolha um desses horários para a reunião, ou se desejar podemos começar outra tentativa de estabelecer uma nova data!`
    );

    await dialogRepository.saveMessage(
      dialog.id,
      JSON.stringify(message.toDict(), null, 2),
      'IA'
    );

    const reviewingSchedule = await scheduleRepository.updateScheduleStatus(
      scheduleId,
      'reviewing'
    );

    return reviewingSchedule;
  },

  deleteSchedule: async (
    userId: string,
    scheduleId: string
  ): Promise<Schedule> => {
    const schedule = await scheduleRepository.getScheduleById(scheduleId);

    if (schedule.user_id !== userId) {
      throw new ForbiddenException('Você não é o dono desse agendamento.');
    }

    if (schedule.status === 'deleted') {
      throw new BadRequestException('O agendamento já está deletado.');
    }

    const deletedSchedule = await scheduleRepository.deleteSchedule(scheduleId);

    return deletedSchedule;
  },

  cancelSchedule: async (
    userId: string,
    scheduleId: string
  ): Promise<Schedule> => {
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
  },
  updateScheduleInfo: async (
    userId: string,
    scheduleId: string,
    title?: string,
    description?: string,
    duration?: number
  ): Promise<Schedule> => {
    const schedule = await scheduleRepository.getScheduleById(scheduleId);

    if (!schedule) {
      throw new BadRequestException('Agendamento não encontrado.');
    }

    if (schedule.user_id !== userId) {
      throw new ForbiddenException('Você não é o dono desse agendamento.');
    }

    const updatedSchedule = await scheduleRepository.updateScheduleInfo(
      scheduleId,
      title || schedule.title,
      description || schedule.description,
      duration || schedule.duration
    );

    return updatedSchedule;
  },
};
