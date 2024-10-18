export interface Availability {
  id: string;
  schedule_id: string;
  user_id: string;
  week_day: Date | null;
  start_time: string | null;
  end_time: string | null;
  notes: string | null;
}
