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

export interface SchedulesResponse {
  data: {
    acess_code: string;
    description: string | null;
    expiry_time: string | null;
    id: string;
    invite_link: string | null;
    schedule_date: string | null;
    status: string;
    title: string;
    user_id: string;
  }
  message: string;
  sucess: boolean;
}
