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

    return schedule;
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

    // Processar cada agendamento para incluir informações adicionais
    const completeSchedules = await Promise.all(
      uniqueSchedules.map(async (schedule) => {
        const is_host = userId === schedule.user_id;

        // Buscar o nome do host (criador do agendamento)
        const host = await userRepository.findById(schedule.user_id);

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
        };
      })
    );

    if (completeSchedules.length === 0) {
      throw new NotFoundException('Usuário não possui agendamentos');
    }

    return completeSchedules; // Retorna todos os schedules processados
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
    description?: string
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
      description || schedule.description
    );

    return updatedSchedule;
  },
};
