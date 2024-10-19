interface Invite {
  id: string;
  schedule_id: string;
  user_id: string;
  guest_name: string;
  status: 'pending' | 'accepted' | 'rejected';
}

interface Availability {
  id: string;
  schedule_id: string;
  user_id: string;
  week_day: string | null;
  start_time: string | null;
  end_time: string | null;
  notes: string | null;
}

interface proposed_date {
  id: string;
  schedule_id: string;
  proposed_date: Date | string;
  status: string;
}

interface Schedule {
  id: string;
  user_id: string;
  title: string;
  description?: string | null;
  status: 'planning' | 'pending' | 'reviewing' | 'scheduled' | 'cancelled';
  access_code?: string | null;
  expiry_time?: string | null;
  invite_link?: string | null;
  proposed_date?: proposed_date | string;
  duration?: number | null;
  is_host: boolean;
  host_name: string;
  invites?: Invite[] | null;
  availability?: Availability[] | null;
  peding_account?: string[] | null;
}

interface ScheduleResponse {
  data: Schedule[];
  message: string;
  success: boolean;
}

interface ScheduleCreateResponse {
  data: Schedule;
  message: string;
  success: boolean;
}
