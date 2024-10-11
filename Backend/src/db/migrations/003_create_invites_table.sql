CREATE TABLE IF NOT EXISTS invites (
  id UUID PRIMARY KEY,
  schedule_id UUID REFERENCES schedule(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  status VARCHAR(255),
  important BOOLEAN
);
