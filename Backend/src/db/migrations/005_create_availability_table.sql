CREATE TABLE IF NOT EXISTS availability (
  id UUID PRIMARY KEY,
  schedule_id UUID REFERENCES schedule(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  week_day DATE,
  start_time TIME,
  end_time TIME
);
