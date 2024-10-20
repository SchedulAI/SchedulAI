import { availabilityRepository } from '../repository/availabilityRepository';
import { userRepository } from '../repository/userRepository';
import { scheduleRepository } from '../repository/scheduleRepository'; // Importa o scheduleRepository
import { Availability } from '../entities/availabilityEntity';
import {
  ForbiddenException,
  InternalServerException,
  NotFoundException,
} from '../utils/exceptions';

export const availabilityServices = {
  // Atualizar uma disponibilidade existente
  updateAvailability: async (
    userId: string,
    scheduleId: string,
    availabilityId: string,
    weekDay: Date,
    startTime: string,
    endTime: string,
    notes: string
  ): Promise<Availability> => {
    const schedule = await scheduleRepository.getScheduleById(scheduleId);
    if (!schedule) {
      throw new NotFoundException('Agendamento não encontrado');
    }

    const availability = await availabilityRepository.getAvailability(
      availabilityId
    );

    if (!availability) {
      throw new NotFoundException('Disponibilidade não encontrada');
    }

    if (availability.user_id !== userId) {
      throw new ForbiddenException(
        'Você não tem permissão para atualizar esta disponibilidade.'
      );
    }

    const updatedAvailability = await availabilityRepository.updateAvailability(
      availabilityId,
      weekDay,
      startTime,
      endTime,
      notes
    );

    return updatedAvailability;
  },

  // Deletar uma disponibilidade
  deleteAvailability: async (
    userId: string,
    scheduleId: string,
    availabilityId: string
  ): Promise<void> => {
    const schedule = await scheduleRepository.getScheduleById(scheduleId);
    if (!schedule) {
      throw new NotFoundException('Agendamento não encontrado');
    }

    const availability = await availabilityRepository.getAvailability(
      availabilityId
    );

    if (!availability) {
      throw new NotFoundException('Disponibilidade não encontrada');
    }

    if (availability.user_id !== userId) {
      throw new ForbiddenException(
        'Você não tem permissão para deletar esta disponibilidade.'
      );
    }

    await availabilityRepository.deleteAvailability(availabilityId);
  },

  // Obter uma disponibilidade
  getAvailability: async (
    scheduleId: string,
    availabilityId: string
  ): Promise<Availability> => {
    const schedule = await scheduleRepository.getScheduleById(scheduleId);
    if (!schedule) {
      throw new NotFoundException('Agendamento não encontrado');
    }

    const availability = await availabilityRepository.getAvailability(
      availabilityId
    );

    if (!availability) {
      throw new NotFoundException('Disponibilidade não encontrada');
    }
    return availability;
  },

  // Listar todas as disponibilidades de um agendamento
  getAllAvailabilities: async (scheduleId: string): Promise<Availability[]> => {
    const schedule = await scheduleRepository.getScheduleById(scheduleId);
    if (!schedule) {
      throw new NotFoundException('Agendamento não encontrado');
    }

    const availabilities = await availabilityRepository.getAllAvailabilities(
      scheduleId
    );

    if (!availabilities) {
      throw new NotFoundException(
        'Nenhuma disponibilidade encontrada para este agendamento'
      );
    }

    return availabilities;
  },
};
