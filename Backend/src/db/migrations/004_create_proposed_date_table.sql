CREATE TABLE IF NOT EXISTS proposed_date (
  id SERIAL PRIMARY KEY,
  schedule_id UUID REFERENCES schedule(id) ON DELETE CASCADE,
  proposed_date DATE,
  status VARCHAR(255)
);
