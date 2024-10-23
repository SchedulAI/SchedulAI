import { IntervalResult } from './matchAvailabilities';

const formatProposedDate = (proposed_data: IntervalResult) => {
  console.log('proposeddate no format:', proposed_data);

  const startDate = new Date(proposed_data.date);

  // Extraindo o dia, mês e ano
  const day = String(startDate.getDate()).padStart(2, '0');
  const month = String(startDate.getMonth() + 1).padStart(2, '0');
  const year = startDate.getFullYear();

  const rejectedUsers = proposed_data.rejected
    .map((rejected) => rejected.user_name)
    .join(', ');

  const detail =
    proposed_data.rejected.length > 0
      ? `Não podem ir nesse horário: ${rejectedUsers}`
      : 'Todos podem ir nesse periodo.';

  return `<br>**${day}/${month}/${year}** das **${proposed_data.start}** até **${proposed_data.end}** - [${detail}]</br>`;
};

export default formatProposedDate;
