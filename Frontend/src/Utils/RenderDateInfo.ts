export const renderDateInfo = (
  status: 'planning' | 'pending' | 'reviewing' | 'scheduled' | 'cancelled',
  proposed_date: proposed_date | string
) => {
  if (status === 'pending' || status === 'planning') {
    return 'A definir';
  } else if (status === 'scheduled') {
    return typeof proposed_date === 'string'
      ? proposed_date
      : proposed_date.proposed_date;
  }
  return null;
};
