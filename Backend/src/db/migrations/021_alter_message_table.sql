ALTER TABLE messages
ALTER COLUMN message TYPE jsonb USING message::jsonb;