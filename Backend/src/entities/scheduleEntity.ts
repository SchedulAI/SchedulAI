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
}
