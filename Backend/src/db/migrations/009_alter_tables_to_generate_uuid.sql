-- Migration: alter-tables-to-generate-uuid

-- Habilitando a extensão para UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Alterando a tabela users
ALTER TABLE users
    ALTER COLUMN id SET DEFAULT uuid_generate_v4();

-- Alterando a tabela schedule
ALTER TABLE schedule
    ALTER COLUMN id SET DEFAULT uuid_generate_v4(),
    ALTER COLUMN user_id SET DEFAULT uuid_generate_v4(),
    ALTER COLUMN access_code SET DEFAULT uuid_generate_v4();

-- Alterando a tabela invites
ALTER TABLE invites
    ALTER COLUMN id SET DEFAULT uuid_generate_v4(),
    ALTER COLUMN schedule_id SET DEFAULT uuid_generate_v4(),
    ALTER COLUMN user_id SET DEFAULT uuid_generate_v4();

-- Alterando a tabela proposed_date
ALTER TABLE proposed_date
    ALTER COLUMN schedule_id SET DEFAULT uuid_generate_v4();

-- Alterando a tabela availability
ALTER TABLE availability
    ALTER COLUMN id SET DEFAULT uuid_generate_v4(),
    ALTER COLUMN schedule_id SET DEFAULT uuid_generate_v4(),
    ALTER COLUMN user_id SET DEFAULT uuid_generate_v4();

-- Alterando a tabela messages
ALTER TABLE messages
    ALTER COLUMN id SET DEFAULT uuid_generate_v4(),
    ALTER COLUMN dialog_id SET DEFAULT uuid_generate_v4();

-- Alterando a tabela dialogs
ALTER TABLE dialogs
    ALTER COLUMN id SET DEFAULT uuid_generate_v4(),
    ALTER COLUMN user_id SET DEFAULT uuid_generate_v4(),
    ALTER COLUMN schedule_id SET DEFAULT uuid_generate_v4();

-- Alterando a tabela notifications
ALTER TABLE notifications
    ALTER COLUMN id SET DEFAULT uuid_generate_v4(),
    ALTER COLUMN user_id SET DEFAULT uuid_generate_v4();