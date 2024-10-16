export const handleStatusColor = (status: string) => {
  switch (status) {
    case 'pending':
      return 'yellow';
    case 'declined':
      return 'red';
    default:
      return 'green';
  }
};

export const handleRenderStatus = (status: string) => {
  switch (status) {
    case 'accepted':
      return 'Confirmado';
    case 'pending':
      return 'Pendente';
    default:
      return 'Cancelado';
  }
};
