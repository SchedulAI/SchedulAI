-- Remove schedule_date column if it exists
DO $$
BEGIN
    IF EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_name = 'schedule' AND column_name = 'schedule_date'
    ) THEN
        ALTER TABLE schedule DROP COLUMN schedule_date;
    END IF;
END $$;
