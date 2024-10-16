export interface Invites {
  id: string;
  schedule_id: string;
  user_id: string;
  status: 'answered' | 'pending';
}
