import { IntervalResult } from './matchAvailabilities';

const formatProposedDate = (proposed_data: IntervalResult) => {
  // Tratando a data diretamente sem converter para UTC
  const [year, month, day] = proposed_data.date.split('-');

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
