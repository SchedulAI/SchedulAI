export interface Invites {
  id: string;
  schedule_id: string;
  user_id: string;
  status: 'pending' | 'accepted' | 'rejected';

  guest_name: string[];
}
