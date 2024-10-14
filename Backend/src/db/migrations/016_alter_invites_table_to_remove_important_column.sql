-- Remover a coluna 'important'
ALTER TABLE invites
DROP COLUMN important;

-- Setar default na coluna status
ALTER TABLE invites 
ALTER COLUMN status SET DEFAULT 'pending';