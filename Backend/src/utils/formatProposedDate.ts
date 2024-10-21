const formatProposedDate = (proposed_data: string, duration: number) => {
  const startDate = new Date(proposed_data);

  // Extraindo o dia, mês e ano
  const day = String(startDate.getDate()).padStart(2, '0');
  const month = String(startDate.getMonth() + 1).padStart(2, '0');
  const year = startDate.getFullYear();

  const startTime = startDate.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const endDate = new Date(startDate.getTime() + duration * 60000);
  const endTime = endDate.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return `**${day}/${month}/${year}** das **${startTime}** até **${endTime}**`;
};

export default formatProposedDate;
