import { ProposedDate } from '../entities/proposedDateEntity';
import { proposedDateRepository } from '../repository/proposedDateRepository';
import { scheduleRepository } from '../repository/scheduleRepository';
import {
  ConflictException,
  InternalServerException,
  NotFoundException,
} from '../utils/exceptions';

export const proposedDateServices = {
  // Criar uma nova data proposta
  createProposedDate: async (
    scheduleId: string,
    proposedDate: string,
    status: string
  ): Promise<ProposedDate> => {
    const schedule = await scheduleRepository.getScheduleById(scheduleId);

    if (!schedule) {
      throw new NotFoundException('O agendamento não foi encontrado');
    }

    const existentProposedDate = await proposedDateRepository.listProposedDate(
      scheduleId
    );

    if (existentProposedDate) {
      throw new ConflictException(
        'Já existe uma data proposta criada para esse agendamento'
      );
    }

    try {
      const newProposedDate = await proposedDateRepository.createProposedDate(
        scheduleId,
        proposedDate,
        status
      );
      return newProposedDate;
    } catch (error: any) {
      throw new InternalServerException('Erro ao criar a data proposta');
    }
  },

  // Listar datas propostas para um agendamento
  getProposedDates: async (scheduleId: string): Promise<ProposedDate> => {
    const schedule = await scheduleRepository.getScheduleById(scheduleId);

    if (!schedule) {
      throw new NotFoundException('O agendamento não foi encontrado');
    }

    const proposedDate = await proposedDateRepository.listProposedDate(
      scheduleId
    );

    if (!proposedDate) {
      throw new NotFoundException(
        'Nenhuma data proposta encontrada para este agendamento'
      );
    }

    return proposedDate;
  },

  // Atualizar o status de uma data proposta
  updateProposedDate: async (
    scheduleId: string,
    proposedDate: Date,
    status: string
  ): Promise<ProposedDate> => {
    const schedule = await scheduleRepository.getScheduleById(scheduleId);

    if (!schedule) {
      throw new NotFoundException('O agendamento não foi encontrado');
    }

    const existentProposedDate = await proposedDateRepository.listProposedDate(
      scheduleId
    );

    if (!existentProposedDate) {
      throw new NotFoundException('Data proposta não encontrada');
    }
    try {
      const updatedProposedDate =
        await proposedDateRepository.updateProposedDate(
          scheduleId,
          proposedDate,
          status
        );

      return updatedProposedDate;
    } catch (error: any) {
      throw new InternalServerException('Erro ao atualizar a data proposta');
    }
  },
};
