import updateScheduleInfo from './updateScheduleInfo';
import createInvitedEmails from './createInvitedEmails';
import createAvailabilities from './createAvailabilities';
import createInvites from './createInvites';

const tools = [
  updateScheduleInfo,
  createInvitedEmails,
  createAvailabilities,
  createInvites,
];

export const toolsByName: { [key: string]: any } = {
  updateScheduleInfo: updateScheduleInfo,
  createInvitedEmails: createInvitedEmails,
  createAvailabilities: createAvailabilities,
  createInvites: createInvites,
};

export default tools;
