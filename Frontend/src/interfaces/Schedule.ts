export interface Schedule {
  id: string;
  user_id: string;
  title: string;
  description: string;
  status: string;
  access_code: string;
  expiry_time: string;
  invite_link: string;
  schedule_date: Date;
}
