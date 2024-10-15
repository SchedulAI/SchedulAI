export interface Availability {
  id: string;
  schedule_id: string;
  user_id: string;
  week_day: Date;
  start_time: string;
  end_time: string;
  notes: string;
}
