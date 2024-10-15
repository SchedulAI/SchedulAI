interface Invite {
    name: string;
    status: string;
  }
  
  interface Schedule {
    schedule_id: number;
    status: 'pending' | 'confirmed' | 'cancelled';
    proposed_date?: Date[];
    time_limit?: Date;
    event_date?: Date;
    event_time?: string;
    event_title: string;
    event_description: string;
    is_host: boolean;
    invites: Invite[];
  }
  
  interface ScheduleResponse {
    Schedules: Schedule[];
  }
  