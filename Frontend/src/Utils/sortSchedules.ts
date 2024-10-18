const statusOrder = [
  'scheduled',
  'reviewing',
  'pending',
  'planning',
  'cancelled',
];

export const compareStatus = (a: Schedule, b: Schedule) => {
  return statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status);
};
