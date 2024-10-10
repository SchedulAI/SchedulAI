CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY,
  dialog_id UUID REFERENCES dialogs(id) ON DELETE CASCADE,
  sender_type VARCHAR(255),
  message VARCHAR(255)
);
