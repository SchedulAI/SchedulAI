interface Invite {
  name: string;
  status: string;
}

interface Schedule {
  id: string;
  title?: string;
  is_host?: boolean;
  description?: string | null;
  status: 'pending' | 'confirmed' | 'cancelled';
  expiry_time?: Date | null;
  invite_link?: string | null;
  event_date?: Date | null;
  proposed_date?: Date | string;
  invites?: Invite[];
  event_title?: string;
  event_description?: string;
  event_time?: string;
  time_limit?: Date | null;
}

interface ScheduleResponse {
  Schedules: Schedule[];
}
