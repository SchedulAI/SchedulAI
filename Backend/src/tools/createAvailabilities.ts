import { tool } from '@langchain/core/tools';
import { z } from 'zod';
import { availabilityRepository } from '../repository/availabilityRepository';
import { scheduleRepository } from '../repository/scheduleRepository';
import pool from '../db';
import { Availability } from '../entities/availabilityEntity';

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
      }

      await client.query('COMMIT');

      return 'As disponibilidades do usuário para esse agendamento foram criadas com sucesso!';
    } catch (error: any) {
      await client.query('ROLLBACK');
      return error.message;
    } finally {
      client.release();
    }
  },
  {
    name: 'createAvailabilities',
    description: `
Este tool cria uma lista de datas de disponibilidades do usuário para um agendamento específico, com base nas informações fornecidas. Ele requer que o usuário forneça a data e um intervalo de horas, que deve ser igual ou maior que a duração mínima da reunião.

- Para o **host**, cria as disponibilidades iniciais com base nas datas que ele forneceu para a reunião.
- Para o **convidado**, cria as disponibilidades com base nas datas fornecidas pelo host e na resposta do convidado, que informa os dias e horários que ele pode participar. Se o convidado não puder comparecer, o tool não cria nenhuma disponibilidade para ele.

Antes de executar o tool, confirme com o usuário se as informações estão corretas. Em caso de erro, solicite que o usuário forneça os dados novamente.
`,
    schema: z.object({
      availabilities: availabilitySchema,
    }),
  }
);

export default createAvailabilities;
