export const renderDateInfo = (
  status: 'pending' | 'confirmed' | 'cancelled',
  eventDate?: string,
  eventTime?: string,
  proposedDateRange?: string
) => {
  if (status === 'confirmed') {
    return `${eventDate} - ${eventTime}`;
  } else if (status === 'pending' && proposedDateRange) {
    return proposedDateRange.toString();
  }
  return null;
};
