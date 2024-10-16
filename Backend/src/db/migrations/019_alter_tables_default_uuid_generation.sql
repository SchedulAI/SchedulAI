-- Removendo defaults de geração de UUID nos campos incorretos
-- Invites
ALTER TABLE IF EXISTS invites
    ALTER COLUMN user_id DROP DEFAULT,
    ALTER COLUMN schedule_id DROP DEFAULT;

-- Proposed Date
ALTER TABLE IF EXISTS proposed_date
    ALTER COLUMN schedule_id DROP DEFAULT;

-- Availability
ALTER TABLE IF EXISTS availability
    ALTER COLUMN user_id DROP DEFAULT,
    ALTER COLUMN schedule_id DROP DEFAULT;

-- Messages
ALTER TABLE IF EXISTS messages
    ALTER COLUMN dialog_id DROP DEFAULT;

-- Dialogs
ALTER TABLE IF EXISTS dialogs
    ALTER COLUMN user_id DROP DEFAULT,
    ALTER COLUMN schedule_id DROP DEFAULT;

-- Notifications
ALTER TABLE IF EXISTS notifications
    ALTER COLUMN user_id DROP DEFAULT;