import updateScheduleInfo from './updateScheduleInfo';
import createInvitedEmails from './createInvitedEmails';
import createAvailabilities from './createAvailabilities';
import createInvites from './createInvites';
import updateInviteStatus from './updateInviteStatus';

const tools = [
  updateScheduleInfo,
  createInvitedEmails,
  createAvailabilities,
  createInvites,
  updateInviteStatus,
];

export const toolsByName: { [key: string]: any } = {
  updateScheduleInfo: updateScheduleInfo,
  createInvitedEmails: createInvitedEmails,
  createAvailabilities: createAvailabilities,
  createInvites: createInvites,
  updateInviteStatus: updateInviteStatus,
};

export default tools;
