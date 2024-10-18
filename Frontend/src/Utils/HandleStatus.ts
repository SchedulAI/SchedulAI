export const handleStatusColor = (status: string) => {
  switch (status) {
    case 'planning':
      return 'yellow';
    case 'pending':
      return 'yellow';
    case 'reviewing':
      return 'yellow';
    case 'cancelled':
      return 'red';
    case 'scheduled':
      return 'green';
    default:
      return 'red';
  }
};

export const handleRenderStatus = (status: string) => {
  switch (status) {
    case 'planning':
      return 'Em conversa com o host';
    case 'pending':
      return 'Aguardando convidados';
    case 'reviewing':
      return 'Aguardando confirmação do host';
    case 'cancelled':
      return 'Cancelado';
    case 'scheduled':
      return 'Reunião agendada';
    default:
      return 'Erro ao carregar status';
  }
};

export const handleInviteStatus = (status: string) => {
  switch (status) {
    case 'pending':
      return 'Aguardando convidados';
    case 'rejected':
      return 'Convite rejeitado';
    case 'accepted':
      return 'Presença confirmada';
    default:
      return 'Erro ao carregar status';
  }
};

export const handleRenderInviteStatus = (status: string) => {
  switch (status) {
    case 'pending':
      return 'yellow';
    case 'rejected':
      return 'red';
    case 'accepted':
      return 'green';
    default:
      return 'red';
  }
};
