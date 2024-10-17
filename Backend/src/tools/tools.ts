import updateScheduleInfo from './updateScheduleInfo';
import createInvitedEmails from './createInvitedEmails';
import createAvailabilities from './createAvailabilities';

const tools = [
  updateScheduleInfo,
  createInvitedEmails,
  createAvailabilities,
];

export const toolsByName: { [key: string]: any } = {
  updateScheduleInfo: updateScheduleInfo,
  createInvitedEmails: createInvitedEmails,
  createAvailabilities: createAvailabilities,
};

export default tools;
