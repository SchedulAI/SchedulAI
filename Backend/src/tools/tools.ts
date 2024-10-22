import updateScheduleInfo from './updateScheduleInfo';
import createInvitedEmails from './createInvitedEmails';
import createAvailabilities from './createAvailabilities';
import createInvites from './createInvites';
import updateInviteStatus from './updateInviteStatus';
import confirmSchedule from './confirmSchedule';
import newRound from './newRound';

const tools = [
  updateScheduleInfo,
  createInvitedEmails,
  createAvailabilities,
  createInvites,
  updateInviteStatus,
  confirmSchedule,
  newRound,
];

export const toolsByName: { [key: string]: any } = {
  updateScheduleInfo: updateScheduleInfo,
  createInvitedEmails: createInvitedEmails,
  createAvailabilities: createAvailabilities,
  createInvites: createInvites,
  updateInviteStatus: updateInviteStatus,
  confirmSchedule: confirmSchedule,
  newRound: newRound,
};

export default tools;
