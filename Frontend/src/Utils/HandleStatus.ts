export const handleStatusColor = (status: string) => {
  switch (status) {
    case 'planning':
      return 'yellow';
    case 'peding':
      return 'yellow';
    case 'reviewing':
      return 'yellow';
    case 'cancelled':
      return 'red';
    default:
      return 'green';
  }
};

export const handleRenderStatus = (status: string) => {
  switch (status) {
    case 'planning':
      return 'Em conversa com o host';
    case 'peding':
      return 'Esperando resposta dos convidados';
    case 'reviewing':
      return 'Aguardando confirmação do host';
    case 'cancelled':
      return 'Cancelado';
    default:
      return 'Reunião confirmada';
  }
};

export const handleInviteStatus = (status: string) => {
  switch (status) {
    case 'pending':
      return 'Aguardando resposta do convidado';
    case 'rejected':
      return 'Convite rejeitado';
    default:
      return 'Presença confirmada';
  }
};

export const handleRenderInviteStatus = (status: string) => {
  switch (status) {
    case 'pending':
      return 'yellow';
    case 'rejected':
      return 'red';
    default:
      return 'green';
  }
};
