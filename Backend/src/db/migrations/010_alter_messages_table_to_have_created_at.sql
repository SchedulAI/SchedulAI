DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_name = 'messages' AND column_name = 'created_at'
    ) THEN
        ALTER TABLE messages
        ADD COLUMN created_at TIMESTAMPTZ DEFAULT NOW();
    END IF;
END $$;