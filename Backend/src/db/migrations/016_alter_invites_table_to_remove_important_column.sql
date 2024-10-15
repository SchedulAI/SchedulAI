-- Remover a coluna 'important'
ALTER TABLE IF EXISTS invites
DROP COLUMN IF EXISTS important;

-- Setar default na coluna status
ALTER TABLE IF EXISTS invites 
ALTER COLUMN status SET DEFAULT 'pending';