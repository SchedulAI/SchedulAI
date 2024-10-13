interface Invite {
    name: string;
    status: string;
  }
  
  interface Schedule {
    schedule_id: number;
    status: 'pending' | 'confirmed' | 'cancelled';
    proposed_date?: Date; // Opcional, apenas quando o status for 'pending'
    time_limit?: Date; // Opcional, apenas quando o status for 'pending'
    event_date?: Date; // Opcional, apenas quando o status for 'confirmed'
    event_time?: string; // Opcional, apenas quando o status for 'confirmed'
    event_title: string;
    event_description: string;
    is_host: boolean;
    invites: Invite[];
  }
  
  interface ScheduleResponse {
    Schedules: Schedule[];
  }
  