const statusOrder = [
  'scheduled',
  'reviewing',
  'planning',
  'pending',
  'cancelled',
];

export const compareStatus = (a: Schedule, b: Schedule) => {
  return statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status);
};
