CREATE TABLE IF NOT EXISTS invited_emails (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) NOT NULL,
  schedule_id UUID REFERENCES schedule(id) ON DELETE CASCADE
);
