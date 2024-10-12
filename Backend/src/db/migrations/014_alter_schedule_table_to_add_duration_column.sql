-- Add duration column
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_name = 'schedule' AND column_name = 'duration'
    ) THEN
        ALTER TABLE schedule ADD COLUMN duration integer;
    END IF;
END $$;