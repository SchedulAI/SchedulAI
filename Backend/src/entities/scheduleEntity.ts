import { Availability } from './availabilityEntity';
import { Invites } from './invitesEntity';
import { ProposedDate } from './proposedDateEntity';

export interface Schedule {
  id: string;
  user_id: string;
  title: string;
  description: string;
  status: 'planning' | 'pending' | 'reviewing' | 'scheduled' | 'cancelled';
  access_code: string;
  expiry_time: string;
  invite_link: string;
  duration: number;

  host_name: string;
  is_host?: boolean;
  proposed_date?: ProposedDate;

  invites?: Invites[] | null;
  availability?: Availability[] | null;
}
