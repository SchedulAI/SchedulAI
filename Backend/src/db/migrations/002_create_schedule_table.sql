CREATE TABLE IF NOT EXISTS schedule (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255),
  description TEXT,
  status VARCHAR(255),
  access_code UUID UNIQUE,
  expiry_time TIME,
  invite_link VARCHAR(255),
  schedule_date DATE
);
