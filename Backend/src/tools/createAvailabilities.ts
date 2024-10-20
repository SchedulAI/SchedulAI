import { tool } from '@langchain/core/tools';
import { z } from 'zod';
import { availabilityRepository } from '../repository/availabilityRepository';
import { scheduleRepository } from '../repository/scheduleRepository';
import pool from '../db';
import { Availability } from '../entities/availabilityEntity';
import { proposedDateRepository } from '../repository/proposedDateRepository';

const availabilitySchema = z
  .array(
    z.object({
      schedule_id: z.string().uuid().describe('O id do agendamento atual.'),
      user_id: z.string().uuid().describe('O id do usuário atual.'),
      week_day: z
        .string()
        .describe(
          'A data que o usuário está disponivel no formato aaaa-mm-dd.'
        ),
      start_time: z
        .string()
        .describe('O horário de início da disponibilidade no formato HH:mm.'),
      end_time: z
        .string()
        .describe('O horário de término da disponibilidade no formato HH:mm.'),
      notes: z
        .string()
        .optional()
        .describe('Notas opcionais sobre a disponibilidade.'),
    })
  )
  .describe('Lista de disponibilidades do usuário para a reunião.');

const createAvailabilities = tool(
  async ({ availabilities }) => {
    const client = await pool.connect(); // Obtenha a conexão do pool
    try {
      const schedule = await scheduleRepository.getScheduleById(
        availabilities[0].schedule_id
      );
      const duration = schedule.duration; // Duração esperada em minutos

      const createdAvailabilities: Availability[] = [];

      // Iniciar a transação
      await client.query('BEGIN');

      for (const availability of availabilities) {
        const { schedule_id, user_id, start_time, end_time, week_day, notes } =
          availability;

        const startTimeString = `${week_day}T${start_time}:00-03:00`;
        const endTimeString = `${week_day}T${end_time}:00-03:00`;

        // Converter o horário de início e término para objetos de data
        const startTimeDate = new Date(startTimeString);
        const endTimeDate = new Date(endTimeString);

        // Calcular a diferença em minutos
        const timeDiffMinutes =
          (endTimeDate.getTime() - startTimeDate.getTime()) / (1000 * 60);

        if (timeDiffMinutes < duration) {
          throw new Error(
            `O intervalo entre ${start_time} e ${end_time} da data ${week_day} é menor do que a duração mínima da reunião que é ${duration} minutos.`
          );
        }

        const createdAvailability =
          await availabilityRepository.createAvailability(
            client, // Passar o client para manter a transação
            user_id,
            schedule_id,
            week_day,
            start_time,
            end_time,
            notes || ''
          );

        createdAvailabilities.push(createdAvailability);

        const currentDate = new Date(startTimeString);
        while (currentDate < endTimeDate) {
          // Criar string ISO para o horário atual com timezone Brasil
          const proposedDateStr = currentDate
            .toISOString()
            .slice(0, 19)
            .replace('T', ' ');

          // Criar proposed date
          const createdProposedData =
            await proposedDateRepository.createProposedDate(
              client,
              schedule_id,
              proposedDateStr,
              'pending'
            );

          // Avançar para o próximo intervalo
          currentDate.setMinutes(currentDate.getMinutes() + duration);

          // Se o próximo intervalo ultrapassar o horário final, parar
          if (currentDate > endTimeDate) {
            break;
          }
        }
      }

      // Commit da transação se tudo der certo
      await client.query('COMMIT');

      return 'As disponibilidades do usuário para esse agendamento foram criadas com sucesso!';
    } catch (error: any) {
      // Rollback em caso de erro
      await client.query('ROLLBACK');
      return error.message;
    } finally {
      client.release();
    }
  },
  {
    name: 'createAvailabilities',
    description:
      'Cria a lista de datas de disponibilidades do usuário para aquele agendamento, ele deve conter a "range" de horas obrigatoriamente para a data e esse range tem que ser igual ou maior que a duração da reunião, além disso antes de executar esse tool confirme com o usuário se a data e hora estão corretas, em caso de erro peça novamente a disponibilidade.',
    schema: z.object({
      availabilities: availabilitySchema,
    }),
  }
);

export default createAvailabilities;

