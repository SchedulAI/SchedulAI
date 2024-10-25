export const renderDateInfo = (
  status: 'planning' | 'pending' | 'reviewing' | 'scheduled' | 'cancelled',
  proposedDate: proposed_date | string
) => {
  if (status !== 'scheduled') {
    return 'Definindo';
  } else if (typeof proposedDate === 'string') {
    return new Date(proposedDate).toLocaleString();
  } else {
    return new Date(proposedDate.proposed_date).toLocaleString();
  }
};
